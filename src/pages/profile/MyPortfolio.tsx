import {FC} from "react";
import {useTranslation} from "react-i18next";
import {NewPortfolioButton} from "../../components/modules/profile/myPortfolio/NewPortfolioButton.tsx";
import {MyPortfolioCard} from "../../components/modules/profile/myPortfolio/MyPortfolioCard.tsx";

const myPortfolio = [
    {
        id: 1,
        title: "Portfolio 1",
        description: "Lorem ipsum dolor sit amet",
    }
];

export const MyPortfolio:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="mt-1" style={{marginLeft: "20px"}}>
            <h2>
                <span>{t("My portfolio")}</span>
            </h2>
            <p>{t("You can create your own portfolio from our assets and coins and see how much you can earn")}</p>
            <NewPortfolioButton />
            {myPortfolio.map((portfolio) => (
                <MyPortfolioCard key={portfolio.id} data={portfolio} />
            ))}
        </div>
    );
};