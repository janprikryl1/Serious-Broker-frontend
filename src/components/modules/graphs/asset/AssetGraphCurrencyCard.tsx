import { FC } from "react";
import { Assets } from "../../../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { coinURL, routes } from "../../../../utils/constants";

type Props = {
    singleAsset: Assets;
}

export const AssetGraphCurrencyCard: FC<Props> = ({ singleAsset }) => {
    const { t } = useTranslation();

    return (
        <div className="col-sm-3 asset-graph-currency-card" style={{ height: 75, width: 300, color: "black" }}>
            <div className="row d-flex align-items-center">
                <div className="col-sm-2 d-flex flex-column align-items-center" style={{ marginLeft: "10px" }}>
                    <img src={`${coinURL}${singleAsset.photo}`} alt={singleAsset.asset_label} style={{ width: 40, maxWidth: "50px", marginBottom: "10px" }} />
                </div>
                <div className="col-sm d-flex flex-column align-items-center" style={{ fontSize: "15px", textAlign: "center", lineHeight: 1.4, marginTop:5 }}>
                    <Link to={`${routes.assetGraphDetail}/${singleAsset.id}`} className="link-underline-none" style={{ fontSize: "20px", fontWeight: "bold" }}>{singleAsset.asset_label}</Link>
                    <p>{singleAsset.name}</p>
                </div>
                <div className="col-sm d-flex flex-column align-items-center" style={{ fontSize: "15px", textAlign: "center", lineHeight: 0.5 }}>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>{singleAsset.allocation * 100}%</p>
                    <p>{t("Contribution")}</p>
                    {singleAsset.status === false && <i>{t("Not counted")}</i>}
                </div>
            </div>
        </div>
    );
};
