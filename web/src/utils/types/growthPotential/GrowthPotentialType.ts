export type AssetProfit = {
  asset_id: number;
  symbol: string | null;
  name: string | null;
  current_price_eur: number;
  profit_pct: number;
  investment_eur: number;
  profit_eur: number;
  period: 'week' | 'month' | 'year'; // Atribút na rozlíšenie obdobia
};

export type GrowthPotentialType = {
  performers: AssetProfit[];
};