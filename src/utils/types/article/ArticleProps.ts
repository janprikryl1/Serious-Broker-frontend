export type ArticleProps = {
    id: number;
    user_firstname: string;
    user_surname: string;
    language: string;
    title: string;
    description: string;
    created: string;
    changed: string;
    allowComments: boolean;
    articleTypeOption: string;
    premiumOnly: boolean;
    banner: string;
    in_watchlist: boolean;
}