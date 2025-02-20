import { ChangeEvent, FC } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AvailableCoinsDropdown } from "./AvailableCoinsDropdown.tsx";
import Slider from "@mui/material/Slider";
import {Assets} from "../../../../utils/types/asset/AssetDetailType.ts";
import {useMyPortfolioContext} from "../../../../utils/providers/MyPortfolioProvider.tsx";
import {Button, ButtonColor} from "../../../reusable/Button.tsx";

type Props = {
    asset: Assets;
    index: number;
};

const marks = [
    {
        value: 0,
        label: '0 %',
    },
    {
        value: 25,
        label: '25 %',
    },
    {
        value: 50,
        label: '50 %',
    },
    {
        value: 75,
        label: '75 %',
    },
    {
        value: 100,
        label: '100 %',
    },
];

export const MyPortfolioAsset: FC<Props> = ({ asset, index }) => {
    const { t } = useTranslation();
    const { setAsset } = useMyPortfolioContext();

    const calculateMaxAllocation = (assets: Assets[], currentIndex: number): number => {
        const otherAssetsTotal = assets.reduce((sum, item, i) =>
                i !== currentIndex ? sum + (item.allocation * 100 || 0) : sum,
            0);

        return 100 - otherAssetsTotal;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setAsset((prevAsset) =>
            prevAsset.map((item, i) =>
                i === index ? { ...item, [name]: type === "checkbox" ? checked : value } : item
            )
        );
    };

    const handleSliderChange = (_: Event, newValue: number | number[]) => {console.log(newValue)
        if (typeof newValue === "number") {
            setAsset((prevAssets) => {
                const maxAllowed = calculateMaxAllocation(prevAssets, index);
                const finalValue = Math.min(newValue, maxAllowed);console.log(finalValue)

                return prevAssets.map((item, i) =>
                    i === index ? { ...item, allocation: finalValue / 100 } : item
                );
            });
        }
    };

    const handleRemoveAsset = () => {
        setAsset((prevAsset) => prevAsset.filter((_, i) => i !== index));
    };
    
    const sliderValueText = (value: number) => {
        return `${value * 100} %`;
    }

    return (
        <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
                <AvailableCoinsDropdown coin={asset.asset_label} index={index} />

                <Slider
                    value={asset.allocation * 100}
                    onChange={handleSliderChange}
                    aria-label="Allocation"
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={1}
                    style={{ width: "180px", marginLeft: 40, marginRight: 40 }}
                    getAriaValueText={sliderValueText}
                    marks={marks}
                    sx={{color: "#ffca2c", "& .MuiSlider-markLabel": { color: "#ffca2c" }}}
                />

                <Button color={ButtonColor.red} className="btn btn-danger me-4" onClick={handleRemoveAsset}>
                    {t("Delete")}
                </Button>

                <Form.Check
                    type="switch"
                    label={t("Show")}
                    name="status"
                    checked={asset.status}
                    onChange={handleChange}
                    className="custom-switch"
                />
            </div>
        </div>
    );
};
