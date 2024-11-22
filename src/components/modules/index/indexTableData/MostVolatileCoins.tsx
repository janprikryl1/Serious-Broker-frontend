import { useTranslation } from "react-i18next";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider.tsx";
import { useIndexDataContext } from "../../../../utils/providers/IndexDataProvider.tsx";
import { TableTemplate } from "../../TableTemplate.tsx";
import { routes } from "../../../../utils/constants";
import {VolatileTable} from "./VolatileTable.tsx";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";

export const MostVolatileCoins: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const { data } = useIndexDataContext();
    
    return (
        <TableTemplate title="Cryptocurrency volatility">
            <p>{t("The biggest jumpers up and down")}</p>
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <TypographyWithPopover popover={t("Which coins got the most")}>
                    <h4>{t("Rises")}</h4>
                </TypographyWithPopover>
                <VolatileTable data={data.most_volatible.rises}/>
                <TypographyWithPopover popover={t("Which coins lost the most")}>
                    <h4>{t("Falls")}</h4>
                </TypographyWithPopover>
                <VolatileTable data={data.most_volatible.falls}/>
            </div>
            <div className="mt-4">
                <div className="row">
                    <div className="col-sm-8">
                        <Link to={routes.cryptocurrenciesList}
                              className="text-decoration-none">{t("What are the other coins that belong to each group?")}</Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to={routes.register} className="btn btn-outline-warning w-100">
                            {t("Register")}
                        </Link>
                    </div>
                </div>
            </div>
        </TableTemplate>
    );
};
