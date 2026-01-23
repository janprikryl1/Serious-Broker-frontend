import {Assets} from "../asset/AssetDetailType.ts";

export type MyPortfolioType = {
    id?: number;
    name: string;
    description: string;
    user_id?: number;
    invested_amount: number;
    start_invest: string;
    last_updated?: string | Date;
    asset: Assets[];
}