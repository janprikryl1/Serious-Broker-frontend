import {FC} from "react";
import {Assets} from "../../../../utils/types/asset/AssetDetailType.ts";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {routes} from "../../../../utils/constants";

type Props = {
    singleAsset: Assets;
}

export const AssetGraphCurrencyCard:FC<Props> = ({singleAsset}) => {
    const { t } = useTranslation();
    
    return (
        <>
            <div className="col-sm-3" style={{
                backgroundColor: "#454a4e",
                borderRadius: 24,
                margin: "1%",
                padding: "3%",
            }}>
                <Link to={`${routes.assetGraphDetail}/${singleAsset.id}`} className="link-underline-none">{singleAsset.asset_label}</Link>
                <p>{t("Allocation: ")} {singleAsset.allocation * 100}%</p>
                {singleAsset.status && <i>{t("Not counted")}</i>}
            </div>
        </>
    );
};