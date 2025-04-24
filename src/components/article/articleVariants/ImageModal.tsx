import {FC} from "react";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import "../../../styles/sass/components/image-modal.scss";

type Props = {
    isModalOpen: boolean;
    selectedImage: string;
    closeModal: () => void;
};

export const ImageModal: FC<Props> = ({ isModalOpen, selectedImage, closeModal }) => {
    const { t } = useTranslation();
    
    return (
        <Modal
            show={isModalOpen}
            onHide={closeModal}
            size="lg"
            centered
        >
            <Modal.Body className="p-0">
                <img
                    src={selectedImage}
                    className="img-fluid image-modal-img"
                    alt="Gallery Image"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button color={ButtonColor.gray} onClick={closeModal}>
                    {t("Close")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
