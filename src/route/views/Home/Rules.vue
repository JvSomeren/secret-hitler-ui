<template>
  <section>
    <div class="sh-rules">
      <ShCollapsible title="Objective">
        <p>Every player has a secret identity as a member of either the Liberal team or the Fascist team.</p>
        <p>Players on the Liberal team win if either:</p>
        <ul>
          <li>Five Liberal Policies are enacted.</li>
          <span><em>OR</em></span>
          <li>Hitler is assassinated.</li>
        </ul>
        <p>Players on the Fascist team win if either:</p>
        <ul>
          <li>Six Fascist Policies are enacted.</li>
          <span><em>OR</em></span>
          <li>Hitler is elected Chancellor any time after the third Fascist Policy has been enacted.</li>
        </ul>
      </ShCollapsible>

      <!-- Set up -->

      <h2 class="sh-rules-break">GAMEPLAY</h2>

      <ShCollapsible title="Election">
        Election
      </ShCollapsible>

      <ShCollapsible title="Legislative session">
        Legislative session
      </ShCollapsible>

      <ShCollapsible title="Presidential powers">
        <Investigate /> <p><strong>Investigate Loyalty</strong></p>
        <p>The President chooses a player to investigate. Investigated players should hand their Party Membership card (not Secret Role card!) to the President, who checks the player’s loyalty in secret and then returns the card to the player. The President may share (or lie about!) the results of their investigation at their discretion. No player may be investigated twice in the same game.</p>

        <SpecialElection /> <p><strong>Call Special Election</strong></p>
        <p>The President chooses any other player at the table to be the next Presidential Candidate by passing that player the President placard. Any player can become President—even players that are term-limited. The new President nominates an eligible player as Chancellor Candidate and the Election proceeds as usual.</p>
        <p><strong>A Special Election does not skip any players. After a Special Election, the President placard returns to the left of the President who enacted the Special Election.</strong></p>
        <p>If the President passes the presidency to the next player in the rotation, that player would get to run for President twice in a row: once for the Special Election and once for their normal shift in the Presidential rotation.</p>

        <PolicyPeek /> <p><strong>Policy Peek</strong></p>
        <p>The President secretly looks at the top three tiles in the Policy deck and then returns them to the top of the deck without changing the order.</p>

        <Execution /> <p><strong>Execution</strong></p>
        <p>The President executes one player at the table by saying “I formally execute [player name].” If that player is Hitler, the game ends in a Liberal victory. If the executed player is not Hitler, the table should <strong>not</strong> learn whether a Fascist or a Liberal has been killed; players must try to work out for themselves the new table balance. Executed players are removed from the game and may not speak, vote, or run for office.</p>
      </ShCollapsible>

      <ShCollapsible title="Veto power">
        <p>The Veto Power is a special rule that comes into effect after five Fascist Policies have been enacted. For all Legislative Sessions after the fifth Fascist Policy is enacted, the Executive branch gains a permanent new ability to discard all three Policy tiles if <strong>both</strong> the Chancellor and President agree.</p>
        <p>The President draws three Policy tiles, discards one, and passes the remaining two to the Chancellor as usual. Then Chancellor may, instead of enacting either Policy, say “I wish to veto this agenda.” If the President consents by saying, “I agree to the veto,” both Policies are discarded and the President placard passes to the left as usual. If the President does not consent, the Chancellor must enact a Policy as normal.</p>
        <p>Each use of the Veto Power represents an inactive government and advances the Election Tracker by one.</p>
      </ShCollapsible>
    </div>

    <ShLink
      class="sh-bottom"
      :file="`${publicPath}Secret_Hitler_Rules.pdf`">Full version [PDF]</ShLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Investigate from '@/assets/investigate.svg';
import SpecialElection from '@/assets/elect.svg';
import PolicyPeek from '@/assets/peek.svg';
import Execution from '@/assets/execute.svg';

@Component({
  components: {
    Investigate,
    SpecialElection,
    PolicyPeek,
    Execution,
  },
})
export default class Rules extends Vue {
  private publicPath: string = process.env.BASE_URL;
}
</script>

<style scoped lang="scss">
  .sh-rules {
    flex: 1;
    align-self: stretch;
    height: 100%;
    overflow-y: auto;

    font-family: 'Courier', Courier, monospace;

    &-break {
      padding-top: 6px;
      padding-left: 6px;
    }
  }
</style>
