import { type ClimatiqSearchResult } from '@/app/actions';

export type CustomListType = {
  name: 'custom';
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

export type DefaultListType = {
  name: 'default';
  resultsPerPage: number;
};

export interface Props {
  data: ClimatiqSearchResult[];
  loading: boolean;
  type?: CustomListType | DefaultListType;
}
