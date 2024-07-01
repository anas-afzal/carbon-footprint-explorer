export type Left<T> = {
  _tag: 'failure';
  value: T;
};

export type Right<T> = {
  _tag: 'success';
  value: T;
};

export type Either<L, R> = Left<L> | Right<R>;
