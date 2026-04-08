import {Modal} from "react-bootstrap";
import Lottie from "lottie-react";
import successAnim from "../../assets/success.json";
import errorAnim from "../../assets/error.json";
import {NextStepButton} from "./NextStepButton.tsx";
import React, {ReactNode} from "react";
import {Button} from "./Button.tsx";
import {useTranslation} from "react-i18next";

type Props = {
    showModal: boolean;
    closeModal: () => void;
    title: string;
    type: 'success' | 'error';
    children?: ReactNode;
    buttonText?: string;
}

export const CustomModal = ({showModal, closeModal, title, type, children = null, buttonText = ""} : Props) => {
    const { t } = useTranslation();

    const lottieClass = type === 'error' ? 'lottie-custom-color-red' : 'lottie-custom-color-secondary';

    return (
        <Modal
            show={showModal}
            onHide={closeModal}
            centered
            contentClassName="custom-modal"
            backdropClassName="custom-backdrop"
        >
            <Modal.Body>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h4>{t(title)}</h4>
                    <div className={lottieClass} style={{ width: "30%" }}>
                        <Lottie
                            animationData={type === 'success' ? successAnim : errorAnim }
                            loop={false}
                            autoPlay={true}
                            color={"var(--secondary-color)"}
                        />
                    </div>
                    {children ? (
                        children
                    ) : (
                        <Button onClick={closeModal}>
                            {buttonText ? (buttonText) : (t("OK"))}
                        </Button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

