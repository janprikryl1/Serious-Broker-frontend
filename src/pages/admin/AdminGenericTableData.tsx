import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {adminURLS} from "../../utils/constants";
import {Button} from "../../components/reusable/Button.tsx";
import {ArticlesSkeleton} from "../../components/articles/ArticlesSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {TableSelect} from "../../utils/types/admin/TableSelect.ts";
import {GenericTableAdminCard} from "../../components/admin/genericTable/GenericTableAdminCard.tsx";
import {getMySelects} from "../../utils/api/genericTableService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

export const AdminGenericTableData:FC = () => {
    const {t} = useTranslation();
    const [selects, setSelects] = useState<TableSelect[]>();

    useEffect(() => {
        const fetchSelects = async () => {
            try {
                const response = await getMySelects();
                setSelects(response.data);
            } catch (error) {
                CustomSwal.fire({
                    title: t('Error'),
                    text: t('Something went wrong!'),
                    icon: 'error',
                });
                console.error(error);
            }
        }
        fetchSelects();
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
                        <h3 className="admin-section-title">{t("Generic tables management")}</h3>
                        <Link to={adminURLS.newGenericTableData}>
                            <Button>{t("New query")}</Button>
                        </Link>
                        <div className="padding-top padding-bottom">
                            <div className="blog__wrapper">
                                <div className="row g-4">
                                    {!selects ? (
                                        <ArticlesSkeleton/>
                                    ) : (
                                        selects.map((select) => (
                                            <div key={select.id} className="col-sm-6 col-lg-4">
                                                <GenericTableAdminCard data={select} setSelects={setSelects}/>
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
    )
}