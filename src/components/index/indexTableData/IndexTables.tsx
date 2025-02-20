import {FC, lazy} from "react";
import {NotAuthenticatedIndexTable} from "./NotAuthenticatedIndexTable.tsx";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {useIndexDataContext} from "../../../utils/providers/IndexDataProvider.tsx";
import {IndexSeasonExtended} from "../../../utils/enums/IndexSeasonEnum.ts";
import {PageLoader} from "../../reusable/PageLoader.tsx";
const MostProfitableLastSelectedPeriod = lazy(() => import("./MostProfitableLastSelectedPeriod.tsx").then(module => ({ default: module.MostProfitableLastSelectedPeriod })));
const PopularCoins = lazy(() => import("./PopularCoins.tsx").then(module => ({ default: module.PopularCoins })));
const MostVolatileCoins = lazy(() => import("./MostVolatileCoins.tsx").then(module => ({ default: module.MostVolatileCoins })));

export const IndexTables:FC = () => {
    const {user} = useUserContext();
    const {season} = useIndexDataContext();
    
    return (
        <>
            {!user && season !== IndexSeasonExtended.WEEK ? (
                <NotAuthenticatedIndexTable />
            ) : (
                <>
                    <PageLoader><MostProfitableLastSelectedPeriod /></PageLoader>
                    <PageLoader><MostVolatileCoins /></PageLoader>
                    <PageLoader><PopularCoins /></PageLoader>
                </>
            )}
        </>
    )
}