import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCryptocurrencyById } from "../api/CryptocurrencyService.ts";
import { CryptoCurrencyDetailType } from "../utils/types/CryptoCurrencyType.ts";
import { TitleHeader } from "../components/modules/about/TitleHeader.tsx";
import { SidebarSearch } from "../components/modules/article/SidebarSearch.tsx";
import { RecentPost } from "../components/modules/article/RecentPost.tsx";
import { ArticleSkeleton } from "../components/modules/article/ArticleSkeleton.tsx";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import {coinURL, routes} from "../utils/constants";

export const CryptoCurrencyDetail: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [cryptocurrency, setCryptocurrency] = useState<CryptoCurrencyDetailType>();
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const res = await getCryptocurrencyById(id);
                setCryptocurrency(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [id]);

    const goBack = () => {
        navigate(routes.cryptocurrenciesList);
    };

    return (
        <>
            {cryptocurrency ? (
                <>
                    <TitleHeader title={cryptocurrency.name} />
                    <div className="blog-details padding-top padding-bottom section-bg-color">
                        <div className="container">
                            <div className="blog-details__wrapper">
                                <div className="row g-5">
                                    <div className="col-lg-8">
                                        <h3>{cryptocurrency.name} ({cryptocurrency.symbol})</h3>
                                        {!imageError && (
                                            <img
                                                src={`${coinURL}/${cryptocurrency.photo}`}
                                                alt={cryptocurrency.name}
                                                width={300}
                                                onError={() => setImageError(true)}
                                            />
                                        )}
                                        <p>{t("Price: ")} {cryptocurrency.price}$</p>
                                        <p>{t("Website:")} <a className="link-underline-none" href={cryptocurrency.website}>{cryptocurrency.website}</a></p>
                                        <p>{t("Marketcup: ")} {cryptocurrency.marketcap}</p>
                                        {cryptocurrency.max_supply !== 0 && <p>{t("Total supply: ")} {cryptocurrency.max_supply}{" "}{t("coins")}</p>}
                                        <p>{t("Circulating supply: ")} {cryptocurrency.circulating_supply}{" "}{t("coins")}</p>
                                        {cryptocurrency.reddit && <p>{t("Reddit: ")} <a className="link-underline-none" href={cryptocurrency.reddit}>{cryptocurrency.reddit}</a></p>}
                                        {cryptocurrency.twitter && <p>{t("Twitter: ")} <a className="link-underline-none" href={cryptocurrency.twitter}>{cryptocurrency.twitter}</a></p>}
                                        {cryptocurrency.telegram && <p>{t("Telegram: ")} <a className="link-underline-none" href={cryptocurrency.telegram}>{cryptocurrency.telegram}</a></p>}
                                        <p>{t("CMC rank: ")} {cryptocurrency.cmc_rank}</p>
                                        <p>{t("Categories: ")} {cryptocurrency.categories}</p>
                                        <Button variant="primary" style={{ marginTop: 30 }} onClick={goBack}>
                                            {t("Back")}
                                        </Button>
                                    </div>
                                    <div className="col-lg-4 col-md-8 col-12">
                                        <div className="sidebar">
                                            <div className="row g-4">
                                                <div className="col-12">
                                                    <SidebarSearch />
                                                </div>
                                                <div className="col-12">
                                                    <RecentPost />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <ArticleSkeleton />
            )}
        </>
    );
};
