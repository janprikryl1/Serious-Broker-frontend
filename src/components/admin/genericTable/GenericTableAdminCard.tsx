import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {CustomSwal} from "../../../utils/functions/customSwal.ts";
import {TableSelect} from "../../../utils/types/admin/TableSelect.ts";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {adminURLS} from "../../../utils/constants";
import {deleteMySelect} from "../../../utils/api/genericTableService.ts";

type Props = {
    data: TableSelect;
    setSelects: Dispatch<SetStateAction<TableSelect[] | undefined>>;
}

export const GenericTableAdminCard:FC<Props> = ({data, setSelects}) => {
    const {t} = useTranslation();

    const handleDelete = async (id: number) => {
        try {
            await deleteMySelect(id);
            CustomSwal.fire({
                icon: "success",
                title: t("Select deleted"),
                text: t("Select deleted successfully"),
            });
            setSelects((select) => select?.filter(item => item.id !== id));
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while deleting select"),
            });
            console.error("Error deleting demo:", error);
        }
    }
    
    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                        <Link to={`${adminURLS.genericsTableData}/${data.id}`} className="link-underline-none">{data.query}</Link>
                    </h5>
                    <p className="mb-15">{t("Last update: ")}{data.updated}</p>
                    <div className="blog__writer">
                        <div className="blog__writer-designation d-flex align-items-center">
                            <Button
                                variant="danger"
                                className="ms-2 p-1"
                                onClick={() => handleDelete(data.id!)}
                            >
                                <FaRegTrashAlt/>
                            </Button>
                            <Link to={`${adminURLS.newGenericTableData}/${data.id}`}>
                                <Button
                                    variant="success"
                                    className="ms-2 p-1"
                                >
                                    <FaRegEdit/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}