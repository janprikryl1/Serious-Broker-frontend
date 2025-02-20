import {Dispatch, FC, SetStateAction} from "react";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

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
                    className="img-fluid"
                    alt="Gallery Image"
                    style={{ width:800, height:600, maxWidth: "100vw", maxHeight: '100vh', objectFit: 'contain' }}
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
