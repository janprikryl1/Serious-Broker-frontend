import {FC, lazy, Suspense} from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {SignUpBanner} from "../components/modules/index/SignUpBanner.tsx";
import {NowTrending} from "../components/modules/index/NowTrending.tsx";
import {NewToInvesting} from "../components/modules/index/NewToInvesting.tsx";
import {Page} from "../components/modules/index/Page.tsx";
const IndexTableData = lazy(() => import("../components/modules/index/indexTableData/IndexTableData.tsx").then(module => ({ default: module.IndexTableData })));
const LookingForMoreInDepthStatistics = lazy(() => import("../components/modules/index/LookingForMoreInDepthStatistics.tsx").then(module => ({ default: module.LookingForMoreInDepthStatistics })));

export const Index: FC = () => {
    const {user} = useUserContext();
    
    return (
        <>
            <Page />
            <NowTrending />
            <NewToInvesting />
            {user === null && (
                <Newsletter/>
            )}
            <Suspense><IndexTableData /></Suspense>
            <Suspense><LookingForMoreInDepthStatistics /></Suspense>
            {user === null && (
                <SignUpBanner />
            )}
        </>
    );
};
