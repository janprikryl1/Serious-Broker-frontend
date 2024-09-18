import {FC} from "react";
import { Button } from "react-bootstrap";
import {useTranslation} from "react-i18next";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const {t} = useTranslation();
    const range = 1;
    const startPage = Math.max(1, currentPage - range);
    const endPage = Math.min(totalPages, currentPage + range);
    const pagesToShow = [
        ...Array(endPage - startPage + 1).keys()
    ].map(i => startPage + i);

    return (
        <div className="paginations" data-aos="fade-up" data-aos-duration="1200">
            <ul className="lab-ul d-flex flex-wrap justify-content-center mb-1">
                <li>
                    <Button
                        variant="outline-warning"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <i className="fa-solid fa-angle-left me-2"></i> {t("Previous")}
                    </Button>
                </li>
                {startPage > 1 && (
                    <>
                        <li>
                            <Button
                                variant="outline-warning"
                                onClick={() => onPageChange(1)}
                            >
                                1
                            </Button>
                        </li>
                        {startPage > 2 && <li>...</li>}
                    </>
                )}
                {pagesToShow.map(p => (
                    <li key={p}>
                        <Button
                            variant={p === currentPage ? "success" : "outline-warning"}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </Button>
                    </li>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <li>...</li>}
                        <li>
                            <Button
                                variant="outline-warning"
                                onClick={() => onPageChange(totalPages)}
                            >
                                {totalPages}
                            </Button>
                        </li>
                    </>
                )}
                <li>
                    <Button
                        variant="outline-warning"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        {t("Next")} <i className="fa-solid fa-angle-right ms-2"></i>
                    </Button>
                </li>
            </ul>
        </div>
    );
};