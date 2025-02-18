import {FC, useEffect, useState} from "react";
import {GlossaryItemOverview} from "../../reusable/GlossaryItemOverview.tsx";
import {GlossaryType} from "../../../../utils/types/GlossaryType.ts";
import {getGlossaryOverview} from "../../../../utils/api/indexDataService.ts";

export const GlossaryOverview:FC = () => {
    const [DYOR, setDyor] = useState<GlossaryType>();

    useEffect(() => {
        const getDYOR = async () => {
            try {
                const response = await getGlossaryOverview();
                setDyor(response.data);
            } catch (exception) {
                console.error(exception);
            }
        }
        getDYOR();
    }, []);
    
    if (DYOR) {
        return (
            <GlossaryItemOverview data={DYOR} />
        );
    }
};