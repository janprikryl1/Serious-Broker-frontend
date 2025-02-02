export type AssetDetailType = {
    label: string;
    name: string;
    description?: string;
    assets: Assets[];
    COINS: string;
    last_update: string;
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

export type Assets = {
    id: number;
    asset_label: string;
    allocation: number;
    status?: boolean;
    changed?: string;
    created?: string;
};