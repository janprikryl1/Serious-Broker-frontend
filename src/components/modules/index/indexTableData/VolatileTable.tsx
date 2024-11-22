import {FC} from "react";
import {useTranslation} from "react-i18next";
import {MostVolatileData} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {VolatileTableChartBody} from "./indexTableChart/VolatileTableChartBody.tsx";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";

type Props = {
    data: MostVolatileData[];
}

export const VolatileTable:FC<Props> = ({data}) => {
    const { t } = useTranslation();

    return (
        <table className="table no-border-row">
            <thead>
            <tr>
                <th>{t("Symbol")}</th>
                <th>{t("Title")}</th>
                <th>
                    <TypographyWithPopover popover={t("Difference between the height price and the lowest")}>
                        {t("Difference")}
                    </TypographyWithPopover>
                </th>
                <th>{t("Graph")}</th>
            </tr>
            </thead>
            <tbody>
            {data.map((coin) => (
                <VolatileTableChartBody coin={coin} key={coin.asset_label} />
            ))}
            </tbody>
        </table>
    );
};