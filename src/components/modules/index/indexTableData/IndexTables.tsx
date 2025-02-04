import {FC} from "react";
import {IndexSeason} from "../../../../utils/enums/IndexSeasonEnum.ts";
import {NotAuthenticatedIndexTable} from "./NotAuthenticatedIndexTable.tsx";
import {MostProfitableLastSelectedPeriod} from "./MostProfitableLastSelectedPeriod.tsx";
import {PopularCoins} from "./PopularCoins.tsx";
import {MostVolatileCoins} from "./MostVolatileCoins.tsx";
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
                    <MostProfitableLastSelectedPeriod />
                    <MostVolatileCoins />
                    <PopularCoins />
                    {/*<CryptoCategoriesExample />*/}    
                    {/*<BestPortfolioTable />*/}
                </>
            )}
        </>
    )
}