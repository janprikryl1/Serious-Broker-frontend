import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toCzechDateFormat } from "../../utils/constants";
import { NewsletterType } from "../../utils/types/NewslwtterType.ts";
import { getAllNewsletters } from "../../api/newsletterService.ts";
import {v4 as uuidv4} from "uuid";

export const NewsletterOverview: FC = () => {
    const { t } = useTranslation();
    const [newsletters, setNewsletters] = useState<NewsletterType[]>([]);

    useEffect(() => {
        const fetchNewsletters = async () => {
            try {
                const response = await getAllNewsletters();
                if (!response) return;
                setNewsletters(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNewsletters();
    }, []);

    const sendEmailToAll = () => {
        const emailAddresses = newsletters.map((newsletter) => newsletter.email).join(",");
        window.location.href = `mailto:${emailAddresses}`;
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
                                    <h4 className="card-title">{t("Registered newsletters")}</h4>
                                    <div className="table-responsive mt-3">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Email</th>
                                                <th>{t("Created")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {newsletters.map((newsletter) => (
                                                <tr key={uuidv4()}>
                                                    <td>{newsletter.id}</td>
                                                    <td><a href={`mailto:${newsletter.email}`}>{newsletter.email}</a></td>
                                                    <td>{toCzechDateFormat(newsletter.created)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={sendEmailToAll} className="btn btn-primary mt-3">
                                        {t("Send email to all")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};