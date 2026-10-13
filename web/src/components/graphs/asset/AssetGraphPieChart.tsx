import {FC, useEffect, useState} from "react";
import {pieArcLabelClasses, PieChart} from "@mui/x-charts";
import {Assets} from "../../../utils/types/asset/AssetDetailType.ts";
import {getAssetByIndexLabel} from "../../../utils/api/binanceIndexAssets.ts";

type Props = {
    assets?: Assets[];
    assetName?: string;
};

export const AssetGraphPieChart: FC<Props> = ({ assets, assetName }) => {
    const [fetchedAssets, setFetchedAssets] = useState<Assets[]>([]);
    const dataToDisplay = assets ?? fetchedAssets;
    const chartWidth = typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 320;
    const chartHeight = typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 320;

    useEffect(() => {
        if (assets) return;
        if (!assetName) return;

        const fetchData = async () => {
            try {
                const response = await getAssetByIndexLabel(assetName);

                if (response) {
                    setFetchedAssets(response.data.assets);
                }
            } catch {
                console.error("AssetGraphPieChart: Failed to fetch asset graph data");
            }
        }

        fetchData();

    }, [assetName, assets]);

    return (
        dataToDisplay?.length <= 10 ?
        <div className="tw-flex tw-w-full tw-justify-center tw-overflow-visible tw-px-2 tw-text-center">
            <PieChart
                series={[
                    {
                        data: dataToDisplay.map((singleAsset: Assets, index) => ({
                            id: singleAsset.id,
                            value: singleAsset.allocation * 100,
                            label: singleAsset.asset_label,
                        })),
                        valueFormatter: (item: { value: number }) => {
                            return `${item.value.toFixed()} %`;
                        },
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 50, additionalRadius: -10, color: 'gray' },
                        highlighted: { innerRadius: 40 },
                        innerRadius: 45,
                        outerRadius: 80,
                        arcLabel: 'label',
                        arcLabelRadius: '100%',
                        paddingAngle: 0.5,
                    },
                ]}
                sx={{
                    "&": {
                        overflow: "visible !important",
                    },
                    "& svg": {
                        overflow: "visible !important",
                    },
                    "& text": {
                        fill: "var(--white-color) !important",
                    },
                    "& .MuiPieArc-root": {
                        stroke: "none",
                        strokeWidth: "0 !important",
                    },
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontSize: '13px',
                        fontWeight: 600,
                    },
                }}
                slotProps={{
                    legend: {
                        hidden: true,
                    } as any
                }}
                margin={{ top: 20, bottom: 20, left: 45, right: 45 }}
                width={chartWidth}
                height={chartHeight}
                colors={[
                    '#C5A059', // 1. Ušľachtilá stredná zlatá
                    '#8B6D1B', // 2. Tmavý antický bronz
                    '#F1DBA1', // 3. Jemné bledé šampanské
                    '#D4AF37', // 4. Klasická metalická zlatá (Secondary)
                    '#BD9F53', // 5. Tlmená olivovo-zlatá
                    '#E5C383', // 6. Svetlá piesková zlatá
                    '#A68036', // 7. Staré zlato (Old Gold)
                    '#E9C46A', // 8. Teplá šafranová zlatá
                    '#9E7E38', // 9. Hlboká bronzovo-hnedá
                    '#D9C583'  // 10. Bledá zastretá zlatá
                ]}
            />
        </div> : null
    );
};
