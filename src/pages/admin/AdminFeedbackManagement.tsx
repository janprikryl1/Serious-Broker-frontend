import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FeedbackStoredType } from "../../utils/types/feedback/FeedbackStoredType.ts";
import { Accordion } from "react-bootstrap";
import {getAllFeedbacks} from "../../utils/api/feedbackService.ts";
import {Pagination} from "../../components/reusable/Pagiation.tsx";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";

const PAGE_SIZE = 10;

export const AdminFeedbackManagement: FC = () => {
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
                                    <table className="table">
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

                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages ?? 1}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};
