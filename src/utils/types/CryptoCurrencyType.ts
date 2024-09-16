export type CryptoCurrencyType = {
    id: number;
    name: string;
    symbol: string;
    image: string;
    description: string;
    website: string;
    totalSupply: number;
    created: string;
    updated: string;
};

export type CryptoCurrencyCategoryType = CryptoCurrencyType & {
    category: string;
}