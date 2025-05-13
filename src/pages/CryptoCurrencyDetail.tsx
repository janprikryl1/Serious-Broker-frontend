import { FC, useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {coinURL} from "../utils/constants";
import {getCryptocurrencyById} from "../utils/api/CryptocurrencyService.ts";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {Button, ButtonColor} from "../components/reusable/Button.tsx";
import {SidebarSearch} from "../components/article/SidebarSearch.tsx";
import {RecentPost} from "../components/article/RecentPost.tsx";
import {ArticleSkeleton} from "../components/article/ArticleSkeleton.tsx";
import {Highlight} from "../components/editor/highlights/Highlight.tsx";
import {CryptoCurrencyDetailType} from "../utils/types/asset/CryptoCurrencyType.ts";

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
        navigate(-1);
    };

    return (
        <>
            <TitleHeader title={cryptocurrency?.name ?? "Cryptocurrency"} />
            {cryptocurrency ? (
                <div className="blog-details mt-4 padding-bottom">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <div className="blog-details__item">
                                    <div className="blog-details__item-inner">
                                        <h3 className="index-title">{cryptocurrency.name} ({cryptocurrency.symbol})</h3>
                                        {!imageError && (
                                            <img
                                                src={`${coinURL}/${cryptocurrency.photo}`}
                                                alt={cryptocurrency.name}
                                                width={300}
                                                onError={() => setImageError(true)}
                                                className="mb-3"
                                            />
                                        )}
                                        <p><strong>{t("Website:")}</strong> <a className="link-underline-none" href={cryptocurrency.website}>{cryptocurrency.website}</a></p>
                                        <p><strong>{t("Marketcup: ")}</strong> {cryptocurrency.marketcap}</p>
                                        {cryptocurrency.max_supply !== 0 && <p><strong>{t("Total supply: ")}</strong>{cryptocurrency.max_supply}{" "}{t("coins")}</p>}
                                        <p><strong>{t("Circulating supply: ")}</strong> {cryptocurrency.circulating_supply}{" "}{t("coins")}</p>
                                        {cryptocurrency.reddit && <p><strong>{t("Reddit: ")}</strong> <a className="link-underline-none" href={cryptocurrency.reddit}>{cryptocurrency.reddit}</a></p>}
                                        {cryptocurrency.twitter && <p><strong>{t("Twitter: ")}</strong> <a className="link-underline-none" href={cryptocurrency.twitter}>{cryptocurrency.twitter}</a></p>}
                                        {cryptocurrency.telegram && <p><strong>{t("Telegram: ")}</strong> <a className="link-underline-none" href={cryptocurrency.telegram}>{cryptocurrency.telegram}</a></p>}
                                        <p><strong>{t("CMC rank: ")}</strong> {cryptocurrency.cmc_rank}</p>
                                        {cryptocurrency.categories && <p><strong>{t("Categories: ")}</strong> {cryptocurrency.categories}</p>}
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
