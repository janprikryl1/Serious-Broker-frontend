import { useTranslation } from "react-i18next";
import {FC, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider.tsx";
import { TableTemplate } from "../../TableTemplate.tsx";
import { routes } from "../../../../utils/constants";
import {VolatileTable} from "./VolatileTable.tsx";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";
import {MostVolatile} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {getMostVolatileData} from "../../../../api/indexDataService.ts";
import {MostVolatileCoinsSkeleton} from "./skeletons/MostVolatileCoinsSkeleton.tsx";

export const MostVolatileCoins: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
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
        <TableTemplate title="Cryptocurrency volatility">
            <p>{t("The biggest jumpers up and down")}</p>
            {mostVolatile ? 
                (<div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                    <TypographyWithPopover popover={t("Which coins got the most")}>
                        <h4>{t("Rises")}</h4>
                    </TypographyWithPopover>
                    <VolatileTable data={mostVolatile.rises}/>
                    <TypographyWithPopover popover={t("Which coins lost the most")}>
                        <h4>{t("Falls")}</h4>
                    </TypographyWithPopover>
                    <VolatileTable data={mostVolatile.falls}/>
                    </div>
                ) : <MostVolatileCoinsSkeleton />
            }
            <div className="mt-4">
                <div className="row">
                    <div className="col-sm-8">
                        <Link to={routes.cryptocurrenciesList}
                              className="text-decoration-none">{t("What are the other coins that belong to each group?")}</Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to={routes.register} className="btn btn-outline-warning w-80 mt-3">
                            {t("Register")}
                        </Link>
                    </div>
                </div>
            </div>
        </TableTemplate>
    );
};
