'use server';

import { env } from '@/config';
import type { HttpError, ParseError, UnexpectedError } from '@/utils/errors';
import { type Either, isLeft, left, isRight, right } from '@/utils';
import { tryCatch } from '@/utils/promise';
import type {
  SearchClimatiqOptions,
  ClimatiqDataVersionResponse,
  ClimatiqSearchRequest,
  ClimatiqSearchResponse,
} from './types';

const ClimatiqBaseUrl = 'https://api.climatiq.io/data/v1';

const getClimatiqDataVersion = async (): Promise<
  Either<UnexpectedError | ParseError | HttpError, ClimatiqDataVersionResponse>
> => {
  const dataVersions = await tryCatch(
    () =>
      fetch(`${ClimatiqBaseUrl}/data-versions`, {
        headers: {
          Authorization: `Bearer ${env.CLIMATIQ_API_KEY}`,
        },
      }),
    (error) => {
      console.error(error);
      return { name: 'UnexpectedError' } satisfies UnexpectedError;
    },
  );

  if (isLeft(dataVersions)) return left(dataVersions.value);

  if (!dataVersions.value.ok) return left({ name: 'HttpError' });

  const dataVersionsResponse = await tryCatch(
    () => dataVersions.value.json() as Promise<ClimatiqDataVersionResponse>,
    (error) => {
      console.error(error);
      return { name: 'ParseError' } satisfies ParseError;
    },
  );

  return dataVersionsResponse;
};

export const searchClimatiqForCarbonFootprint = async (
  options: SearchClimatiqOptions,
): Promise<Either<UnexpectedError | ParseError | HttpError, ClimatiqSearchResponse>> => {
  const climatiqDataVersion = await getClimatiqDataVersion();

  if (isLeft(climatiqDataVersion)) return left(climatiqDataVersion.value);

  const qsOptions: ClimatiqSearchRequest = {
    data_version: `^${climatiqDataVersion.value.latest_major}`,
    ...options,
  };

  const qs = new URLSearchParams(qsOptions);

  const search = await tryCatch(
    () =>
      fetch(`${ClimatiqBaseUrl}/search?${qs.toString()}`, {
        headers: {
          Authorization: `Bearer ${env.CLIMATIQ_API_KEY}`,
        },
      }),
    (error) => {
      console.error(error);
      return { name: 'UnexpectedError' } satisfies UnexpectedError;
    },
  );

  if (isLeft(search)) return left(search.value);

  if (!search.value.ok) return left({ name: 'HttpError' });

  const searchJsonResponse = await tryCatch(
    () => search.value.json() as Promise<ClimatiqSearchResponse>,
    (error) => {
      console.error(error);
      return { name: 'ParseError' } satisfies ParseError;
    },
  );

  if (isRight(searchJsonResponse)) {
    return right({ ...searchJsonResponse.value, query: options.query });
  }

  return searchJsonResponse;
};
