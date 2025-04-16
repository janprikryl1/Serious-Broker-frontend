import {Dispatch, FC, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {LineChart} from "@mui/x-charts";
import {useTranslation} from "react-i18next";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import "./AssetGraphStyles.scss";
import {AssetType} from "../../../utils/types/asset/AssetType.ts";
import {MostProfitableAssetDetailType} from "../../../utils/types/graphs/MostProfitableAssetDetailType.ts";
import {addToWatchList, removeFromWatchList} from "../../../utils/api/watchListService.ts";
import {WatchListEnum} from "../../../utils/enums/WatchListEnum.ts";
import {routes} from "../../../utils/constants";
import {Button} from "../../reusable/Button.tsx";

type Props = {
    index: number;
    label: string;
    details: string;
    data: number[];
    inWatchList: boolean;
    setAssets: Dispatch<SetStateAction<AssetType[] | MostProfitableAssetDetailType[]>>;
    dailyChange?: number;
};

export const AssetCard: FC<Props> = ({ index, label, details, data, inWatchList, setAssets, dailyChange }) => {
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
                    <Link to={`${routes.assetGraphURL}${encodeURIComponent(label)}`}
                          className="link-underline-none asset-link">
                        {label}
                    </Link>
                    <p className="details">{details}</p>
                    {dailyChange !== undefined && (
                        <p className="daily-change" style={{color: dailyChange > 0 ? "green" : "#8f372d"}}>
                            {dailyChange > 0 && "+"}
                            {dailyChange}%
                            <span className="label">{t("Daily Change")}</span>
                        </p>
                    )}
                    <Button>
                        {!inWatchList ? (
                            <>
                                <FaRegBookmark onClick={handleAddToWatchlist} className="me-2"/>
                                {t("Add to watchlist")}
                            </>
                        ) : (
                            <>
                                <FaBookmark onClick={handleRemoveFromWatchList} className="me-2"/>
                                {t("Remove from watchlist")}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
