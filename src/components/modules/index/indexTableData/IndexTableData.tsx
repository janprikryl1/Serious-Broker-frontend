import { FC } from "react";
import { PopularCoins } from "./PopularCoins.tsx";
import { MostProfitableLastSelectedPeriod } from "./MostProfitableLastSelectedPeriod.tsx";
import { IndexDataProvider } from "../../../../utils/providers/IndexDataProvider.tsx";
import { IndexTableTitle } from "./IndexTableTitle.tsx";
import { CryptoCategoriesExample } from "./CryptoCategoriesExample.tsx";
import { MostVolatileCoins } from "./MostVolatileCoins.tsx";
import { GlossaryOverview } from "./GlossaryOverview.tsx";
import { BestPortfolioTable } from "./BestPortfolioTable.tsx";

export const IndexTableData: FC = () => {
    return (
        <IndexDataProvider>
            <div
                className="text-center d-flex flex-column align-items-center justify-content-center"
                style={{ marginTop: "250px" }}
            >
                <IndexTableTitle />
                <div className="d-flex justify-content-center align-items-stretch flex-wrap mt-5">
                    <div className="p-3">
                        <MostProfitableLastSelectedPeriod />
                    </div>
                    <div className="p-3">
                        <PopularCoins />
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-stretch flex-wrap">
                    <div className="p-3">
                        <CryptoCategoriesExample />
                    </div>
                    <div className="p-3">
                        <MostVolatileCoins />
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-stretch flex-wrap">
                    <div className="p-3 w-100">
                        <GlossaryOverview />
                    </div>
                    <div className="p-3 w-100">
                        <BestPortfolioTable />
                    </div>
                </div>
            </div>
        </IndexDataProvider>
    );
};
