import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {DemoType} from "../../utils/types/demos/demoType.ts";
import {getAllDemos} from "../../api/demosService.ts";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {adminURLS} from "../../utils/constants";
import {Button} from "react-bootstrap";
import {ArticlesSkeleton} from "../../components/modules/articles/ArticlesSkeleton.tsx";
import {DemoAdminCard} from "../../components/modules/admin/demos/DemoAdminCard.tsx";

export const AdminDemos:FC = () => {
    const {t} = useTranslation();
    const [demos, setDemos] = useState<DemoType[]>([]);

    useEffect(() => {
        const fetchDemos = async () => {
            try {
                const response = await getAllDemos();
                setDemos(response.data);
            } catch (error) {
                Swal.fire({
                    title: t('Error'),
                    text: t('Something went wrong!'),
                    icon: 'error',
                });
                console.error(error);
            }
        }
        fetchDemos();
    }, []);
    
    return (
        <div className="padding-bottom admin-container">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <h3 className="admin-section-title">{t("Demo management")}</h3>
                        <Link to={adminURLS.newDemo}><Button
                            variant="outline-warning">{t("New demo")}</Button></Link>
                        <div className="padding-top padding-bottom">
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {!demos ? (
                                        <ArticlesSkeleton/>
                                    ) : (
                                        demos.map((item) => (
                                            <div key={item.id} className="col-sm-6 col-lg-4">
                                                <DemoAdminCard data={item} setDemos={setDemos}/>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};