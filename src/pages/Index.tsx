import { FC } from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import { Pricing } from "../components/modules/index/Pricing.tsx";
import { Services } from "../components/modules/index/Services.tsx";
import { ComingSoon } from "../components/modules/index/ComingSoon.tsx";
import { Hero } from "../components/modules/index/Hero.tsx";
import OverlayBackground from "../utils/icons/overlay_background2.jpg";
import {Page} from "../components/Page.tsx";
import {LastIndexes} from "../components/modules/index/LastIndexes.tsx";
import {PopularCoins} from "../components/modules/index/PopularCoins.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";

export const Index: FC = () => {
    const {user} = useUserContext();
    
    return (
       <Page image={OverlayBackground}>
           <Hero/>
           <ComingSoon/>
           <Services/>
           <LastIndexes/>
           <PopularCoins/>
           {user === null && (
               <>
                <Pricing/>
                <Newsletter/>
               </>
           )}
       </Page>
    );
};
