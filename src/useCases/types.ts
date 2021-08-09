interface Logger {
  error(error): void;
}

interface Query<Options, Result> {
  find(options: Options): Promise<Result>;
}

interface Mutation<Options, Result> {
  send(options: Options): Promise<Result>;
}

interface UseCase<Options, Result> {
  execute(options: Options): Promise<Result>;
}

export type {
  Logger,
  Query,
  UseCase,
  Mutation,
};
