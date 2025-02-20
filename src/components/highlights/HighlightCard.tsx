import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IoIosInformationCircleOutline} from "react-icons/io";
import {Button} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";
import Swal from "sweetalert2";
import {HighlightType} from "../../utils/types/highlights/HighlightType.ts";
import {deleteHighlight} from "../../utils/api/highlightsService.ts";
import {editorURLS} from "../../utils/constants";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";

type Props = {
    highlightData: HighlightType;
    fetchHighlights: () => void;
};

export const HighlightCard:FC<Props> = ({highlightData, fetchHighlights}) => {
    const {t, i18n} = useTranslation();
    
    const handleDelete = async (id: number) => {
        try {
            const response = await deleteHighlight(id);
            if (response?.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: t("Highlight deleted"),
                    text: t("Highlight deleted successfully"),
                }).then(() => fetchHighlights());
            }
        } catch (error) {
            console.error("Error deleting highlight:", error);
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while deleting highlight"),
            });
        }
    }
    
    return (
        <div className="col-sm-6">
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner" style={{margin: "20px"}}>
                    <Link to={`${editorURLS.highlitsEditor}/${highlightData.id}`} className="link-underline-none">
                        <h2 style={{fontSize: "35px"}}>{i18n.language == "cs" ? highlightData.title_cs : highlightData.title}</h2>
                        <div className="row">
                            <div className="col-2">
                                <IoIosInformationCircleOutline/>
                            </div>
                            <div className="col-sm">
                                <p style={{fontSize: "15px"}}>{i18n.language == "cs" ? highlightData.description_cs : highlightData.description}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="blog__writer-designation d-flex align-items-center">
                        <p className="mb-0">{toCzechDateFormat(highlightData.created)}</p>
                        <Button
                            variant="danger"
                            className="ms-2 p-1"
                            onClick={() => handleDelete(highlightData.id)}
                        >
                            <FaRegTrashAlt />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}