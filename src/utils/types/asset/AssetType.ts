export type AssetType = {
    id: number;
    label: string;
    name: string;
    status: string;
    created: string;
    coins: string;
    to_date: string;
    in_watchlist: boolean;
    profit_change: number;
}

export type AssetProfitList = {
    id: number;
    label: string;
    name: string;
    status: string;
    created: string;
    profit_list: number[];
    to_date: string;
    in_watchlist: boolean;
    daily_change: number;
};