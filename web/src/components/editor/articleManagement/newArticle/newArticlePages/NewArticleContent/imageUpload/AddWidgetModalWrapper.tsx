import {FC, ReactNode} from "react";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

type Props = {
    children: ReactNode;
    isOpen: boolean;
    handleModalClose: () => void;
}

export const AddWidgetModalWrapper:FC<Props> = ({children, isOpen, handleModalClose}) => {
    const {t} = useTranslation();
    
    return (
        <Modal show={isOpen} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("Upload image")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
