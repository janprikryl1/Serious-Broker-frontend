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
            <Modal.Body className="tw-px-4 tw-py-5 sm:tw-px-6 sm:tw-py-6 lg:tw-px-8 lg:tw-py-8">
                <div className="d-flex flex-column align-items-center justify-content-center tw-text-center tw-gap-3 sm:tw-gap-4">
                    <h4 className="tw-mb-0 tw-text-lg sm:tw-text-xl lg:tw-text-2xl tw-leading-tight">
                        {t(title)}
                    </h4>
                    <div className={`${lottieClass} tw-w-[20%] tw-min-w-[100px] tw-max-w-[150px]`}>
                        <Lottie
                            animationData={type === 'success' ? successAnim : errorAnim }
                            loop={false}
                            autoPlay={true}
                            color={"var(--secondary-color)"}
                        />
                    </div>
                    {children ? (
                        <div className="tw-w-full tw-flex tw-justify-center tw-text-xs sm:tw-text-sm lg:tw-text-base">
                            {children}
                        </div>
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
