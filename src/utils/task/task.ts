import { type Either, left, right } from '../value';

export const tryCatch = <L, R>(fn: () => R, onRejected: (reason: unknown) => L): Either<L, R> => {
  try {
    const result = fn();
    return right(result);
  } catch (error) {
    const rejected = onRejected(error);
    return left(rejected);
  }
};
