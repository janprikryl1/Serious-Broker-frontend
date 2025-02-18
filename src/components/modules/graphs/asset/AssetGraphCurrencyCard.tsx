import {FC, useEffect, useState} from "react";
import { Assets } from "../../../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { coinURL, routes } from "../../../../utils/constants";
import {IndexTableChart} from "../../index/indexTableData/indexTableChart/IndexTableChart.tsx";
import Skeleton from "react-loading-skeleton";
import {getAssetGraphPreviewDate} from "../../../../utils/api/assetGraphPreviewService.ts";

type Props = {
    singleAsset: Assets;
}

export const AssetGraphCurrencyCard: FC<Props> = ({ singleAsset }) => {
    const { t } = useTranslation();
    const [coinGraphData, setCoinGraphData] = useState<number[]>();

    useEffect(() => {
        const fetchGraphPreviesData = async () => {
            try {
                const response = await getAssetGraphPreviewDate(singleAsset.asset_label);
                setCoinGraphData(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchGraphPreviesData();
    }, []);

    return (
        <div className="col-sm-3 asset-graph-currency-card">
            <div className="row d-flex align-items-center">
                <div className="col-sm-2 d-flex flex-column align-items-center" style={{marginLeft: "5px"}}>
                    <img src={`${coinURL}${singleAsset.photo}`} alt={singleAsset.asset_label}
                         style={{width: 40, maxWidth: "50px", marginBottom: "10px"}}/>
                </div>
                <div className="col-sm d-flex flex-column align-items-center"
                     style={{fontSize: "15px", textAlign: "center", lineHeight: 1.4, marginTop: 5, maxWidth:90}}>
                    <Link to={`${routes.assetGraphDetail}/${singleAsset.id}`} className="link-underline-none"
                          style={{fontSize: "20px", fontWeight: "bold"}}>{singleAsset.asset_label}</Link>
                    <p>{singleAsset.name}</p>
                </div>
                <div className="col-sm d-flex flex-column align-items-center"
                     style={{fontSize: "15px", textAlign: "center", lineHeight: 1.4, marginTop: 5, marginBottom:10}}>
                    {coinGraphData ? 
                        <IndexTableChart
                            name={singleAsset.asset_label}
                            data={coinGraphData}
                            width={70}
                        /> : <Skeleton width={70} height={50}/>}
                </div>
                <div className="col-sm d-flex flex-column align-items-center"
                     style={{fontSize: "15px", textAlign: "center", lineHeight: 0.5}}>
                    <p style={{fontSize: "20px", fontWeight: "bold"}}>{singleAsset.allocation * 100}%</p>
                    <p>{t("Contribution")}</p>
                    {singleAsset.status === false && <i>{t("Not counted")}</i>}
                </div>
            </div>
        </div>
    );
};
