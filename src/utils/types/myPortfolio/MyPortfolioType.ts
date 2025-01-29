import {Assets} from "../asset/AssetDetailType.ts";

export type MyPortfolioType = {
    id?: number;
    name: string;
    description: string;
    user_id?: number;
    asset: Assets[];
}