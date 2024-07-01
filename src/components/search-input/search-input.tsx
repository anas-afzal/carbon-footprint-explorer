'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import { Props } from './types';
import { cn } from '@/utils';

const searchInputFormSchema = object({
  query: string({ required_error: 'Search term is required' }).min(1, 'Search term is required'),
});

type SearchInputFormSchema = TypeOf<typeof searchInputFormSchema>;

export const SearchInput = ({
  className,
  onSearch,
  disabled,
  showSearchButton = true,
  searchButtonPlacement = 'right',
}: Props): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SearchInputFormSchema>({
    resolver: zodResolver(searchInputFormSchema),
  });
  const query = watch('query');

  return (
    <form
      onSubmit={handleSubmit((formData) => onSearch(formData.query))}
      className={cn(
        'gap flex flex-row gap-2',
        className,
        showSearchButton &&
          ['bottom-right', 'bottom-left'].includes(searchButtonPlacement) &&
          'flex-col',
      )}
    >
      <div className='relative flex w-full flex-col gap-y-3'>
        <input
          type='text'
          placeholder='Search term here... eg. "electricity", "petrol"'
          {...register('query', { required: true })}
          className='bg-custom-white focus:border-custom-grey-100 focus:ring-custom-grey-100 w-full rounded-full py-4 pl-4 pr-10 text-xl transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-opacity-50'
        />
        {query?.length > 0 && (
          <button
            type='button'
            className='text-tertiary absolute bottom-0 right-0 top-0 mr-3'
            onClick={() => reset()}
          >
            clear
          </button>
        )}
        {errors.query && <p className='text-red-600'>{errors.query.message}</p>}
      </div>
      {showSearchButton && (
        <button
          type='submit'
          disabled={disabled}
          className={cn(
            'bg-primary-200 focus:bg-primary-100 text-custom-white flex h-max w-max rounded-full px-6 py-4 text-xl transition duration-200 ease-in-out',
            searchButtonPlacement === 'bottom-right' && 'self-end',
            searchButtonPlacement === 'bottom-left' && 'self-start',
          )}
        >
          Search
        </button>
      )}
    </form>
  );
};
