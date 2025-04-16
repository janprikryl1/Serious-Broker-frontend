import {Dispatch, FC, SetStateAction} from "react";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import "../../../styles/sass/components/image-modal.scss";

type Props = {
    isModalOpen: boolean;
    selectedImage: string;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ImageModal: FC<Props> = ({ isModalOpen, selectedImage, setModalOpen }) => {
    const { t } = useTranslation();
    
    return (
        <Modal
            show={isModalOpen}
            onHide={() => setModalOpen(false)}
            size="lg"
            centered
            aria-labelledby="gallery-modal"
        >
            <Modal.Body className="p-0">
                <img
                    src={selectedImage}
                    className="img-fluid image-modal-img"
                    alt="Gallery Image"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button color={ButtonColor.gray} onClick={() => setModalOpen(false)}>
                    {t("Close")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
