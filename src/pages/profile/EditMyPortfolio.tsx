import {FC} from "react";
import {MyPortfolioProvider, useMyPortfolioContext} from "../../utils/providers/MyPortfolioProvider.tsx";
import {MyPortfolioDetails} from "../../components/profile/myPortfolio/myPortfolioEdit/MyPortfolioDetails.tsx";
import {MyPortfolioAssets} from "../../components/profile/myPortfolio/myPortfolioEdit/MyPortfolioAssets.tsx";
import {SavePortfolioButton} from "../../components/profile/myPortfolio/myPortfolioEdit/SavePortfolioButton.tsx";
import {MyPortfolioPreviewButton} from "../../components/profile/myPortfolio/myPortfolioEdit/MyPortfolioPreviewButton.tsx";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";

export const EditMyPortfolio:FC = () => {
  return (
    <MyPortfolioProvider>
      <EditMyPortfolioContent />
    </MyPortfolioProvider>
  );
}

const EditMyPortfolioContent: FC = () => {
  const { name } = useMyPortfolioContext();

  return (
    <>
      <TitleHeader title={name ? `Edit ${name}` : "New Portfolio"} />
      <div className="container">
        <MyPortfolioDetails />
        <MyPortfolioAssets />
        <SavePortfolioButton />
        <MyPortfolioPreviewButton />
      </div>
    </>
  );
};