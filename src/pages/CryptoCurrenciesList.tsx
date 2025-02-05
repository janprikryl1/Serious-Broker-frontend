import {FC, useState} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {CryptoCurrencyViewSwitch} from "../components/modules/articles/cryptoCurrenciesList/CryptoCurrencyViewSwitch.tsx";
import {CryptoCategories} from "../components/modules/articles/cryptoCurrenciesList/CryptoCategories.tsx";
import {CryptoCurrencies} from "../components/modules/articles/cryptoCurrenciesList/CryptoCurrencies.tsx";

export const CryptoCurrenciesList:FC = () => {
    const [showCategory, setShowCategory] = useState(false);
    
    return (
        <>
            <TitleHeader title="Crypto currencies list"/>
            <div className="padding-bottom">
                <div className="graph-container">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <CryptoCurrencyViewSwitch showCategory={showCategory} setShowCategory={setShowCategory}/>
                                {showCategory ? (
                                    <CryptoCategories />
                                ) : (
                                    <CryptoCurrencies />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};