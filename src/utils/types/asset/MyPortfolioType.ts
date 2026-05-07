export type CustomPortfolioAssetType = {
    id: number;
    asset_label: string;
    allocation: number;
    status: boolean;
    photo: string;
}

export type MyPortfolioType = {
    label: string;
    description: string;
    last_update: string;
    created: string;
    invested_amount: number;
    start_invest: string | Date;
    current_value: number;
    value_change_pct: number;
    asset: CustomPortfolioAssetType[];
    week_all_profit: number;
    week_0_profit: number;
    week_1_profit: number;
    week_2_profit: number;
    week_3_profit: number;
    month_all_profit: number;
    month_0_profit: number;
    month_1_profit: number;
    month_2_profit: number;
    quarter_all_profit: number;
    quarter_0_profit: number;
    quarter_1_profit: number;
    quarter_2_profit: number;
    quarter_3_profit: number;
    year_all_profit: number;
    year_0_profit: number;
    year_1_profit: number;
    year_2_profit: number;
    sell_week_0_profit: number;
    sell_week_1_profit: number;
    sell_week_2_profit: number;
    sell_week_3_profit: number;
    sell_month_0_profit: number;
    sell_month_1_profit: number;
    sell_month_2_profit: number;
    sell_quarter_0_profit: number;
    sell_quarter_1_profit: number;
    sell_quarter_2_profit: number;
    sell_quarter_3_profit: number;
    sell_year_0_profit: number;
    sell_year_1_profit: number;
    sell_year_2_profit: number;
}

export type PortfolioGraphData = {
    chartValues: number[];
    profitEur: number;
    profitPct: number
}