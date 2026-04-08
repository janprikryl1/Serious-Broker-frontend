export type CryptoCurrencyType = {
    id: number;
    name: string;
    symbol: string;
};

export type CryptoCurrencyDetailType = CryptoCurrencyType & { 
    price: number;
    marketcap: string;
    category: string;
    max_supply: number;
    circulating_supply: string;
    website: string;
    whitepaper: string;
    reddit: string; 
    twitter: string;
    telegram: string;
    cmc_rank: number;
    date: string;
    photo: string;
    stylized_image: string;
    categories: string;
}

export type CryptoCurrencyAdminType = CryptoCurrencyType & {
    photo: File | null;
    stylized_image: string;
};

export type CryptoCurrencyNewType = CryptoCurrencyType & {
    price: number;
    marketcap: string;
    category: string;
    max_supply: number;
    circulating_supply: string;
    website: string;
    whitepaper: string;
    reddit: string;
    twitter: string;
    telegram: string;
    cmc_rank: number;
    date: string;
    photo: File | null;
}