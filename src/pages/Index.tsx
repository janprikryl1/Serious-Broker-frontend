import {FC} from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import { SwiperTerms } from "../components/modules/index/SwiperTerms.tsx";
import OverlayBackground from "../utils/icons/overlay_background2.jpg";
import {Page} from "../components/Page.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {TitleLinks} from "../components/modules/index/TitleLinks.tsx";
import {IndexTableData} from "../components/modules/index/indexTableData/IndexTableData.tsx";

export const Index: FC = () => {
    const {user} = useUserContext();
    
    return (
       <Page image={OverlayBackground}>
           <TitleLinks />
           <SwiperTerms/>
           <IndexTableData />
           {user === null && (
               <Newsletter/>
           )}
       </Page>
    );
};
