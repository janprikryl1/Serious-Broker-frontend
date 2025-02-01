import { FC } from "react";
import { IndexSeason } from "../../../../utils/enums/IndexSeasonEnum.ts";
import { Link } from "react-router-dom";
import {howDoWeEvaluateReportingPeriodArticle, whatIsPurposeOfReportingPeriodArticle} from "../../../../utils/constants";
import { useTranslation } from "react-i18next";
import { useIndexDataContext } from "../../../../utils/providers/IndexDataProvider.tsx";
import { Button } from "react-bootstrap";
import {toCzechDate} from "../../../../utils/constants/functions.ts";

type SeasonButtonProps = {
    seasonValue: string;
    isActive: boolean;
    onSelect: () => void;
};

const SeasonButton: FC<SeasonButtonProps> = ({ seasonValue, isActive, onSelect }) => {
    const { t } = useTranslation();
    return (
        <Button
            className="text-decoration-none trk-btn trk-btn--border trk-btn--primary btn-warning"
            style={{fontWeight: isActive ? "bold" : "normal"}}
            onClick={onSelect}
        >
            {t(seasonValue)}
        </Button>
    );
};

export const IndexTableTitle: FC = () => {
    const { t } = useTranslation();
    const { date, season, handleSelect } = useIndexDataContext();

    return (
        <>
            <h1>{t("Which cryptocurrencies are best for regular savings?")}</h1>
            {date && (
                <p>
                    {t("Date: ")}
                    {toCzechDate(date)}
                </p>
            )}
            <p className="mt-3">
                <strong>{t("Monitoring period for evaluation")}</strong>
            </p>

            <div className="d-flex justify-content-between gap-3 mb-25">
                {Object.values(IndexSeason).map((seasonValue) => (
                    <SeasonButton
                        key={seasonValue}
                        seasonValue={seasonValue}
                        isActive={season === seasonValue}
                        onSelect={() => handleSelect(seasonValue)}
                    />
                ))}
            </div>
            <div>
                <Link
                    to={howDoWeEvaluateReportingPeriodArticle}
                    className="text-decoration-none m-r20 text-warning"
                >
                    {t("How do we evaluate the reporting period?")}
                </Link>
                <Link
                    to={whatIsPurposeOfReportingPeriodArticle}
                    className="text-decoration-none text-warning"
                >
                    {t("What is the purpose of the reporting period?")}
                </Link>
            </div>
        </>
    );
};
