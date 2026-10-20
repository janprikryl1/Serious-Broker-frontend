export type CoinHistory = {
  data: {
    date: string;
    price: number;
    buy_for_one_eur: number;
    asset_label: string;
    symbol_name: string;
    created: string;
  }[];
  analyzed_posts: number;
}