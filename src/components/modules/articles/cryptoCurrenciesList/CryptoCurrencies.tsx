import { FC, useEffect, useState } from "react";
import { CryptoCurrencyType } from "../../../../utils/types/CryptoCurrencyType.ts";
import { getAllCryptocurrencies, getSearchCryptocurrencies } from "../../../../api/CryptocurrencyService.ts";
import { CryptoCurrencyLink } from "./CryptoCurrencyLink.tsx";
import { CryptoCurrenciesSkeleton } from "./CryptoCurrenciesSkeleton.tsx";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "react-bootstrap";

const PAGE_SIZE = 50;

export const CryptoCurrencies: FC = () => {
    const { t } = useTranslation();
    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrencyType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = searchValue
                    ? await getSearchCryptocurrencies(searchValue, page, PAGE_SIZE)
                    : await getAllCryptocurrencies(page, PAGE_SIZE);

                setCryptocurrencies(res.data.data);
                setTotalPages(res.data.totalPages || 1);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [page, searchValue]);

    const handleSearch = async () => {
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (totalPages || 1)) {
            setPage(newPage);
        }
    };

    return (
        <>
            <Row className="justify-content-center align-items-center" style={{ marginTop: 30 }}>
                <Col xs="auto">
                    <div className="cta-form d-sm-flex align-items-center justify-content-center">
                        <input
                            type="text"
                            className="form-control form-control--style2 mb-3 mb-sm-0"
                            placeholder="Bitcoin"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                            className="trk-btn trk-btn--large trk-btn--secondary2"
                            onClick={handleSearch}
                            style={{ marginLeft: 10, paddingLeft: 15 }}
                        >
                            {t("Search")}
                        </button>
                    </div>
                </Col>
            </Row>

            {cryptocurrencies.length > 0 ? (
                cryptocurrencies.map((cryptocurrency) => (
                    <CryptoCurrencyLink cryptocurrency={cryptocurrency} key={cryptocurrency.id} />
                ))
            ) : (
                <CryptoCurrenciesSkeleton />
            )}

            <div className="paginations" data-aos="fade-up" data-aos-duration="1200">
                <ul className="lab-ul d-flex flex-wrap justify-content-center mb-1">
                    <li>
                        <Button
                            variant="outline-warning"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            <i className="fa-solid fa-angle-left me-2"></i> {t("Previous")}
                        </Button>
                    </li>
                    {totalPages && [...Array(totalPages).keys()].map((p) => (
                        <li key={p}>
                            <Button
                                variant={p + 1 === page ? "success" : "outline-warning"}
                                onClick={() => handlePageChange(p + 1)}
                            >
                                {p + 1}
                            </Button>
                        </li>
                    ))}
                    <li>
                        <Button
                            variant="outline-warning"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= (totalPages || 1)}
                        >
                            {t("Next")} <i className="fa-solid fa-angle-right ms-2"></i>
                        </Button>
                    </li>
                </ul>
            </div>
        </>
    );
};
