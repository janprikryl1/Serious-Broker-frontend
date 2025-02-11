import { FC } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../../utils/constants";
import { LineChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { FaRegBookmark } from "react-icons/fa";
import "./AssetGraphStyles.scss";

type Props = {
    label: string;
    details: string;
    data: number[];
};

export const AssetCard: FC<Props> = ({ label, details, data }) => {
    const { t } = useTranslation();
    const hasData = data.length > 0;

    const handleAddToWatchlist = () => {
        console.log("Add to watchlist");
    };

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
                    <button className="watchlist-button" onClick={handleAddToWatchlist}>
                        <p>
                            <FaRegBookmark /> {t("Add to watchlist")}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};
