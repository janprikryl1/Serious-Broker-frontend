import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ArticlesSkeleton} from "../../components/modules/articles/ArticlesSkeleton.tsx";
import {ArticleCard} from "../../components/modules/articles/ArticleCard.tsx";
import {ArticleProps} from "../../utils/types/article/ArticleProps.ts";
import {getAllArticles} from "../../api/articleService.ts";
import Swal from "sweetalert2";
import {Pagination} from "../../components/Pagiation.tsx";

export const ArticleManagement:FC = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await getAllArticles(page);
                setArticles(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching articles:", error);
            }
            setLoading(false);
        };
        fetchArticles();
    }, [page, t]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <div className="padding-bottom padding-top">
                <div className="container">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <div
                                    className="service-details__content"
                                    data-aos="fade-up"
                                    data-aos-duration="900"
                                >
                                    <h3>{t("Article management")}</h3>
                                    <Link to="/admin/articles/new"><Button variant="outline-warning">{t("New article")}</Button></Link>

                                    <div className="container padding-top padding-bottom">
                                        <div className="blog__wrapper">
                                            <div className="row g-4">

                                                    {loading ? (
                                                        <ArticlesSkeleton />
                                                    ) : (
                                                        articles.map((item) => (
                                                            <div key={item.id} className="col-sm-6 col-lg-4">
                                                                <ArticleCard data={item} link="admin/articles/edit" />
                                                            </div>
                                                        ))
                                                    )}
                                                
                                            </div>
                                            <Pagination
                                                currentPage={page}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}