import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ImageModal} from "../../article/articleVariants/ImageModal.tsx";
import {getQR} from "../../../utils/api/qrService.ts";
import {qrCodeImagesURL} from "../../../utils/constants";
import {QRCodeType} from "../../../utils/types/admin/QRCodeType.ts";
import {useModal} from "../../../utils/hooks/useModal.tsx";
import {captureEvent} from "../../../utils/posthog.ts";

export const QRPayment:FC = () => {
    const {t} = useTranslation();
    const {isOpen: isModalOpen, closeModal, openModal} = useModal();
    const [qrData, setQrData] = useState<QRCodeType>();

    useEffect(() => {
        const fetchQR = async () => {
            const response = await getQR();
            if (!response) return;
            setQrData(response.data);
            captureEvent('membership_payment_qr_viewed', {
                network: response.data.network,
                address: response.data.address_of_deposit,
            });
        };
        fetchQR();
    }, []);
    
    if (qrData) {
        return (
            <div style={{marginLeft: "2vw", marginTop: "0.1vw"}}>
                <h1>{t("To access premium articles, you need to pay with a cryptocurrency")}</h1>
                <div className="row">
                    <div className="col-sm-2">
                        <img src={qrCodeImagesURL+qrData.image} alt="QR Code" className="mb-3" onClick={openModal}/>
                    </div>
                    <div className="col-sm-6" style={{fontSize: "25px"}}>
                        <p>{t("Description")}: {t(qrData.description)}</p>
                        <p>{t("Network")}: {qrData.network}</p>
                        <p>{t("Address of deposit")}: {qrData.address_of_deposit}</p>
                    </div>
                </div>
                <ImageModal isModalOpen={isModalOpen} selectedImage={qrCodeImagesURL+qrData.image} closeModal={closeModal} />
            </div>
        );
    }
}