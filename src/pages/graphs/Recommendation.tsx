import { ChangeEvent, FC, useEffect, useState, useRef, useCallback } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {getBinanceIndexAssetRecomBestPrevious} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {RecommendationSkeleton} from "../../components/graphs/RecommendationSkeleton.tsx";
import {PositionGraphComponent} from "../../components/graphs/PositionGraphComponent.tsx";
import {RecomDetail} from "../../components/graphs/RecomDetail.tsx";

export const Recommendation: FC = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<BinanceIndexAssetRecomBestPreviousType[]>([]);
    const [orderBy, setOrderBy] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef<boolean>(false);

    const fetchData = useCallback(async (reset: boolean = false) => {
        if (!orderBy || isFetchingRef.current || (currentPage > totalPages && !reset)) return;

        isFetchingRef.current = true;
        setLoading(true);

        try {
            const res = await getBinanceIndexAssetRecomBestPrevious(orderBy, reset ? 1 : currentPage);
            setData((prev) => (reset ? res.data.data : [...prev, ...res.data.data]));
            setTotalPages(res.data.totalPages);
        } catch (e) {
            console.error("Error fetching recommendations:", e);
        }

        setLoading(false);
        isFetchingRef.current = false;
    }, [orderBy, currentPage]);

    useEffect(() => {
        fetchData(true);
    }, [orderBy]);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        if (!loaderRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && currentPage < totalPages) {
                    setCurrentPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 1.0 }
        );

        observerRef.current.observe(loaderRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, totalPages, currentPage]);

    const handleOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(e.target.value);
        setCurrentPage(1);
        setData([]);
    };

    return (
        <>
            <TitleHeader title="Recommendation" />
            <div className="blog padding-top padding-bottom section-bg-color">
                <div className="container">
                    <Row className="justify-content-center align-items-center">
                        <Col xs="auto">
                            <Form.Select aria-label="Default select example" onChange={handleOrderBy} defaultValue={orderBy}>
                                <option value="">{t("Order by")}</option>
                                <option value="all_pos">{t("All positions")}</option>
                                <option value="cmc_rank">{t("cmc_rank")}</option>
                                <option value="all_sug">{t("All suggestions")}</option>
                                <option value="week_sug">{t("Week suggestions")}</option>
                                <option value="week_all">{t("Week all")}</option>
                                <option value="week_all_profit">{t("Week all profit")}</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    {(loading && currentPage === 1) || data.length === 0 ? (
                        <RecommendationSkeleton />
                    ) : (
                        <>
                            <PositionGraphComponent data={data} />
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {data.map((item) => (
                                        <div key={uuidv4()} className="col-sm-6 col-lg-4">
                                            <RecomDetail data={item} />
                                        </div>
                                    ))}
                                </div>
                                <div ref={loaderRef}>
                                    {loading && <RecommendationSkeleton />}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
