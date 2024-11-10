import { FC } from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import { Services } from "../components/modules/index/Services.tsx";
import { ComingSoon } from "../components/modules/index/ComingSoon.tsx";
import OverlayBackground from "../utils/icons/overlay_background2.jpg";
import {Page} from "../components/Page.tsx";
import {LastIndexes} from "../components/modules/index/LastIndexes.tsx";
import {PopularCoins} from "../components/modules/index/PopularCoins.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {TitleLinks} from "../components/modules/index/TitleLinks.tsx";

export const Index: FC = () => {
    const {user} = useUserContext();
    
    return (
       <Page image={OverlayBackground}>
           <TitleLinks />
           <ComingSoon/>
           <Services/>
           <LastIndexes/>
           <PopularCoins/>
           {user === null && (
               <Newsletter/>
           )}
       </Page>
    );
};
