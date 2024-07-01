'use server';

import type { SavedSearchResult } from './types';

export const saveResult = ({ data, query }: Omit<SavedSearchResult, 'id' | 'savedAt'>): void => {
  console.log('Saving result for query:', query, data);
};
