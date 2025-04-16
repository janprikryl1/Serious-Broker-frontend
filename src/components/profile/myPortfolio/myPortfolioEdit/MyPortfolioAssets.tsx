import {FC} from "react";
import {useTranslation} from "react-i18next";
import {MyPortfolioAsset} from "./MyPortfolioAsset.tsx";
import {useMyPortfolioContext} from "../../../../utils/providers/MyPortfolioProvider.tsx";
import {Button} from "../../../reusable/Button.tsx";
import {defaultNewMyPortfolioAsset} from "../../../../utils/constants/defaultContent.ts";

export const MyPortfolioAssets:FC = () => {
    const {t} = useTranslation();
    const {asset, setAsset} = useMyPortfolioContext();
    
    const handleAddAsset = () => {
        setAsset((prevAsset) => [...prevAsset, defaultNewMyPortfolioAsset]);
    };
    
    return (
        <>
            <Button style={{fontSize:15, color:"black"}} className="mb-3" onClick={handleAddAsset}>{t("Add new coin")}</Button>
            <h3>{t("Coins")}</h3>
            {asset.map((asset, index) => (
                <MyPortfolioAsset key={index} asset={asset} index={index} />
            ))}
            <p>{t("You can balance coins in sum of 100%")}</p>
        </>
    )
}