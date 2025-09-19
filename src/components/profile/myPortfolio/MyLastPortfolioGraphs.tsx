import {FC, useEffect, useState} from "react";
import {getLastPortfolioGraphs} from "../../../utils/api/myPortfolioService.ts";
import {MyThreeAssetsDataType} from "../../../utils/types/asset/MyThreeAssetsDataType.ts";
import {GraphPortfolioAsset} from "./GraphPortfolioAsset.tsx";
import {ProfileOverviewAsset} from "../../../pages/profile/ProfileOverviewAsset.tsx";

export const MyLastPortfolioGraphs:FC = () => {
    const [graphData, setGraphData] = useState<MyThreeAssetsDataType[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLastPortfolioGraphs();
                if (!response) return;
                setGraphData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="row">
            {graphData === undefined ? <ProfileOverviewAsset /> : 
            graphData.map((asset: MyThreeAssetsDataType) => (
                <GraphPortfolioAsset title={asset.name} data={asset.monthlyChartData.data} key={asset.id} />
            ))}
        </div>
    );
}