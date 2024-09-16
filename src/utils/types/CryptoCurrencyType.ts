import {CryptoCurrencyCategoryEnum} from "../enums/CryptoCurrencyCategoryEnum.ts";

export type CryptoCurrencyType = {
    id: number;
    name: string;
    symbol: string;
    image: string;
    category: CryptoCurrencyCategoryEnum[];
    description: {
        cs: string;
        en: string;
    };
    website: string;
    totalSupply: number;
    created: string;
    updated: string;
};
