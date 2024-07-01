import type { Right, Left, Either } from './types';

export const right = <L, R>(value: R): Either<L, R> => ({
  _tag: 'success',
  value,
});

export const left = <L, R>(value: L): Either<L, R> => ({
  _tag: 'failure',
  value,
});

export const isRight = <L, R>(value: Either<L, R>): value is Right<R> => value._tag === 'success';

export const isLeft = <L, R>(value: Either<L, R>): value is Left<L> => value._tag === 'failure';
