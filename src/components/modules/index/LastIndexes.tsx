import cta2 from "../../../utils/icons/cta/2.png";
import cta5 from "../../../utils/icons/cta/5.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getLastMostProfitable } from "../../../api/indexDataService.ts";
import { LastMostProfitableCoins } from "../../../utils/types/indexPage/LastMostProfitableCoins.ts";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";
import { LastGraphs } from "./LastGraphs.tsx";
import { useThemeContext } from "../../../utils/providers/ThemeProvider.tsx";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {Button} from "../../Button.tsx";
import {routes} from "../../../utils/constants";

export const LastIndexes = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const { theme } = useThemeContext();
    const [lastMostProfitable, setLastMostProfitable] = useState<LastMostProfitableCoins[] | undefined>(undefined);

    useEffect(() => {
        const getLastMostProfitableData = async () => {
            try {
                const result = await getLastMostProfitable();
                setLastMostProfitable(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        getLastMostProfitableData();
    }, []);

    if (!lastMostProfitable) {
        return <p>Loading data...</p>;
    }

    const rows = lastMostProfitable.map((coin) => ({
        id: coin.cmc_rank,
        asset_label: coin.asset_label,
        name: coin.name,
        quote_currencies: coin.quote_currencies,
        cmc_rank: coin.cmc_rank,
        week_0_pos: coin.week_0_pos,
        week_0_profit: coin.week_0_profit,
        week_1_pos: user ? coin.week_1_pos : undefined,
        week_1_profit: user ? coin.week_1_profit : undefined,
    }));

    const columns = [
        { field: 'week_0_pos', headerName: t("Positions in week 0: "), flex: 1 },
        { field: 'asset_label', headerName: t("Title"), flex: 1 },
        { field: 'quote_currencies', headerName: t("Quote currencies: "), flex: 1 },
        { field: 'cmc_rank', headerName: t("cmc_rank"), flex: 1 },
        { field: 'week_0_profit', headerName: t("Week 0 profit: "), flex: 1 },
        ...(user ? [
            { field: 'week_1_pos', headerName: t("Week 1 position: "), flex: 1 },
            { field: 'week_1_profit', headerName: t("Week 1 profit: "), flex: 1 },
        ] : []), // Conditionally add columns for authenticated users
    ];

    return (
        <div className="container padding-top padding-bottom">
            <div className="cta__wrapper">
                <div className="cta__newsletter d-flex justify-content-center">
                    <div
                        className="text-center"
                        style={{
                            maxWidth: "95%",
                            gap: "30px",
                            backgroundColor: theme === 'dark' ? "#343a40" : "#f5f8fb",
                            borderRadius: 24,
                            padding: "30px",
                            zIndex: 2,
                            position: 'relative', // Ensure the parent is relative for absolute positioning
                        }}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <div className="cta__subscribe">
                            <h2>
                                <span>{t("Profitability")}</span>
                            </h2>
                            <p>{t("Profitability of coins")}</p>
                            <Paper sx={{ width: '100%', backgroundColor: theme === 'dark' ? "#5a636c" : "#f5f8fb" }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    hideFooterPagination
                                    sx={{ border: 0 }}
                                />
                            </Paper>
                        </div>
                        <br />
                        {lastMostProfitable && <LastGraphs lastMostProfitable={lastMostProfitable.slice(0, 4)} />}

                        {!user && (
                            <>
                                <h1>{t("Looking for more?")}</h1>
                                <Button type="link" to={routes.signIn} style={{fontSize: "20px", padding: "10px"}}>
                                    Přihlásit se
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <div className="cta__shape">
                    <span className="cta__shape-item cta__shape-item--2">
                        <img src={cta2} alt="shape icon" />
                    </span>
                    <span className="cta__shape-item cta__shape-item--6">
                        <img src={cta5} alt="shape icon" />
                    </span>
                </div>
            </div>
        </div>
    );
};
