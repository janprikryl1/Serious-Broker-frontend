export type LastMostProfitableCoins = {
    asset_label: string;
    quote_currencies: string;
    cmc_rank: string;
    week_0_pos: number;
    week_0_profit: number;
    
    week_1_pos?: number;
    week_1_profit: number;
    week_2_profit: number;
}