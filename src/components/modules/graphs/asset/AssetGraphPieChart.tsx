import {FC} from "react";
import {PieChart} from "@mui/x-charts";
import {Assets} from "../../../../utils/types/asset/AssetDetailType.ts";

type Props = {
    assets: Assets[];
}

export const AssetGraphPieChart:FC<Props> = ({assets}) => {
    return (
            <div className="col-sm-5" style={{
                backgroundColor: "#454a4e",
                borderRadius: 24,
                marginTop: "5%",
                padding: "3%",
                width: "103%",
                maxWidth: 500,
            }}>
                <PieChart
                    series={[
                        {
                            data: assets.map((singleAsset: Assets) => (
                                {
                                    id: singleAsset.id,
                                    value: singleAsset.allocation * 100,
                                    label: singleAsset.asset_label
                                }
                            )),
                            highlightScope: {fade: 'global', highlight: 'item'},
                            faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                        },
                    ]}
                    width={350}
                    height={200}
                />
            </div>
    );
};