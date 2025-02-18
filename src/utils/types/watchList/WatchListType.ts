import {WatchListEnum} from "../../enums/WatchListEnum.ts";

export type WatchListType = {
    id: number;
    type: WatchListEnum;
    item_id: number;
    created: string;
    updated: string;
    title: string | null;
};
