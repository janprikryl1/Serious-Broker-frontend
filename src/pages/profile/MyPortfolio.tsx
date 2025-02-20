import {FC, useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {MyPortfolioType} from "../../utils/types/myPortfolio/MyPortfolioType.ts";
import {getMyPortfolios} from "../../utils/api/myPortfolioService.ts";
import {NewPortfolioButton} from "../../components/profile/myPortfolio/NewPortfolioButton.tsx";
import {MyPortfolioCard} from "../../components/profile/myPortfolio/MyPortfolioCard.tsx";

export const MyPortfolio:FC = () => {
    const { t } = useTranslation();
    const [myPortfolios, setMyPortfolios] = useState<MyPortfolioType[]>([]);

    const fetchMyPortfolios = useCallback(async () => {
        try {
            const response = await getMyPortfolios();
            setMyPortfolios(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);
    
    useEffect(() => {
        fetchMyPortfolios();
    }, [fetchMyPortfolios]);
    
    return (
        <div className="mt-1">
            <h2 className="asset-title">{t("My portfolio")}</h2>
            <p>{t("You can create your own portfolio from coins and see how much you can earn")}</p>
            <NewPortfolioButton />
            <div className="row">
                {myPortfolios.map((portfolio) => (
                    <MyPortfolioCard key={portfolio.id} data={portfolio} fetchMyPortfolios={fetchMyPortfolios} />
                ))}
            </div>
        </div>
    );
};