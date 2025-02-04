import {FC} from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import CryptoHand from "../utils/icons/crypto-hand2_light.png";
import {Page} from "../components/Page.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {IndexTableData} from "../components/modules/index/indexTableData/IndexTableData.tsx";
import {LookingForMoreInDepthStatistics} from "../components/modules/index/LookingForMoreInDepthStatistics.tsx";
import {SignUpBanner} from "../components/modules/index/SignUpBanner.tsx";
import {NowTrending} from "../components/modules/index/NowTrending.tsx";
import {NewToInvesting} from "../components/modules/index/NewToInvesting.tsx";
import {IndexDataProvider} from "../utils/providers/IndexDataProvider.tsx";

export const Index: FC = () => {
    const {user} = useUserContext();
    
    return (
        <IndexDataProvider>
            <Page image={CryptoHand} />
            <NowTrending />
            <NewToInvesting />
            {user === null && (
                <Newsletter/>
            )}
            <IndexTableData />
            <LookingForMoreInDepthStatistics />
            {user === null && (
                <SignUpBanner />
            )}
        </IndexDataProvider>
    );
};
