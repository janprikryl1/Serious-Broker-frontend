export type InvestmentPlanType = {
    id?: number;
    name: string;
    description?: string;
    is_custom_portfolio: boolean;
    user_portfolio_id?: number | null;
    binance_asset_id?: number | null;
    frequency: string;
    day_of_period: number | null;
    investment_hour: number;
    start_date: string | null;
    investment_amount: number;
    currency: string;
    buy_traffic_light_id?: number | null;
    sell_traffic_light_id?: number | null;
};

export type InvestmentPlanTargetCoin = {
    id: number;
    asset_label: string;
};

export type InvestmentPlanTypeDetails = {
    id?: number;
    name: string;
    description?: string;
    is_custom_portfolio: boolean;
    user_portfolio_id?: number | null;
    binance_asset_id?: number | null;
    frequency: string;
    day_of_period: number | null;
    investment_hour: number;
    start_date: string | null;
    investment_amount: number;
    currency: string;
    buy_traffic_light_id?: number | null;
    sell_traffic_light_id?: number | null;

    // Joined/computed fields from investment plan details query
    target_name: string | null;
    target_type: 'portfolio' | 'index';
    portfolio_name: string | null;
    index_name: string | null;
    buy_traffic_light_name: string | null;
    sell_traffic_light_name: string | null;
    target_coins?: InvestmentPlanTargetCoin[] | null;
};