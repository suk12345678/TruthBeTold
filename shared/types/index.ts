export * from './database.types';

export interface RentInput {
  rent: number;
  income: number;
  market_rent: number;
  unit_quality: number;
  zip_code: string;
}

export interface TruthScore {
  score: number;
  verdict: string;
}

