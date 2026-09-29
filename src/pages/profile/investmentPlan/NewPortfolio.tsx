import {FC} from "react";
import {MyPortfolioProvider} from "../../../utils/providers/MyPortfolioProvider.tsx";
import {NewPortfolioComponent} from "../../../components/investmentPlan/NewPortfolioComponent.tsx";

export const NewPortfolio: FC = () => {
    return (
        <div>
            <MyPortfolioProvider>
                <NewPortfolioComponent />
            </MyPortfolioProvider>
        </div>
    );
}