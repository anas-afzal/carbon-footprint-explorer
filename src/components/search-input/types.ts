export type ButtonPlacement = 'right' | 'bottom-right' | 'bottom-left';

export interface Props {
  className?: string;
  onSearch: (query: string) => void;
  disabled?: boolean;
  showSearchButton?: boolean;
  searchButtonPlacement?: ButtonPlacement;
}
