'use client';

import { ResultList, SavedSearchList, SearchInput } from '@/components';
import { useSearchCarbonFootprint } from '@/app/hooks';
import { SaveSearchButton } from './save-search-button';

export const ComboBox = (): React.JSX.Element => {
  const [searchCarbonFootprint, { data, status, error }] = useSearchCarbonFootprint();

  return (
    <div className='flex w-full flex-col gap-y-4'>
      <SearchInput
        onSearch={(query) => searchCarbonFootprint({ query })}
        showSearchButton
        searchButtonPlacement='right'
        className='md:mx-24'
      />
      {status === 'error' && <p className='text-red-600'>Error: {error?.name}</p>}
      <div className='mt-4 flex flex-col gap-y-4'>
        {data && (
          <SaveSearchButton
            data={data.results}
            query={data.query}
            disabled={status === 'loading'}
          />
        )}
        <ResultList
          data={data?.results || []}
          loading={status === 'loading'}
          type={{
            name: 'custom',
            currentPage: data?.current_page,
            totalPages: data?.last_page,
            onPageChange(page) {
              searchCarbonFootprint({ query: data?.query || '', page: page.toString() });
            },
          }}
        />
      </div>
      <SavedSearchList />
    </div>
  );
};
