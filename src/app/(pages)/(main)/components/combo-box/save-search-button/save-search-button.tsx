'use client';

import { saveResult, type SavedSearchResult } from '@/app/actions';
import { useLocalStorage } from '@/hooks';
import { cn } from '@/utils';

interface Props extends Pick<SavedSearchResult, 'query' | 'data'> {
  disabled?: boolean;
}

export const SaveSearchButton = ({ query, data, disabled }: Props): React.JSX.Element => {
  const [savedQuery, setSavedQuery] = useLocalStorage<
    null | Pick<SavedSearchResult, 'query' | 'savedAt'>[]
  >('saved-search', null);

  const onSaveClick = (): void => {
    saveResult({ query, data });
    setSavedQuery([{ query, savedAt: new Date() }, ...(savedQuery || [])]);
  };

  return (
    <button
      type='button'
      className={cn(
        'bg-primary-200 focus:bg-primary-100 text-custom-white text-md flex h-max w-max rounded-full px-5 py-3 transition duration-200 ease-in-out',
      )}
      disabled={disabled}
      onClick={onSaveClick}
    >
      Save Results
    </button>
  );
};
