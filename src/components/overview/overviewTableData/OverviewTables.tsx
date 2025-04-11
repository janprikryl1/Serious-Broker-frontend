import {FC} from "react";
import {NotAuthenticatedIndexTable} from "./NotAuthenticatedIndexTable.tsx";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {useIndexDataContext} from "../../../utils/providers/IndexDataProvider.tsx";
import {IndexSeasonExtended} from "../../../utils/enums/IndexSeasonEnum.ts";
import {MostProfitableLastSelectedPeriod} from "./MostProfitableLastSelectedPeriod.tsx";
import {MostVolatileCoins} from "./MostVolatileCoins.tsx";
import {PopularCoins} from "./PopularCoins.tsx";

export const OverviewTables:FC = () => {
    const {user} = useUserContext();
    const {season} = useIndexDataContext();
    
    return (
        <>
            {!user && season !== IndexSeasonExtended.WEEK ? (
                <NotAuthenticatedIndexTable />
            ) : (
                <>
                    <MostProfitableLastSelectedPeriod />
                    <MostVolatileCoins />
                    <PopularCoins />
                </>
            )}
        </>
    )
}