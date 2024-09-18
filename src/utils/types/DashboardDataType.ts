import {TableLogType} from "./TableLogType.ts";

export type DashboardDataType = {
    article_count: number,
    user_count: number,
    last_log: TableLogType;
}