import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useIndexDataContext } from "../../../../utils/providers/IndexDataProvider.tsx";
import { toCzechDate } from "../../../../utils/constants/functions.ts";

export const IndexTableTitle: FC = () => {
    const { t } = useTranslation();
    const { date } = useIndexDataContext();

    return (
        <div className="text-light">
            <h1>{t("Biggest Movers")}</h1>
            {date && <p>{t("Date: ")} {toCzechDate(date)}</p>}
            <p className="mt-3 index-table-title">
                {t("Explore which coins gained or lost the most in a specified period.")}
            </p>
        </div>
    );
};
