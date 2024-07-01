'use client';

import { useEffect, useState } from 'react';
import { type ClimatiqSearchResult } from '@/app/actions';
import type { Props } from './types';

export const ResultList = ({
  data,
  loading,
  type = { name: 'default', resultsPerPage: 20 },
}: Props): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(
    type.name === 'default' ? 1 : type.currentPage ?? 1,
  );
  const [pageData, setPageData] = useState<ClimatiqSearchResult[]>([]);

  const totalPages =
    type.name === 'default' ? Math.ceil(data.length / type.resultsPerPage) : type.totalPages;

  const onPageChange = (page: number): void => {
    if (type.name === 'custom') {
      type.onPageChange(page);

      return;
    }

    const start = (page - 1) * type.resultsPerPage;
    const end = start + type.resultsPerPage;

    setCurrentPage(page);
    setPageData(data.slice(start, end));
  };

  const previousPage = (): void => {
    if (currentPage === 1) return;

    onPageChange(currentPage - 1);
  };

  const nextPage = (): void => {
    if (currentPage === totalPages) return;

    onPageChange(currentPage + 1);
  };

  useEffect(() => {
    if (type.name === 'default') return;

    setPageData(data);
    setCurrentPage(type.currentPage ?? 1);
  }, [type, data]);

  return (
    <div className='flex flex-col gap-y-4'>
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='border-custom-grey-100 bg-custom-grey-200 h-28 w-full animate-pulse rounded-lg'
          ></div>
        ))
      ) : (
        <>
          {pageData.map(({ id, name, unit_type, category, region, year, sector }) => (
            <div
              key={id}
              className='border-custom-grey-100 bg-custom-grey-200 text-custom-white flex flex-col rounded-xl border p-2 shadow-xl'
            >
              <div className='grid grid-cols-6'>
                <div className='flex flex-col gap-y-4'>
                  <h3 className='font-semibold uppercase'>Activity Name</h3>
                  <p className='text-sm'>{name}</p>
                </div>
                <div className='flex flex-col gap-y-4'>
                  <h3 className='font-semibold uppercase'>Sector</h3>
                  <p className='text-sm'>{sector}</p>
                </div>
                <div className='flex flex-col gap-y-4'>
                  <h3 className='font-semibold uppercase'>Unit Type</h3>
                  <p className='text-sm'>{unit_type}</p>
                </div>
                <div className='flex flex-col gap-y-4'>
                  <h3 className='font-semibold uppercase'>Category</h3>
                  <p className='text-sm'>{category}</p>
                </div>
                <div className='flex flex-col gap-y-4'>
                  <h3 className='font-semibold uppercase'>Region</h3>
                  <p className='text-sm'>{region}</p>
                </div>
                <div className='flex flex-col gap-y-4'>
                  <h3 className='font-semibold uppercase'>Year</h3>
                  <p className='text-sm'>{year}</p>
                </div>
              </div>
            </div>
          ))}

          {totalPages && totalPages > 0 && (
            <div className='text-custom-white ml-auto flex items-center gap-x-2'>
              <button onClick={previousPage} className='bg-primary-200 rounded-lg px-3 py-1'>
                Prev
              </button>
              <span className='text-sm'>
                page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage} className='bg-primary-200 rounded-lg px-3 py-1'>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
