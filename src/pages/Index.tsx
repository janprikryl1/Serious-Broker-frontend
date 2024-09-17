import { FC } from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import { Pricing } from "../components/modules/index/Pricing.tsx";
import { Services } from "../components/modules/index/Services.tsx";
import { ComingSoon } from "../components/modules/index/ComingSoon.tsx";
import { Hero } from "../components/modules/index/Hero.tsx";
import OverlayBackground from "../utils/icons/overlay_background.jpg";
import {Page} from "../components/Page.tsx";

export const Index: FC = () => {
    return (
       <Page image={OverlayBackground}>
           <Hero/>
           <ComingSoon/>
           <Services/>
           <Pricing/>
           <Newsletter/>
       </Page>
    );
};
