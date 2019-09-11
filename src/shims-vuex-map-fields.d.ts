// based on: https://github.com/maoberlehner/vuex-map-fields/issues/26
declare module 'vuex-map-fields' {
  import _Vue, { WatchOptions } from 'vue';

  // augment typings of Vue.js


  export  class Store<S> {

    public readonly state: S;
    public readonly getters: any;

    public dispatch: Dispatch;
    public commit: Commit;
    constructor(options: StoreOptions<S>);

    public replaceState(state: S): void;

    public subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any): () => void;
    public watch<T>(getter: (state: S) => T, cb: (value: T, oldValue: T) => void, options?: WatchOptions): () => void;

    public registerModule<T>(path: string | string[], module: Module<T, S>, options?: ModuleOptions): void;

    public unregisterModule(path: string | string[]): void;

    public hotUpdate(options: {
      actions?: ActionTree<S, S>;
      mutations?: MutationTree<S>;
      getters?: GetterTree<S, S>;
      modules?: ModuleTree<S>;
    }): void;
  }

  export  function install(Vue: typeof _Vue): void;

  export interface Dispatch {
    (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
    <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
  }

  export interface Commit {
    (type: string, payload?: any, options?: CommitOptions): void;
    <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
  }

  export interface ActionContext<S, R> {
    dispatch: Dispatch;
    commit: Commit;
    state: S;
    getters: any;
    rootState: R;
    rootGetters: any;
  }

  export interface Payload {
    type: string;
  }

  export interface MutationPayload extends Payload {
    payload: any;
  }

  export interface DispatchOptions {
    root?: boolean;
  }

  export interface CommitOptions {
    silent?: boolean;
    root?: boolean;
  }

  export interface StoreOptions<S> {
    state?: S;
    getters?: GetterTree<S, S>;
    actions?: ActionTree<S, S>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<S>;
    plugins?: Array<Plugin<S>>;
    strict?: boolean;
  }

  type ActionHandler<S, R> = (injectee: ActionContext<S, R>, payload: any) => any;
  interface ActionObject<S, R> {
    root?: boolean;
    handler: ActionHandler<S, R>;
  }

  export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
  export type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>;
  export type Mutation<S> = (state: S, payload: any) => any;
  export type Plugin<S> = (store: Store<S>) => any;

  export interface Module<S, R> {
    namespaced?: boolean;
    state?: S | (() => S);
    getters?: GetterTree<S, R>;
    actions?: ActionTree<S, R>;
    mutations?: MutationTree<S>;
    modules?: ModuleTree<R>;
  }

  export interface ModuleOptions {
    preserveState?: boolean;
  }

  export interface GetterTree<S, R> {
    [key: string]: Getter<S, R>;
  }

  export interface ActionTree<S, R> {
    [key: string]: Action<S, R>;
  }

  export interface MutationTree<S> {
    [key: string]: Mutation<S>;
  }

  export interface ModuleTree<R> {
    [key: string]: Module<any, R>;
  }

  const _default: {
    Store: typeof Store;
    install: typeof install;
  };
  interface Dictionary<T> { [key: string]: T; }
  type Computed = () => any;
  type MutationMethod = (...args: any[]) => void;
  type ActionMethod = (...args: any[]) => Promise<any>;

  type Mapper<R> = (map: string[] | Dictionary<string>) => Dictionary<R>;

  type MapperWithNamespace<R> = (namespace: string, map: string[] | Dictionary<string>) => Dictionary<R>;

  type FunctionMapper<F, R> = (map: Dictionary<(this: typeof _Vue, fn: F, ...args: any[]) => any>) => Dictionary<R>;

  type FunctionMapperWithNamespace<F, R> = (
      namespace: string,
      map: Dictionary<(this: typeof _Vue, fn: F, ...args: any[]) => any>,
    ) => Dictionary<R>;

  type MapperForState = <S>(
      map: Dictionary<(this: typeof _Vue, state: S, getters: any) => any>,
    ) => Dictionary<Computed>;

  type MapperForStateWithNamespace = <S>(
      namespace: string,
      map: Dictionary<(this: typeof _Vue, state: S, getters: any) => any>,
    ) => Dictionary<Computed>;

  interface NamespacedMappers {
    mapState: Mapper<Computed> & MapperForState;
    mapMutations: Mapper<MutationMethod> & FunctionMapper<Commit, MutationMethod>;
    mapFields: Mapper<Computed>;
    mapActions: Mapper<ActionMethod> & FunctionMapper<Dispatch, ActionMethod>;
  }

  export  const mapState: Mapper<Computed>
    & MapperWithNamespace<Computed>
    & MapperForState
    & MapperForStateWithNamespace;

  export  const mapMutations: Mapper<MutationMethod>
    & MapperWithNamespace<MutationMethod>
    & FunctionMapper<Commit, MutationMethod>
    & FunctionMapperWithNamespace<Commit, MutationMethod>;

  export  const mapGetters: Mapper<Computed>
    & MapperWithNamespace<Computed>;

  export  const mapActions: Mapper<ActionMethod>
    & MapperWithNamespace<ActionMethod>
    & FunctionMapper<Dispatch, ActionMethod>
    & FunctionMapperWithNamespace<Dispatch, ActionMethod>;

  interface UpdateFieldOptions {
    path: string;
    value: string;
  }

  export function getField(state: any): string;

  export function updateField(state: any, updateFieldOptions?: UpdateFieldOptions, field?: string): void;

  export function mapFields(namespace?: string, fields?: string[]): object;

  export function mapMultiRowFields(namespace?: string, paths?: string[]): object;

  interface HelperOptions {
    getterType: string;
    mutationType: string;
  }

  export  function createHelpers(helperOptions: HelperOptions): NamespacedMappers;

  export default _default;
}
