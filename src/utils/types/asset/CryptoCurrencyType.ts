export type CryptoCurrencyType = {
    id: number;
    name: string;
    symbol: string;
};

export type CryptoCurrencyDetailType = CryptoCurrencyType & {
    id: number;
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
    categories: string;
    stylized_image: string | null;
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
    stylized_image_file: File | null;
}
