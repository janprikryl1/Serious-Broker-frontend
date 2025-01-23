import {FC} from "react";
import {IndexSeason} from "../../../../utils/enums/IndexSeasonEnum.ts";
import {NotAuthenticatedIndexTable} from "./NotAuthenticatedIndexTable.tsx";
import {MostProfitableLastSelectedPeriod} from "./MostProfitableLastSelectedPeriod.tsx";
import {PopularCoins} from "./PopularCoins.tsx";
import {CryptoCategoriesExample} from "./CryptoCategoriesExample.tsx";
import {MostVolatileCoins} from "./MostVolatileCoins.tsx";
import {GlossaryOverview} from "./GlossaryOverview.tsx";
import {BestPortfolioTable} from "./BestPortfolioTable.tsx";
import {useUserContext} from "../../../../utils/providers/providerUser.tsx";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";

export const IndexTables:FC = () => {
    const {user} = useUserContext();
    const {season} = useIndexDataContext();
    
    return (
        <>
            {!user && season !== IndexSeason.WEEK ? (
            <NotAuthenticatedIndexTable />
            ) : (
                <>
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
                </>
            )}
        </>
    )
}