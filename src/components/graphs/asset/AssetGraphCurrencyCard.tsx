import {FC, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {Assets} from "../../../utils/types/asset/AssetDetailType.ts";
import {getAssetGraphPreviewDate} from "../../../utils/api/assetGraphPreviewService.ts";
import {coinURL, routes} from "../../../utils/constants";
import {OverviewTableChart} from "../../overview/overviewTableData/overviewTableChart/OverviewTableChart.tsx";
import "../../../styles/sass/components/asset_graph.scss";

type Props = {
    singleAsset: Assets;
}

export const AssetGraphCurrencyCard: FC<Props> = ({ singleAsset }) => {
    const { t } = useTranslation();
    const [coinGraphData, setCoinGraphData] = useState<number[] | "">();

    useEffect(() => {
        const fetchGraphPreviewData = async () => {
            try {
                const response = await getAssetGraphPreviewDate(singleAsset.asset_label);
                setCoinGraphData(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchGraphPreviewData();
    }, []);

    return (
        <div className="asset-graph-currency-card">
            <div className="d-flex align-items-center justify-content-around h-100 w-100">

                {/* Picture */}
                <div className="d-flex flex-column align-items-center justify-content-center  crypto-logo">
                    {singleAsset.photo ?
                      <img src={`${coinURL}${singleAsset.photo}`} alt={singleAsset.asset_label}/>:
                      <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--secondary-color)',
                        borderRadius: '50%'
                    }} />}

                </div>

                {/* Name */}
                <div className="d-flex flex-column align-items-center justify-content-center asset-graph-currency-card-coin-name" style={{fontSize: "1.2rem"}}>
                    {/*<Link to={`${routes.assetGraphDetail}/${singleAsset.id}`} className="link-underline-none asset-graph-currency-card-coin-name-link">*/}
                        {singleAsset.asset_label}
                    {/*</Link>*/}
                    <p className="mb-1">{singleAsset.name}</p>
                </div>

                {/* Graph */}
                <div className="d-flex flex-column align-items-center justify-content-center asset-graph-currency-card-graph">
                    {coinGraphData === "" ?
                      <div className={"color-container--red"}>
                          <div className={"red-on-primary-color-text"} style={{fontSize: "0.8rem"}}>
                              {t("Not traded")} <br/> {t("anymore")}
                          </div>
                      </div> :
                      coinGraphData ?
                        <OverviewTableChart
                            name={singleAsset.asset_label}
                            data={coinGraphData}
                            width={70}
                        /> :
                        <Skeleton width={70} height={50}/>}
                </div>

                {/* Contribution */}
                <div className="d-flex flex-column align-items-center justify-content-center asset-graph-currency-card-price-container">
                    <p className="asset-graph-currency-card-price-container-text mb-1">{(singleAsset.allocation * 100).toFixed(2)}%</p>
                    <p className="mb-1">{t("Contribution")}</p>
                    {singleAsset.status === false && <i>{t("Not counted")}</i>}
                </div>
            </div>
        </div>
    );
};
