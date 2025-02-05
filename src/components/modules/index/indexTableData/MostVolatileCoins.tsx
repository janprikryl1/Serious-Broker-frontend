import { useTranslation } from "react-i18next";
import {FC, useEffect, useState} from "react";
import {VolatileTable} from "./VolatileTable.tsx";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";
import {MostVolatile} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {getMostVolatileData} from "../../../../api/indexDataService.ts";
import {MostVolatileCoinsSkeleton} from "./skeletons/MostVolatileCoinsSkeleton.tsx";

export const MostVolatileCoins: FC = () => {
    const { t } = useTranslation();
    const [mostVolatile, setMostVolatile] = useState<MostVolatile>();

    useEffect(() => {
        const getMostVolatile = async () => {
            try {
                const response = await getMostVolatileData();
                if (!response) return;
                setMostVolatile(response.data);
            } catch (exception) {
                console.error(exception);
            }
        }
        getMostVolatile();
    }, []);
    
    return (
        <>
            {mostVolatile ? (
                <>
                    <h1 style={{fontSize: "40 px"}}>{t("The biggest jumpers up and down")}</h1>
                    <TypographyWithPopover popover={t("Which coins got the most")} style={{marginBottom:-25}}>
                        {t("Rises")}
                    </TypographyWithPopover>
                    <div className="p-4 rounded">
                        <VolatileTable data={mostVolatile.rises}/>
                    </div>
                    <TypographyWithPopover popover={t("Which coins lost the most")} style={{marginBottom:-25}}>
                        {t("Falls")}
                    </TypographyWithPopover>
                    <div className="p-4 rounded">
                        <VolatileTable data={mostVolatile.falls}/>
                    </div>
                </>
            ) : <MostVolatileCoinsSkeleton/>}
        </>
    );
};
