import {ActionTree} from 'vuex';
import {
  Card, GameEndResult,
  GameStatus,
  liberalFascistDistribution,
  PartyMembership,
  Player,
  Policy,
  Role,
  SecretRole,
  StandaloneState,
} from './types';
import {RootState} from '../../types';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';
import router from '@/route';
import shuffle from 'lodash/shuffle';

const createDrawDeck = (libCardCount: number = 6, fasCardCount: number = 11) => {
  const totalCards = libCardCount + fasCardCount;
  const deck = [];

  for (let i = 0; i < totalCards; i++) {
    deck.push({
      id: i,
      policy: i < libCardCount ? Policy.Liberal : Policy.Fascist,
    } as Card);
  }

  return shuffle(deck);
};

const createPlayerRolesArray = (distribution: {[index: number]: number}) => {
  const roles: Role[] = [];

  for (const key of Object.keys(distribution)) {
    const roleIndex = Number(key);
    let role: Role;

    if (roleIndex === SecretRole.Liberal) {
      role = {secretRole: SecretRole.Liberal, partyMembership: PartyMembership.Liberal};
    } else if (roleIndex === SecretRole.Fascist) {
      role = {secretRole: SecretRole.Fascist, partyMembership: PartyMembership.Fascist};
    } else {
      role = {secretRole: SecretRole.Hitler, partyMembership: PartyMembership.Fascist};
    }

    for (let i = 0; i < distribution[roleIndex]; i++) roles.push(role);
  }

  return shuffle(roles);
};

export const actions: ActionTree<StandaloneState, RootState> = {
  init({commit, dispatch}) {
    return new Promise((resolve) => {
      resolve({
        watchers: [
          [
            (state: any, getters: any) => getters['standalone/drawnPolicies'],
            (arr: any) => dispatch('enactPolicyHandler', arr),
          ],
          [
            (state: any, getters: any) => getters['standalone/failedElections'],
            (failedElections: number) => dispatch('failedElectionsHandler', failedElections),
          ],
        ],
      });
    });
  },

  navigate({commit}, {routeName, status = null}: {routeName: string, status: GameStatus | null}) {
    if (status !== null) commit(standaloneMutations.updateStatus, status);
    commit(standaloneMutations.updateView, routeName);
    router.push({name: routeName});
  },

  initRound({state, commit, dispatch}) {
    commit(standaloneMutations.updateStatus, GameStatus.INITIALIZING);

    // set missing player names
    for (let i = 0; i < state.playerCount; i++) {
      const player = state.players[i];

      if (player.name === '') {
        commit(standaloneMutations.updatePlayerName, {
          playerId: player.id,
          name: `Player ${player.id + 1}`,
        });
      }
    }
    // shuffle draw deck (11 facist, 6 liberal) and reset discard deck
    commit(standaloneMutations.updateDrawDeck, createDrawDeck());
    commit(standaloneMutations.updateDiscardDeck, []);

    // set player roles
    commit(standaloneMutations.assignPlayerRoles,
      createPlayerRolesArray(liberalFascistDistribution[state.playerCount]));

    // navigate to show roles view
    dispatch('navigate', {
      routeName: 'standalone:showRoles',
      status: GameStatus.SHOWING_ROLES,
    });
  },

  governmentVotePassed({state, commit, dispatch}) {
    // 3 or more fascist policies? is chancellor hitler
    if (state.game.fascistPolicies.length >= 3
      && state.game.chancellor!.role!.secretRole === SecretRole.Hitler) {
      commit(standaloneMutations.setGameEnd, GameEndResult.HITLER_CHANCELLOR);
      return dispatch('navigate', {
        routeName: 'standalone:gameEnd',
        status: GameStatus.GAME_END,
      });
    }

    dispatch('navigate', {
      routeName: 'standalone:presidentDiscardPolicy',
      status: GameStatus.PRESIDENT_DISCARDING_POLICY,
    });
  },

  governmentVoteFailed({state, commit, dispatch}) {
    commit(standaloneMutations.increaseFailedElectionsTracker);

    dispatch('passPresidency');

    dispatch('navigate', {
      routeName: 'standalone:nominateChancellor',
      status: GameStatus.NOMINATING_CHANCELLOR,
    });
  },

  passPresidency({state, commit, dispatch, getters}) {
    const { nextPresident } = state.game;

    if (nextPresident === null) {
      const players = getters.alivePlayers;
      const government = getters.government;

      const presidentIndex = players.findIndex((player: Player) => player.id === government.president.id);
      const president = players[(presidentIndex + 1) % players.length];

      commit(standaloneMutations.setChancellor, null);
      commit(standaloneMutations.setPresident, president);
    } else {
      commit(standaloneMutations.setChancellor, null);
      commit(standaloneMutations.setPresident, nextPresident);
      commit(standaloneMutations.setNextPresident, null);
    }
  },

  drawCards({state, commit}, count: number = 3) {
    if (state.game.drawnPolicies.length) return;

    commit(standaloneMutations.drawCards, count);
  },

  // always called via a watch on drawnPolicies
  enactPolicyHandler({state, commit, dispatch}, drawnPolicies: Card[]) {
    if (drawnPolicies.length !== 1) return;

    const { playerCount, status, game: { liberalPolicies, fascistPolicies, drawPile, discardPile } } = state;
    const card = drawnPolicies[0];
    commit(standaloneMutations.enactPolicy, card);
    commit(standaloneMutations.emptyDrawnCards);

    if (drawPile.length < 3) {
      commit(standaloneMutations.updateDrawDeck, shuffle([...drawPile, ...discardPile]));
      commit(standaloneMutations.updateDiscardDeck, []);
    }

    if (card.policy === Policy.Liberal) {
      if (liberalPolicies.length === 5) {
        commit(standaloneMutations.setGameEnd, GameEndResult.LIBERAL_POLICIES);
        return dispatch('navigate', {
          routeName: 'standalone:gameEnd',
          status: GameStatus.GAME_END,
        });
      }

      dispatch('passPresidency');

      dispatch('navigate', {
        routeName: 'standalone:nominateChancellor',
        status: GameStatus.NOMINATING_CHANCELLOR,
      });
    } else if (card.policy === Policy.Fascist) {
      if (status !== GameStatus.ENACT_TOP_POLICY) {
        let destination = {
          routeName: 'standalone:nominateChancellor',
          status: GameStatus.NOMINATING_CHANCELLOR,
        };

        switch (fascistPolicies.length) {
          case 1:
            if (playerCount >= 9) {
              destination = {
                routeName: 'standalone:executivePower:investigate',
                status: GameStatus.INVESTIGATING_LOYALTY,
              };
            }
            break;
          case 2:
            if (playerCount >= 7) {
              destination = {
                routeName: 'standalone:executivePower:investigate',
                status: GameStatus.INVESTIGATING_LOYALTY,
              };
            }
            break;
          case 3:
            if (playerCount <= 6) {
              destination = {
                routeName: 'standalone:executivePower:peek',
                status: GameStatus.POLICY_PEEKING,
              };
            } else if (playerCount >= 7) {
              destination = {
                routeName: 'standalone:executivePower:specialElection',
                status: GameStatus.CALLING_SPECIAL_ELECTION,
              };
            }
            break;
          case 4:
            destination = {
              routeName: 'standalone:executivePower:execute',
              status: GameStatus.EXECUTING,
            };
            break;
          case 5:
            destination = {
              routeName: 'standalone:executivePower:execute',
              status: GameStatus.EXECUTING,
            };
            break;
          case 6:
            commit(standaloneMutations.setGameEnd, GameEndResult.FASCIST_POLICIES);
            return dispatch('navigate', {
              routeName: 'standalone:gameEnd',
              status: GameStatus.GAME_END,
            });
        }

        switch (destination.status) {
          case GameStatus.NOMINATING_CHANCELLOR:
          case GameStatus.INVESTIGATING_LOYALTY:
          case GameStatus.POLICY_PEEKING:
            dispatch('passPresidency');
            break;
        }

        dispatch('navigate', destination);
      } else {
        if (fascistPolicies.length === 6) {
          commit(standaloneMutations.setGameEnd, GameEndResult.FASCIST_POLICIES);
          return dispatch('navigate', {
            routeName: 'standalone:gameEnd',
            status: GameStatus.GAME_END,
          });
        }
      }
    }
  },

  failedElectionsHandler({state, commit, dispatch}, failedElections: number) {
    if (failedElections !== 3) return;

    const { drawPile, discardPile } = state.game;

    commit(standaloneMutations.updateStatus, GameStatus.ENACT_TOP_POLICY);

    if (drawPile.length < 3) {
      commit(standaloneMutations.updateDrawDeck, shuffle([...drawPile, ...discardPile]));
      commit(standaloneMutations.updateDiscardDeck, []);
    }

    commit(standaloneMutations.drawCards, 1);
    dispatch('resetLastGovernment');
    commit(standaloneMutations.resetFailedElectionsTracker);
  },

  setLastGovernment({state, commit}) {
    const { president, chancellor } = state.game;

    commit(standaloneMutations.setLastGovernment, {president, chancellor});
  },

  resetLastGovernment({commit}) {
    commit(standaloneMutations.setLastGovernment, {president: null, chancellor: null});
  },

  veto({commit, dispatch}) {
    commit(standaloneMutations.discardDrawnCards);

    commit(standaloneMutations.increaseFailedElectionsTracker);

    dispatch('passPresidency');

    dispatch('navigate', {
      routeName: 'standalone:nominateChancellor',
      status: GameStatus.NOMINATING_CHANCELLOR,
    });
  },

  execute({commit, dispatch}, player: Player) {
    commit(standaloneMutations.executePlayer, player);

    if (player.role!.secretRole === SecretRole.Hitler) {
      commit(standaloneMutations.setGameEnd, GameEndResult.HITLER_KILLED);
      return dispatch('navigate', {
        routeName: 'standalone:gameEnd',
        status: GameStatus.GAME_END,
      });
    } else {
      dispatch('passPresidency');
      dispatch('navigate', {
        routeName: 'standalone:nominateChancellor',
        status: GameStatus.NOMINATING_CHANCELLOR,
      });
    }
  },

  specialElection({commit, getters, dispatch}, president: Player) {
    const players = getters.alivePlayers;
    const government = getters.government;

    const nextPresidentIndex = players.findIndex((player: Player) => player.id === government.president.id);
    const nextPresident = players[(nextPresidentIndex + 1) % players.length];

    commit(standaloneMutations.setChancellor, null);
    commit(standaloneMutations.setPresident, president);
    commit(standaloneMutations.setNextPresident, nextPresident);
  },
};
