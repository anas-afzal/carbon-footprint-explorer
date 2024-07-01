import { useState } from 'react';
import type { Status } from '@/utils/types';
import {
  type SearchClimatiqOptions,
  type ClimatiqSearchResponse,
  searchClimatiqForCarbonFootprint,
} from '@/app/actions';
import { type HttpError, type ParseError, type UnexpectedError, isLeft } from '@/utils';
import type { UseSearchCarbonFootprintHook } from './types';

export const useSearchCarbonFootprint = (): UseSearchCarbonFootprintHook => {
  const [data, setData] = useState<ClimatiqSearchResponse | undefined>(undefined);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<UnexpectedError | ParseError | HttpError | undefined>(
    undefined,
  );

  const search = async (options: SearchClimatiqOptions): Promise<void> => {
    setStatus('loading');
    const res = await searchClimatiqForCarbonFootprint(options);

    if (isLeft(res)) {
      setStatus('error');
      setError(res.value);
      return;
    }

    setData(res.value);
    setStatus('success');
  };

  return [search, { data, status, error }] as const;
};
