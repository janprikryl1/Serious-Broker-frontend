import { FC, useEffect, useState } from "react";
import { CryptoCurrencyType } from "../../../../utils/types/CryptoCurrencyType.ts";
import { getAllCryptocurrencies, getSearchCryptocurrencies } from "../../../../api/CryptocurrencyService.ts";
import { CryptoCurrencyLink } from "./CryptoCurrencyLink.tsx";
import { CryptoCurrenciesSkeleton } from "./CryptoCurrenciesSkeleton.tsx";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import {Pagination} from "../../../Pagiation.tsx";
import {Button, ButtonColor} from "../../../Button.tsx";

const PAGE_SIZE = 50;

export const CryptoCurrencies: FC = () => {
    const { t } = useTranslation();
    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrencyType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = searchValue
                    ? await getSearchCryptocurrencies(searchValue, currentPage, PAGE_SIZE)
                    : await getAllCryptocurrencies(currentPage, PAGE_SIZE);

                setCryptocurrencies(res.data.data);
                setTotalPages(res.data.totalPages || 1);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [currentPage, searchValue]);

    const handleSearch = async () => {
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
                        <Button className="trk-btn trk-btn--secondary2" onClick={handleSearch} color={ButtonColor.white} style={{ paddingRight: 50, height: 40 }}>
                            {t("Search")}
                        </Button>
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};
