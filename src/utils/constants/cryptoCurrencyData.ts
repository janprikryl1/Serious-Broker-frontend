import {CryptoCurrencyCategoryEnum} from "../enums/CryptoCurrencyCategoryEnum.ts";
import {CryptoCurrencyType} from "../types/CryptoCurrencyType.ts";

export const cryptoCurrencyData: CryptoCurrencyType[] = [
    {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=035",
        category: [CryptoCurrencyCategoryEnum.BaseEcosystem],
        description: {
           cs: "Bitcoin je decentralizovaná digitální měna, což znamená, že není ovládaná žádným centralizovaným bankovním systémem nebo vládou a není vydána centralizovaným bankovním systémem.",
            en: "Bitcoin is a decentralized digital currency, meaning that it is not controlled by any central bank or government, and it is not issued by a central bank."
        },
        website: "https://www.bitcoin.com/",
        totalSupply: 21000000,
        created: "2009-01-03",
        updated: "2022-05-31",
    },
];
