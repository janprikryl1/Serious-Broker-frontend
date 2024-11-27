import { FC } from "react";
import { Form } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { ChartAssetPeriodEnum } from "../../../../utils/enums/ChartAssetPeriodEnum";
import { useTranslation } from "react-i18next";

type Props = {
    selectedPeriod: keyof typeof ChartAssetPeriodEnum;
    setSelectedPeriod: (value: keyof typeof ChartAssetPeriodEnum) => void;
};

export const PeriodSelector: FC<Props> = ({ selectedPeriod, setSelectedPeriod }) => {
    const { t } = useTranslation();

    return (
        <div className="col-auto d-flex align-items-center gap-3">
            <Typography variant="h6" className="m-0">
                {t("Candles per")}
            </Typography>
            <Form.Select
                aria-label="Candles per"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as keyof typeof ChartAssetPeriodEnum)}
                style={{ width: "150px", minWidth: "120px" }}
            >
                {Object.keys(ChartAssetPeriodEnum).map((key) => (
                    <option key={key} value={key}>
                        {t(ChartAssetPeriodEnum[key as keyof typeof ChartAssetPeriodEnum])}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};
