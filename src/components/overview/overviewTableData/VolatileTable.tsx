import {FC} from "react";
import {useTranslation} from "react-i18next";
import {VolatileTableChartBody} from "./overviewTableChart/VolatileTableChartBody.tsx";
import {MostVolatileData} from "../../../utils/types/indexPage/IndexDataStructure.ts";

type Props = {
    data: MostVolatileData[];
}

export const VolatileTable:FC<Props> = ({data}) => {
    const { t } = useTranslation();

    return (
        <table className="table-index-light mb-5 mt-1">
            <thead>
            <tr>
                <th>#</th>
                <th colSpan={2}>{t("Name")}</th>
                <th>{t("Difference")}</th>
                <th>{t("Graph")}</th>
            </tr>
            </thead>
            <tbody>
            {data.map((coin, index) => (
                <VolatileTableChartBody coin={coin} index={index} key={coin.asset_label} />
            ))}
            </tbody>
        </table>
    );
};