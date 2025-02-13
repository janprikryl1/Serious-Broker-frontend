import {FC} from "react";
import {MyPortfolioProvider} from "../../utils/providers/MyPortfolioProvider.tsx";
import {MyPortfolioAssets} from "../../components/modules/profile/myPortfolio/myPortfolioEdit/MyPortfolioAssets.tsx";
import {MyPortfolioDetails} from "../../components/modules/profile/myPortfolio/myPortfolioEdit/MyPortfolioDetails.tsx";
import {SavePortfolioButton} from "../../components/modules/profile/myPortfolio/myPortfolioEdit/SavePortfolioButton.tsx";
import {MyPortfolioPreviewButton} from "../../components/modules/profile/myPortfolio/myPortfolioEdit/MyPortfolioPreviewButton.tsx";

export const EditMyPortfolio:FC = () => {
    return (
        <div className="service-details__item-inner">
            <MyPortfolioProvider>
                <MyPortfolioDetails />
                <MyPortfolioAssets />
                <SavePortfolioButton />
                <MyPortfolioPreviewButton />
            </MyPortfolioProvider>
        </div>
    );
}