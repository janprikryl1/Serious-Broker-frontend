import {FC, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { toCzechDate } from "../../../../utils/constants/functions.ts";
import {getIndexData} from "../../../../utils/api/indexDataService.ts";

export const IndexTableTitle: FC = () => {
    const { t } = useTranslation();
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const result = await getIndexData();
                setDate(result.data.date);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDate();
    }, []);

    return (
        <div className="text-light">
            <h2 className="index-title">{t("Biggest Movers")}</h2>
            {date && <p>{t("Date: ")} {toCzechDate(date)}</p>}
            <p className="mt-3 index-table-title">
                {t("Explore which coins gained or lost the most in a specified period.")}
            </p>
        </div>
    );
};
