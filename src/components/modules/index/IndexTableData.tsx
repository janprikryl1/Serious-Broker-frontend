import {FC, useEffect, useState} from "react";
import {IndexDataStructure} from "../../../utils/types/indexPage/IndexDataStructure";
import {getIndexData} from "../../../api/indexDataService";
import {IndexSeason} from "../../../utils/enums/IndexSeasonEnum";
import Nav from "react-bootstrap/esm/Nav";
import {Link} from "react-router-dom";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";
import {useTranslation} from "react-i18next";
import {howDoWeEvaluateReportingPeriodArticle, whatIsPurposeOfReportingPeriodArticle} from "../../../utils/constants";
import {PopularCoins} from "./PopularCoins.tsx";
import {MostProfitableLastWeek} from "./MostProfitableLastWeek.tsx";

export const IndexTableData: FC = () => {
    const {theme} = useThemeContext();
    const {t} = useTranslation();
    const [data, setData] = useState<IndexDataStructure>();
    const [season, setSeason] = useState<IndexSeason>(IndexSeason.MONTH);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getIndexData();
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSelect = (selectedSeason: IndexSeason) => {
        setSeason(selectedSeason);
    };

    return (
        <div className="text-center d-flex flex-column align-items-center justify-content-center" style={{ marginTop: "250px" }}>
            {data ? (
                <>
                    <h1>{t("Which cryptocurrencies are best for regular savings?")}</h1>
                    <p>{t("Date: ")}{data.date}</p>
                    <p>{t("Monitoring period for evaluation")}</p>
                    <Nav
                        variant="underline"
                        activeKey={season}
                        onSelect={(selectedKey) => handleSelect(selectedKey as IndexSeason)}
                    >
                        {Object.values(IndexSeason).map((seasonValue) => (<Nav.Item key={seasonValue}>
                            <Nav.Link eventKey={seasonValue}
                                      style={{color: theme === 'dark' ? "#fff" : "#000"}}>{t(seasonValue)}</Nav.Link>
                        </Nav.Item>))}
                    </Nav>
                    <Link to={howDoWeEvaluateReportingPeriodArticle}
                          className="text-decoration-none trk-btn trk-btn--border trk-btn--primary mt-3 mb-3">
                        {t("How do we evaluate the reporting period?")}
                    </Link>
                    <Link to={whatIsPurposeOfReportingPeriodArticle}
                          className="text-decoration-none trk-btn trk-btn--border trk-btn--primary">
                        {t("What is the purpose of the reporting period?")}
                    </Link>

                    <div className="row">
                        <div className="col-sm-6">
                            <MostProfitableLastWeek mostProfitableLastWeek={data.last_most_profitable} />
                        </div>
                        <div className="col-sm-6">
                            <PopularCoins lastCoinmarketCupCoins={data.last_coinmarketcup_coins} />
                        </div>
                        <div className="col-sm-6">
                            
                        </div>
                    </div>
                </>
            ) : <p>Loading...</p>}  
        </div>
    );
};
