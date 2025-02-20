import { FC, useEffect, useState, useRef, useCallback } from "react";
import { CryptoCurrencyLink } from "./CryptoCurrencyLink.tsx";
import { CryptoCurrenciesSkeleton } from "./CryptoCurrenciesSkeleton.tsx";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import {CryptoCurrencyType} from "../../../utils/types/CryptoCurrencyType.ts";
import {getAllCryptocurrencies, getSearchCryptocurrencies} from "../../../utils/api/CryptocurrencyService.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

const PAGE_SIZE = 50;

export const CryptoCurrencies: FC = () => {
    const { t } = useTranslation();
    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrencyType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef<boolean>(false);

    const fetchData = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (currentPage > totalPages && !reset)) return;

        isFetchingRef.current = true;
        setLoading(true);

        try {
            const res = searchValue
                ? await getSearchCryptocurrencies(searchValue, reset ? 1 : currentPage, PAGE_SIZE)
                : await getAllCryptocurrencies(reset ? 1 : currentPage, PAGE_SIZE);

            setCryptocurrencies((prev) => (reset ? res.data.data : [...prev, ...res.data.data]));
            setTotalPages(res.data.totalPages || 1);
        } catch (e) {
            console.error("Error fetching cryptocurrencies:", e);
        }

        setLoading(false);
        isFetchingRef.current = false;
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchData(true);
    }, [searchValue]);

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

    const handleSearch = () => {
        setCurrentPage(1);
        setCryptocurrencies([]);
    };

    return (
        <>
            <Row className="justify-content-center align-items-center" style={{ marginTop: 30 }}>
                <Col xs="auto">
                    <div className="cta-form d-sm-flex align-items-center justify-content-center">
                        <input
                            type="text"
                            className="form-control form-control--style2 mb-sm-0"
                            style={{ height: 40 }}
                            placeholder="Bitcoin"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button
                            className="trk-btn trk-btn--secondary2"
                            onClick={handleSearch}
                            color={ButtonColor.white}
                            style={{ paddingRight: 50, height: 40 }}
                        >
                            {t("Search")}
                        </Button>
                    </div>
                </Col>
            </Row>

            <div className="crypto-list">
                {cryptocurrencies.length > 0 ? (
                    cryptocurrencies.map((cryptocurrency) => (
                        <CryptoCurrencyLink cryptocurrency={cryptocurrency} key={cryptocurrency.id} />
                    ))
                ) : (
                    <CryptoCurrenciesSkeleton />
                )}
            </div>
            <div ref={loaderRef} style={{ height: 40, marginTop: 20, textAlign: "center" }}>
                {loading && <CryptoCurrenciesSkeleton />}
            </div>
        </>
    );
};
