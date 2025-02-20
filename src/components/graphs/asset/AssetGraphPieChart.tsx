import { FC } from "react";
import { PieChart } from "@mui/x-charts";
import { LegendItem } from "./LegendItem.tsx";
import {Assets} from "../../../utils/types/asset/AssetDetailType.ts";

type Props = {
    assets: Assets[];
};

export const AssetGraphPieChart: FC<Props> = ({ assets }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <PieChart
                series={[
                    {
                        data: assets.map((singleAsset: Assets, index) => ({
                            id: singleAsset.id,
                            value: singleAsset.allocation * 100,
                            label: singleAsset.asset_label,
                            color: `hsl(${index * 60}, 30%, 50%)`,
                        })),
                        highlightScope: { fade: 'global', highlight: 'item' },
                    },
                ]}
                slotProps={{
                    legend: {
                        hidden: true,
                    }
                }}
                width={360}
                height={240}
            />

            <div style={{ marginLeft: "-20%" }}>
                {assets.map((singleAsset, index) => (
                    <LegendItem
                        key={singleAsset.id}
                        color={`hsl(${index * 60}, 30%, 50%)`}
                        label={singleAsset.asset_label}
                    />
                ))}
            </div>
        </div>
    );
};
