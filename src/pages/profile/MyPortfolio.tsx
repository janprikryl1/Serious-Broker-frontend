import {FC, useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {NewPortfolioButton} from "../../components/modules/profile/myPortfolio/NewPortfolioButton.tsx";
import {MyPortfolioCard} from "../../components/modules/profile/myPortfolio/MyPortfolioCard.tsx";
import {MyPortfolioType} from "../../utils/types/myPortfolio/MyPortfolioType.ts";
import {getMyPortfolios} from "../../api/myPortfolioService.ts";

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
        <div className="mt-1" style={{marginLeft: "20px"}}>
            <h2>
                <span>{t("My portfolio")}</span>
            </h2>
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