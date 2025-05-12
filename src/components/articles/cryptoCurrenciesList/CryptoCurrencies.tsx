import { FC, useEffect, useState, useRef, useCallback } from "react";
import { CryptoCurrencyLink } from "./CryptoCurrencyLink.tsx";
import { CryptoCurrenciesSkeleton } from "./CryptoCurrenciesSkeleton.tsx";
import { useTranslation } from "react-i18next";
import { getAllCryptocurrencies, getSearchCryptocurrencies } from "../../../utils/api/CryptocurrencyService.ts";
import { Button, ButtonColor } from "../../reusable/Button.tsx";
import { CryptoCurrencyType } from "../../../utils/types/asset/CryptoCurrencyType.ts";
import "../../../styles/sass/components/crypto_currencies.scss";
import {useInfiniteScroll} from "../../../utils/hooks/useInfiniteScroll.ts";

const PAGE_SIZE = 50;

export const CryptoCurrencies: FC = () => {
    const { t } = useTranslation();
    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrencyType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({totalPages, loading});

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
    }, [currentPage, searchValue, totalPages]);

    useEffect(() => {
        fetchData(true);
    }, [searchValue]);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handleSearch = () => {
        resetPage();
        setCryptocurrencies([]);
    };

    return (
        <>
            <div className="d-flex justify-content-center mb-3 mt-15">
                <div className="d-flex align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control form-control--style2 crypto-currency-search-input"
                        style={{backgroundColor: "#fff", borderRadius: "3px", border: "none", color: "#000"}}
                        placeholder="Bitcoin"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        className="trk-btn crypto-currency-search-button"
                        onClick={handleSearch}
                        color={ButtonColor.white}
                    >
                        {t("Search")}
                    </Button>
                </div>
            </div>


            <div className="crypto-list">
                {cryptocurrencies?.length > 0 ? (
                    cryptocurrencies.map((cryptocurrency) => (
                        <CryptoCurrencyLink cryptocurrency={cryptocurrency} key={cryptocurrency.id}/>
                    ))
                ) : (
                    <CryptoCurrenciesSkeleton/>
                )}
            </div>
            <div ref={loaderRef} className="crypto-currency-loading-ref">
                {loading && <CryptoCurrenciesSkeleton/>}
            </div>
        </>
    );
};