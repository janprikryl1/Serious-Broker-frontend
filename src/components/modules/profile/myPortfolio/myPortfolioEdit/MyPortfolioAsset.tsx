import { ChangeEvent, FC } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMyPortfolioContext } from "../../../../../utils/providers/MyPortfolioProvider.tsx";
import { AvailableCoinsDropdown } from "./AvailableCoinsDropdown.tsx";
import {Assets} from "../../../../../utils/types/asset/AssetDetailType.ts";

type Props = {
    asset: Assets;
    index: number;
};

export const MyPortfolioAsset: FC<Props> = ({ asset, index }) => {
    const { t } = useTranslation();
    const { setAsset, asset : assets } = useMyPortfolioContext();

    const calculateMaxAllocation = (assets: Assets[], currentIndex: number): number => {
        const otherAssetsTotal = assets.reduce((sum, item, i) =>
                i !== currentIndex ? sum + (item.allocation || 0) : sum,
            0
        );
        return 100 - otherAssetsTotal;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name === "allocation") {
            const numValue = parseFloat(value);

            if (isNaN(numValue) || numValue < 0) {
                return;
            }

            setAsset((prevAssets) => {
                const maxAllowed = calculateMaxAllocation(prevAssets, index);
                const finalValue = Math.min(numValue, maxAllowed);

                return prevAssets.map((item, i) =>
                    i === index ? { ...item, allocation: finalValue / 100 } : item
                );
            });
        } else {
            setAsset((prevAsset) =>
                prevAsset.map((item, i) =>
                    i === index ? { ...item, [name]: type === "checkbox" ? checked : value } : item
                )
            );
        }
    };

    const handleRemoveAsset = () => {
        setAsset((prevAsset) => prevAsset.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
                <AvailableCoinsDropdown coin={asset.asset_label} index={index} />

                <input
                    type="number"
                    className="form-control me-2"
                    style={{ marginLeft: "10px" }}
                    name="allocation"
                    value={asset.allocation * 100}
                    onChange={handleChange}
                    min="0"
                    max={calculateMaxAllocation(assets, index)}
                    step="0.1"
                />

                <button className="btn btn-danger me-4" onClick={handleRemoveAsset}>
                    {t("Delete")}
                </button>

                <Form.Check
                    type="switch"
                    label={t("Show")}
                    name="status"
                    checked={asset.status}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};