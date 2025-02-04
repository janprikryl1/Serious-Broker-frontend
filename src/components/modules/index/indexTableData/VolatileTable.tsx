import {FC} from "react";
import {useTranslation} from "react-i18next";
import {MostVolatileData} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {VolatileTableChartBody} from "./indexTableChart/VolatileTableChartBody.tsx";

type Props = {
    data: MostVolatileData[];
}

export const VolatileTable:FC<Props> = ({data}) => {
    const { t } = useTranslation();

    return (
        <table className="table-index-light mb-5">
            <thead>
            <tr>
                <th>#</th>
                <th>{t("Symbol")}</th>
                <th>{t("Title")}</th>
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