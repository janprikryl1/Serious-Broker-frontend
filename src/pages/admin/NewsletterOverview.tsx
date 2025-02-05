import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NewsletterType } from "../../utils/types/NewslwtterType.ts";
import { getAllNewsletters } from "../../api/newsletterService.ts";
import {v4 as uuidv4} from "uuid";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";
import {Button} from "../../components/Button.tsx";

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
        <div className="padding-bottom service-details__wrapper">
            <div className="service-details__item">
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <h1 className="admin-section-title">{t("Registered newsletters")}</h1>
                        <div className="table-responsive mt-3">
                            <table className="table" style={{width: "100%", margin:0}}>
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
                        <Button onClick={sendEmailToAll} className="btn btn-primary mt-3">
                            {t("Send email to all")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};