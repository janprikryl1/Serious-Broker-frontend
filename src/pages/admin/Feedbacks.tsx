import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FeedbackStoredType } from "../../utils/types/feedback/FeedbackStoredType.ts";
import { getAllFeedbacks } from "../../api/feedbackService.ts";
import { Accordion, Button } from "react-bootstrap";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";

const PAGE_SIZE = 10;

export const Feedbacks: FC = () => {
    const { t } = useTranslation();
    const [feedbacks, setFeedbacks] = useState<FeedbackStoredType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getAllFeedbacks(page, PAGE_SIZE);
                if (response && response.data) {
                    setFeedbacks(response.data.data);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeedbacks();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (totalPages || 1)) {
            setPage(newPage);
        }
    };

    return (
        <div className="padding-bottom">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                <h1 className="card-title">{t("Feedbacks")}</h1>
                                <div className="table-responsive mt-3">
                                    <table className="table-index-light" style={{width: "100%", margin:0}}>
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>{t("Name")}</th>
                                            <th>{t("Email")}</th>
                                            <th>{t("Message")}</th>
                                            <th>{t("Created")}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {feedbacks.map((feedback) => (
                                            <tr key={feedback.id}>
                                                <td>{feedback.id}</td>
                                                <td>{feedback.name}</td>
                                                <td>
                                                    <a href={`mailto:${feedback.email}`}>
                                                        {feedback.email}
                                                    </a>
                                                </td>
                                                <td>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                {feedback.message.substring(0, 5)}...
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                {feedback.message}
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </td>
                                                <td>{toCzechDateFormat(feedback.created)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

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
                                        {totalPages &&
                                            [...Array(totalPages).keys()].map((p) => (
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
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};
