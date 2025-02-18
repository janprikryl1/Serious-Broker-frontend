import {Dispatch, FC, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../../../utils/constants";
import {LineChart} from "@mui/x-charts";
import {useTranslation} from "react-i18next";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import "./AssetGraphStyles.scss";
import {Button} from "../../../Button.tsx";
import {AssetType} from "../../../../utils/types/asset/AssetType.ts";
import {WatchListEnum} from "../../../../utils/enums/WatchListEnum.ts";
import {MostProfitableAssetDetailType} from "../../../../utils/types/graphs/MostProfitableAssetDetailType.ts";
import {addToWatchList, removeFromWatchList} from "../../../../utils/api/watchListService.ts";

type Props = {
    index: number;
    label: string;
    details: string;
    data: number[];
    inWatchList: boolean;
    setAssets: Dispatch<SetStateAction<AssetType[] | MostProfitableAssetDetailType[]>>;
};

export const AssetCard: FC<Props> = ({ index, label, details, data, inWatchList, setAssets }) => {
    const { t } = useTranslation();
    const hasData = data.length > 0;

    const handleAddToWatchlist = async () => {
        try {
            const response = await addToWatchList(index, WatchListEnum.Asset);
            if (response?.status === 200) {
                // @ts-ignore
                setAssets((prevState) => prevState.map((assetItem) => assetItem.id === index ? {...assetItem, in_watchlist: true} : assetItem));
            }
        } catch (e) {
            console.error(e);
        }
    };
    
    const handleRemoveFromWatchList = async () => {
        try {
            const response = await removeFromWatchList(index);
            if (response?.status === 200) {
                // @ts-ignore
                setAssets((prevState) => prevState.map((assetItem) => assetItem.id === index ? {...assetItem, in_watchlist: false} : assetItem));
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="col-sm blog__item asset-card" data-aos="fade-up" data-aos-duration="1000">
            <div className="card-container">
                <div className="chart-container">
                    {hasData ? (
                        <LineChart
                            series={[
                                {
                                    data: data,
                                    color: "green",
                                    showMark: false,
                                    curve: "catmullRom",
                                },
                            ]}
                            width={350}
                            height={150}
                            tooltip={{ trigger: "none" }}
                            sx={{
                                backgroundColor: "#d4c6a9",
                                "& .MuiChartsAxis-root": {
                                    display: "none",
                                },
                                marginLeft: 5,
                            }}
                        />
                    ) : (
                        <div className="no-data">{t("No data")}</div>
                    )}
                </div>

                <div className="card-footer">
                    <Link to={`${routes.assetGraphURL}${encodeURIComponent(label)}`} className="link-underline-none asset-link">
                        {label}
                    </Link>
                    <p className="details">{details}</p>
                    <button className="watchlist-button">
                        <p>
                            
                            <Button className="mb-3">{!inWatchList ? <><FaRegBookmark onClick={handleAddToWatchlist} /> {t("Add to watchlist")}</> : <><FaBookmark onClick={handleRemoveFromWatchList} />{t("Remove from watchlist")}</>}</Button>
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};
