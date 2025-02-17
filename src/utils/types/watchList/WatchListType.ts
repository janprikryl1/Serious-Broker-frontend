import {WatchListEnum} from "../../enums/WatchListEnum.ts";

export type WatchListType = {
    id: number;
    type: WatchListEnum;
    itemId: number;
    userId: number;
    created: string;
    updated: string;
};
