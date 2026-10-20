import { FC, useState, useEffect } from "react";
import { GraphPortfolioAsset } from "./GraphPortfolioAsset";
import {RecommendedProfileAssetType} from "../../../utils/types/asset/RecommendedProfileAssetType.ts";
import {getThreeLastAssetsGraphData} from "../../../utils/api/binanceIndexAssets.ts";
import {ProfileOverviewAsset} from "../../../pages/profile/ProfileOverviewAsset.tsx";

export const RecommendedAssets: FC = () => {
    const [assetsData, setAssetsData] = useState<RecommendedProfileAssetType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getThreeLastAssetsGraphData();
                if (response) {
                    setAssetsData(response.data);
                } else {
                    console.error("Invalid data format received from getThreeLastAssetsGraphData:", response);
                    setError("Failed to load data or received invalid format.");
                    setAssetsData([]);
                }
            } catch (err) {
                console.error("Error fetching recommended assets:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred while fetching data.");
                setAssetsData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="row justify-content-center">
                {isLoading ? (
                    <ProfileOverviewAsset />
                ) : error ? (
                    <div className="col-12 alert alert-warning text-center">
                        Could not load recommended index funds: {error}
                    </div>
                ) : assetsData === undefined ? <></>
                  : assetsData.length === 0 ? (
                    <div className="col-12 text-center text-muted">
                        No recommended index funds found.
                    </div>
                ) : (assetsData.map((assetIndex) => (
                        <GraphPortfolioAsset
                            key={assetIndex.id}
                            title={assetIndex.name}
                            data={assetIndex.profit_list}
                        />
                    ))
                )}
            </div>
        </div>
    );
};