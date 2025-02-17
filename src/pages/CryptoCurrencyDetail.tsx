import { FC, useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { getCryptocurrencyById } from "../api/CryptocurrencyService.ts";
import { CryptoCurrencyDetailType } from "../utils/types/CryptoCurrencyType.ts";
import { TitleHeader } from "../components/modules/about/TitleHeader.tsx";
import { SidebarSearch } from "../components/modules/article/SidebarSearch.tsx";
import { RecentPost } from "../components/modules/article/RecentPost.tsx";
import { ArticleSkeleton } from "../components/modules/article/ArticleSkeleton.tsx";
import { useTranslation } from "react-i18next";
import {coinURL, routes} from "../utils/constants";
import {Button, ButtonColor} from "../components/Button.tsx";
import {Highlight} from "../components/modules/highlights/Highlight.tsx";

export const CryptoCurrencyDetail: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [cryptocurrency, setCryptocurrency] = useState<CryptoCurrencyDetailType>();
    const [imageError, setImageError] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
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
            <TitleHeader title={cryptocurrency?.name ?? "Cryptocurrency"} />
            {cryptocurrency ? (
                <div className="blog-details mt-4 padding-bottom section-bg-color">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <div className="blog-details__item">
                                    <div className="blog-details__item-inner">
                                        <h3>{cryptocurrency.name} ({cryptocurrency.symbol})</h3>
                                        {!imageError && (
                                            <img
                                                src={`${coinURL}/${cryptocurrency.photo}`}
                                                alt={cryptocurrency.name}
                                                width={300}
                                                onError={() => setImageError(true)}
                                                className="mb-3"
                                            />
                                        )}
                                        <p><strong>{t("Price: ")}</strong> {cryptocurrency.price}$</p>
                                        <p><strong>{t("Website:")}</strong> <a className="link-underline-none" href={cryptocurrency.website}>{cryptocurrency.website}</a></p>
                                        <p><strong>{t("Marketcup: ")}</strong> {cryptocurrency.marketcap}</p>
                                        {cryptocurrency.max_supply !== 0 && <p><strong>{t("Total supply: ")}</strong>{cryptocurrency.max_supply}{" "}{t("coins")}</p>}
                                        <p><strong>{t("Circulating supply: ")}</strong> {cryptocurrency.circulating_supply}{" "}{t("coins")}</p>
                                        {cryptocurrency.reddit && <p><strong>{t("Reddit: ")}</strong> <a className="link-underline-none" href={cryptocurrency.reddit}>{cryptocurrency.reddit}</a></p>}
                                        {cryptocurrency.twitter && <p><strong>{t("Twitter: ")}</strong> <a className="link-underline-none" href={cryptocurrency.twitter}>{cryptocurrency.twitter}</a></p>}
                                        {cryptocurrency.telegram && <p><strong>{t("Telegram: ")}</strong> <a className="link-underline-none" href={cryptocurrency.telegram}>{cryptocurrency.telegram}</a></p>}
                                        <p><strong>{t("CMC rank: ")}</strong> {cryptocurrency.cmc_rank}</p>
                                        <p><strong>{t("Categories: ")}</strong> {cryptocurrency.categories}</p>
                                        <Button className="trk-btn trk-btn--large trk-btn--secondary2" style={{ marginTop: 30 }} onClick={goBack} color={ButtonColor.white}>
                                            {t("Back")}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-8 col-12">
                                <div className="sidebar">
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <SidebarSearch/>
                                        </div>
                                        <div className="col-12">
                                            <RecentPost/>
                                        </div>
                                        <div className="col-12">
                                            <Highlight/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <ArticleSkeleton />
            )}
        </>
    );
};
