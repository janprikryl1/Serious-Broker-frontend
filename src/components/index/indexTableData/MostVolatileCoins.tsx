import { useTranslation } from "react-i18next";
import {FC, useEffect, useState, useTransition} from "react";
import {VolatileTable} from "./VolatileTable.tsx";
import {MostVolatileCoinsSkeleton} from "./skeletons/MostVolatileCoinsSkeleton.tsx";
import {MostVolatile} from "../../../utils/types/indexPage/IndexDataStructure.ts";
import {getMostVolatileData} from "../../../utils/api/indexDataService.ts";
import {TypographyWithPopover} from "../../reusable/TypographyWithPopover.tsx";

export const MostVolatileCoins: FC = () => {
    const { t } = useTranslation();
    const [mostVolatile, setMostVolatile] = useState<MostVolatile>();
    const [isPending, startTransition] = useTransition();

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
        startTransition(() => {
            getMostVolatile();
        });
    }, []);
    
    return (
        <>
            {!isPending && mostVolatile ? (
                <>
                    <h2 className="index-title">{t("The biggest jumpers up and down")}</h2>
                    <TypographyWithPopover popover={t("Which coins got the most")}>
                        {t("Rises")}
                    </TypographyWithPopover>
                    <div className="p-4 rounded">
                        <VolatileTable data={mostVolatile.rises}/>
                    </div>
                    <TypographyWithPopover popover={t("Which coins lost the most")} style={{marginTop:-50}}>
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
