export type CoinData = {
    id: number;
    name: string;
    symbol: string;
    price: number;
};

export type CoinCategory = {
    tag_name: string;
    coins: CoinData[];
};

export type AssetProfitData = {
    asset_label: string;
    quote_currencies: string[];
    cmc_rank: number;
    week_0_pos: number;
    week_0_profit: number;
    week_1_profit: number;
    week_2_profit: number | null;
    month_0_profit: number;
    month_1_profit: number;
    month_2_profit: number | null;
    quarter_0_profit: number;
    quarter_1_profit: number | null;
    quarter_2_profit: number | null;
    year_0_profit: number;
    year_1_profit: number | null;
    year_2_profit: number | null;
};

export type MostProfitable = {
    asset_label: string;
    quote_currencies: string[];
    cmc_rank: number;
    week_0_pos: number;
    week_0_profit: number;
};

export type MostVolatileData = {
    asset_label: string;
    symbol_name: string;
    percent_volatility: number;
    graph_data: number[];
};

export type MostVolatile = {
    rises: MostVolatileData[];
    falls: MostVolatileData[];
};

export type TopMostProfitableAsset = {
    order_index: number;
    asset_label: string;
    quote_currencies: string;
    week_0_profit: number | null;
    week_1_profit: number | null;
    week_2_profit: number | null;
    week_3_profit: number | null;
    month_0_profit: number | null;
    month_1_profit: number | null;
    month_2_profit: number | null;
    quarter_0_profit: number | null;
    quarter_1_profit: number | null;
    quarter_2_profit: number | null;
    quarter_3_profit: number | null;
    year_0_profit: number | null;
    year_1_profit: number | null;
    year_2_profit: number | null;
    week_all_profit: number | null;
    month_all_profit: number | null;
    quarter_all_profit: number | null;
    year_all_profit: number | null;
}

export type IndexDataStructure = {
    date: string;
    last_most_profitable: AssetProfitData[];
};