import {FC, useState} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {CryptoCurrencyViewSwitch} from "../components/articles/cryptoCurrenciesList/CryptoCurrencyViewSwitch.tsx";
import {CryptoCategories} from "../components/articles/cryptoCurrenciesList/CryptoCategories.tsx";
import {CryptoCurrencies} from "../components/articles/cryptoCurrenciesList/CryptoCurrencies.tsx";

export const CryptoCurrenciesList:FC = () => {

    return (
        <>
            <TitleHeader title="Cryptocurrencies List"/>
            <div className="container padding-bottom">
                <CryptoCurrencies />
            </div>
        </>
    );
};