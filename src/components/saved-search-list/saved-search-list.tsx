'use client';

import { SavedSearchResult } from '@/app/actions';
import { useLocalStorage } from '@/hooks';

export const SavedSearchList = (): React.JSX.Element => {
  const [storedValue] = useLocalStorage<null | Pick<SavedSearchResult, 'query' | 'savedAt'>[]>(
    'saved-search',
    null,
  );

  return (
    <div className='text-custom-white flex w-full flex-col gap-y-2'>
      <h2 className='text-lg'>Saved Searches</h2>
      <ul className='flex flex-wrap gap-2'>
        {storedValue?.map((query, index) => (
          <li key={index} className='border-custom-grey-100 bg-custom-grey-200 rounded-lg p-2'>
            <a href='/saved-search'>{query.query}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
