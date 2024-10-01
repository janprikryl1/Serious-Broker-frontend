export type LastMostProfitableCoins = {
    asset_label: string;
    quote_currencies: string;
    cmc_rank: string;
    week_0_pos: number;
    week_0_profit: number;
    
    week_1_pos?: number | null;
    week_1_profit: number | null;
    week_2_profit: number | null;
    
    month_0_profit: number | null;
    month_1_profit: number | null;
    month_2_profit: number | null;
    quarter_0_profit: number | null;
    quarter_1_profit: number | null;
    quarter_2_profit: number | null;
    year_0_profit: number | null;
    year_1_profit: number | null;
    year_2_profit: number | null;
}