import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {DemoType} from "../../../utils/types/demos/demoType.ts";
import {deleteDemo} from "../../../utils/api/demosService.ts";
import {adminURLS} from "../../../utils/constants";
import {CustomSwal} from "../../../utils/functions/customSwal.ts";

type Props = {
    data: DemoType;
    setDemos: Dispatch<SetStateAction<DemoType[]>>;
}

export const DemoAdminCard:FC<Props> = ({data, setDemos}) => {
    const {t} = useTranslation();

    const handleDelete = async (id: number) => {
        try {
            await deleteDemo(id);
            CustomSwal.fire({
                icon: "success",
                title: t("Demo deleted"),
                text: t("Demo deleted successfully"),
            });
            setDemos((demo) => demo.filter(item => item.id !== id));
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while deleting demo"),
            });
            console.error("Error deleting demo:", error);
        }
    }

    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                        <Link to={`/demo/${data.id}`} className="link-underline-none">{data.name}</Link>
                    </h5>

                    <p className="mb-15">{data.description}</p>

                    <div className="blog__writer">
                        <div className="blog__writer-designation d-flex align-items-center">
                            <Button
                                variant="danger"
                                className="ms-2 p-1"
                                onClick={() => handleDelete(data.id!)}
                            >
                                <FaRegTrashAlt />
                            </Button>
                            <Link to={`${adminURLS.newDemo}/${data.id}`}>
                                <Button
                                    variant="success"
                                    className="ms-2 p-1"
                                >
                                    <FaRegEdit />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}