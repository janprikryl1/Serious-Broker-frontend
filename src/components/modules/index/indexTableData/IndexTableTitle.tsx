import {FC} from "react";
import Nav from "react-bootstrap/Nav";
import {IndexSeason} from "../../../../utils/enums/IndexSeasonEnum.ts";
import {Link} from "react-router-dom";
import {howDoWeEvaluateReportingPeriodArticle, whatIsPurposeOfReportingPeriodArticle} from "../../../../utils/constants";
import {useThemeContext} from "../../../../utils/providers/ThemeProvider.tsx";
import {useTranslation} from "react-i18next";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";

export const IndexTableTitle: FC = () => {
    const {theme} = useThemeContext();
    const {t} = useTranslation();
    const {data, season, handleSelect} = useIndexDataContext();

    return (
        <>
            <h1>{t("Which cryptocurrencies are best for regular savings?")}</h1>
            <p>{t("Date: ")}{data.date}</p>
            <p className="mt-3"><strong>{t("Monitoring period for evaluation")}</strong></p>
            <Nav
                variant="underline"
                activeKey={season}
                onSelect={(selectedKey) => handleSelect(selectedKey as IndexSeason)}
            >
                {Object.values(IndexSeason).map((seasonValue) => (
                    <Nav.Item key={seasonValue}>
                        <Nav.Link
                            eventKey={seasonValue}
                            style={{color: theme === 'dark' ? "#fff" : "#000"}}
                        >
                            {t(seasonValue)}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <div className="d-flex justify-content-between mt-3 gap-3">
                <Link
                    to={howDoWeEvaluateReportingPeriodArticle}
                    className="text-decoration-none trk-btn trk-btn--border trk-btn--primary"
                >
                    {t("How do we evaluate the reporting period?")}
                </Link>
                <Link
                    to={whatIsPurposeOfReportingPeriodArticle}
                    className="text-decoration-none trk-btn trk-btn--border trk-btn--primary"
                >
                    {t("What is the purpose of the reporting period?")}
                </Link>
            </div>
        </>
    );
};
