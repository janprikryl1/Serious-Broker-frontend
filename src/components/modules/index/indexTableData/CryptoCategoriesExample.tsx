import { FC, Fragment } from "react";
import { useIndexDataContext } from "../../../../utils/providers/IndexDataProvider.tsx";
import { Link } from "react-router-dom";
import { routes } from "../../../../utils/constants";
import { TableTemplate } from "../../TableTemplate.tsx";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider.tsx";
import { useTranslation } from "react-i18next";
import { CoinData } from "../../../../utils/types/indexPage/IndexDataStructure.ts";

export const CryptoCategoriesExample: FC = () => {
    const { theme } = useThemeContext();
    const { t } = useTranslation();
    const { data } = useIndexDataContext();
    const totalRows = data.coin_categories.reduce(
        (sum, category) => sum + JSON.parse(category.coins).length + 1,
        0
    );
    
    return (
        <TableTemplate title={t("Types of cryptocurrencies")}>
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <table className="table no-border-row">
                    <thead>
                    <tr>
                        <th>{t("Order")}</th>
                        <th>{t("Title")}</th>
                        <td>{t("Symbol")}</td>
                        <th>{t("Price")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.coin_categories.map((category, categoryIndex) => {
                        const coins: CoinData[] = JSON.parse(category.coins);
                        return (
                            <Fragment key={category.tag_name}>
                                <tr>
                                    <td colSpan={4} className="fw-bold" style={{ textAlign: "left" }}>
                                        {t(category.tag_name)}
                                    </td>
                                    {categoryIndex === 0 && (
                                        <td rowSpan={totalRows} className="text-center align-middle">
                                            <Link
                                                to={routes.cryptocurrenciesList}
                                                className="btn btn-warning text-dark w-100"
                                            >
                                                <span>{t("What are the")}</span><br />
                                                <span>{t("other cryptocurrency")}</span><br />
                                                <span>{t("groups and how")}</span><br />
                                                <span>{t("much do")}</span><br />
                                                <span>{t("they earn?")}</span>
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                                {coins.map((coin, index) => (
                                    <tr key={coin.id}>
                                        <td>{index + 1}</td>
                                        <td>{coin.name}</td>
                                        <td>{coin.symbol}</td>
                                        <td>{coin.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </Fragment>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <div className="row">
                    <div className="col-sm-8">
                        <Link to={routes.cryptocurrenciesList} className="text-decoration-none">{t("What are the other coins that belong to each group?")}</Link>
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
