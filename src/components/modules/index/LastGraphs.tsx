import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { LastMostProfitableCoins } from "../../../utils/types/indexPage/LastMostProfitableCoins.ts";
import { v4 as uuidv4 } from 'uuid';
import { IndexLastGraphsOptions } from "../../../utils/options/IndexLastGraphsOptions.ts";
import { LastGraphComponent } from "./LastGraphComponent.tsx";

type Props = {
    lastMostProfitable: LastMostProfitableCoins[] | undefined;
};

export const LastGraphs: FC<Props> = ({ lastMostProfitable }) => {
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState<string>("weeks");

    const handleSelectPeriod = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(e.target.value);
    };

    return (
        <div className="row" style={{ minHeight: '100vh' }}>
            <div className="col-12 d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                <div className="d-flex align-items-center">
                    <h2 className="me-2">
                        {t("Profit for last ")} 3
                    </h2>
                    <select className="form-select" style={{ width: 'auto' }} value={selectedPeriod} onChange={handleSelectPeriod}>
                        {IndexLastGraphsOptions.map((period) => (
                            <option key={period} value={period}>{t(period)}</option>
                        ))}
                    </select>
                </div>
            </div>
            {lastMostProfitable?.map((data) => (
                <LastGraphComponent key={uuidv4()} data={data} selectedPeriod={selectedPeriod} />
            ))}
        </div>
    );
};
