import {FC, useEffect} from "react";
import { Newsletter } from "../components/modules/index/Newsletter.tsx";
import { SwiperTerms } from "../components/modules/index/SwiperTerms.tsx";
import OverlayBackground from "../utils/icons/overlay_background2.jpg";
import {Page} from "../components/Page.tsx";
import {LastIndexes} from "../components/modules/index/LastIndexes.tsx";
import {PopularCoins} from "../components/modules/index/PopularCoins.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {TitleLinks} from "../components/modules/index/TitleLinks.tsx";
import {getIndexData} from "../api/indexDataService.ts";

export const Index: FC = () => {
    const {user} = useUserContext();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getIndexData();
                console.log(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    
    return (
       <Page image={OverlayBackground}>
           <TitleLinks />
           <SwiperTerms/>
           <LastIndexes/>
           <PopularCoins/>
           {user === null && (
               <Newsletter/>
           )}
       </Page>
    );
};
