import dodgeCoin from "../../../utils/icons/cta/dogecoin.png";
import ethereum from "../../../utils/icons/cta/ethereum.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getPopularCoins } from "../../../api/indexDataService.ts";
import { LastCoinmarketCupCoinsType } from "../../../utils/types/indexPage/LastCoinmarketCupCoinsType.ts";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";
import { SignInLink } from "../signIn/SignInLink.tsx";
import { useMediaQuery } from "@mui/material";  // Import useMediaQuery

export const PopularCoins = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const [coins, setCoins] = useState<LastCoinmarketCupCoinsType[]>();

    // Detect if the screen size is mobile using useMediaQuery
    const isMobile = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        const getPopularData = async () => {
            const res = await getPopularCoins();
            setCoins(res.data);
        };
        getPopularData();
    }, []);

    return (
        <div className="container padding-top padding-bottom" style={{ maxWidth: "100%" }}>
            <div className="cta__wrapper">
                <div className="">
                    <div
                        className="text-center"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <div className="cta__subscribe">
                            <h2>
                                <span>{t("Last Coinmarketcup Coins")}</span>
                            </h2>
                            <p>{t("Which coins scored recently in Coinmarketcap?")}</p>
                            {coins && (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>{t("cmc_rank")}</th>
                                        <th>Coin</th>
                                        <th>{t("Positions in week 0: ")}</th>
                                        <th>{t("Week 0 profit: ")}</th>
                                        {!isMobile && (
                                            <>
                                                <th>{t("Week 1 position: ")}</th>
                                                <th>{t("Week 1 profit: ")}</th>
                                            </>
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {coins.map((coin, index) => (
                                        <tr key={coin.cmc_rank}>
                                            <td>{coin.cmc_rank}</td>
                                            <td>{coin.asset_label}</td>
                                            <td>{coin.week_0_pos}</td>
                                            <td>{((coin.week_0_profit - 1) * 100).toFixed(2)} %</td>
                                            {!isMobile && user ? (
                                                <>
                                                    <td>{coin.week_1_pos}</td>
                                                    <td>{((coin.week_1_profit! - 1) * 100).toFixed(2)} %</td>
                                                </>
                                            ) : (
                                                !isMobile && index === Math.round(coins.length / 2) && (
                                                    <td colSpan={2} rowSpan={coins.length}>
                                                        <SignInLink style={{fontSize: "20px", padding: "10px"}}/>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                            <div>
                                Vysvětlení hodnot
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cta__shape">
                    <span className="cta__shape-item cta__shape-item--4">
                        <img src={dodgeCoin} alt="shape icon" width={50} />
                    </span>
                    <span className="cta__shape-item cta__shape-item--5">
                        <img src={ethereum} alt="shape icon" width={50} />
                    </span>
                </div>
            </div>
        </div>
    );
};
