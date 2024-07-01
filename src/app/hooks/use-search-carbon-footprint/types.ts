import { type ClimatiqSearchResponse, type SearchClimatiqOptions } from '@/app/actions';
import { type HttpError, type ParseError, type UnexpectedError } from '@/utils';
import type { Status } from '@/utils/types';

export type UseSearchCarbonFootprintHook = [
  (options: SearchClimatiqOptions) => Promise<void>,
  {
    data: ClimatiqSearchResponse | undefined;
    status: Status;
    error: UnexpectedError | ParseError | HttpError | undefined;
  },
];
