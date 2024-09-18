import {FC, useEffect, useState} from "react";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getAssetById} from "../../api/binanceIndexAssets.ts";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";
import {toCzechDateFormat} from "../../utils/constants";
import {ChartComponent} from "../../components/modules/graphs/asset/ChartComponent.tsx";
import {useTranslation} from "react-i18next";
import {DataPointType} from "../../utils/types/asset/DataPointType.ts";
import {AssetDetailSkeleton} from "../../components/modules/graphs/asset/AssetDetailSkeleton.tsx";
import {AssetDetailType} from "../../utils/types/asset/AssetDetailType.ts";
import {EarningIn} from "./earningIn/EarningIn.tsx";

export const AssetGraph:FC = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {user} = useUserContext();
    const navigate = useNavigate();
    const [graphData, setGraphData] = useState<DataPointType[]>();
    const [asset, setAsset] = useState<AssetDetailType>();

    useEffect(() => {
        if (id === undefined) return;
        const getGraphData = async () => {
            const response = await getAssetById(parseInt(id));
            if (!response) return;
            setGraphData(response.data.graph);
            setAsset(response.data.asset);
        }
        getGraphData();
    }, [id]);


    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);


    return (
        <div>
            <TitleHeader title={asset?.index_label ?? t("GraphAssetData - details about asset and graph")}/>
            <div className="padding-bottom">
                <div className="container padding-bottom">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <div
                                    className="service-details__content"
                                    data-aos="fade-up"
                                    data-aos-duration="900"
                                >
                                    <p>id: {id}</p>
                                    {asset && graphData ? (
                                        <>
                                            <p>Index label: {asset.index_label}</p>
                                            <p>Label: {asset.asset_label}</p>
                                            <p>Allocation: {asset.allocation}</p>
                                            <p>Created at: {toCzechDateFormat(asset.created)}</p>
                                            <p>Last updated at: {toCzechDateFormat(asset.changed)}</p>
                                            <p>Graf</p>
                                            <ChartComponent data={graphData} width={1000} height={500}
                                                            assetId={asset?.id}></ChartComponent>
                                            {asset.id && <EarningIn id={asset.id} />}
                                        </>
                                    ) : <AssetDetailSkeleton />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}