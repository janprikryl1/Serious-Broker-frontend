import {FC, lazy, Suspense} from "react";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {Page} from "../components/index/Page.tsx";
import {NowTrending} from "../components/index/NowTrending.tsx";
import {NewToInvesting} from "../components/index/NewToInvesting.tsx";
import {Newsletter} from "../components/index/Newsletter.tsx";
import {SignUpBanner} from "../components/index/SignUpBanner.tsx";
const IndexTableData = lazy(() => import("../components/index/indexTableData/IndexTableData.tsx").then(module => ({ default: module.IndexTableData })));
const LookingForMoreInDepthStatistics = lazy(() => import("../components/index/LookingForMoreInDepthStatistics.tsx").then(module => ({ default: module.LookingForMoreInDepthStatistics })));

export const Index: FC = () => {
    const {user} = useUserContext();
    
    return (
        <div className="container">
            <Page />
            <NowTrending />
            <NewToInvesting />
            {!user && (
                <Newsletter/>
            )}
            <Suspense><IndexTableData /></Suspense>
            <Suspense><LookingForMoreInDepthStatistics /></Suspense>
            {user === null && (
                <SignUpBanner />
            )}
        </div>
    );
};
