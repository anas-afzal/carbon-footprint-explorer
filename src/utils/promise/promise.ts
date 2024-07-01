import { type Either, left, right } from '../value';

export const tryCatch = async <L, R>(
  fn: () => Promise<R>,
  onRejected: (reason: unknown) => L,
): Promise<Either<L, R>> => {
  try {
    const result = await fn();
    return right(result);
  } catch (error) {
    const rejected = onRejected(error);
    return left(rejected);
  }
};
