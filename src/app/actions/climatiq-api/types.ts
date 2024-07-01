export type ClimatiqDataVersionResponse = {
  latest: string;
  latest_major: number;
  latest_minor: number;
};

export type AccessType = 'public' | 'private' | 'premium';

export type ClimatiqSearchRequest = {
  data_version: string;
  query: string;
  id?: string;
  activity_id?: string;
  category?: string;
  sector?: string;
  source?: string;
  source_dataset?: string;
  year?: string;
  region?: string;
  unit_type?: string;
  source_lca_activity?: string;
  calculation_method?: FactorCalculationMethod;
  access_type?: AccessType;
  page?: string;
  results_per_page?: string;
};

export type FactorCalculationMethod = 'ar4' | 'ar5' | 'ar6';

export type FactorCalculationOrigin = 'climatiq' | 'source';

export type ContituentGases = {
  co2e_total: number | null;
  co2e_other: number | null;
  co2: number | null;
  ch4: number | null;
  n2o: number | null;
};

export type ClimatiqSearchResult = {
  id: string;
  activity_id: string;
  access_id: string;
  access_type: string;
  name: string;
  category: string;
  sector: string;
  source: string;
  source_link: string;
  uncertainty: string;
  year: number;
  year_released: number;
  region: string;
  description: string;
  unit_type: string;
  unit: string;
  source_lca_activity: string;
  supported_calculation_methods: string[];
  factor: number | null;
  factor_calculation_method: FactorCalculationMethod | null;
  factor_calculation_origin: FactorCalculationOrigin | null;
  constituent_gases: ContituentGases;
};

export type ClimatiqSearchResponse = {
  query: string;
  results: ClimatiqSearchResult[];
  current_page: number;
  last_page: number;
  total_results: number;
};

export type SearchClimatiqOptions = Pick<
  ClimatiqSearchRequest,
  'query' | 'page' | 'results_per_page'
>;
