import { type ClimatiqSearchResult } from '../climatiq-api';

export type SavedSearchResult = {
  id: string;
  query: string;
  data: ClimatiqSearchResult[];
  savedAt: Date;
};
