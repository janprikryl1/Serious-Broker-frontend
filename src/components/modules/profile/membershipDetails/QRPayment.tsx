import {FC, useEffect, useState} from "react";
import {QRCodeType} from "../../../../utils/types/QRCodeType.ts";
import {getQR} from "../../../../api/qrService.ts";
import {useTranslation} from "react-i18next";
import {qrCodeImagesURL} from "../../../../utils/constants";
import {ImageModal} from "../../article/articleVariants/ImageModal.tsx";

export const QRPayment:FC = () => {
    const {t} = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [qrData, setQrData] = useState<QRCodeType>();

    useEffect(() => {
        const fetchQR = async () => {
            const response = await getQR();
            if (!response) return;
            setQrData(response.data);
        };
        fetchQR();
    }, []);
    
    if (qrData) {
        return (
            <>
                <h2>{t("To access premium articles, you need to pay with a cryptocurrency")}</h2>
                <img src={qrCodeImagesURL+qrData.image} alt="QR Code" style={{width: 200, height:300}} onClick={() => setModalOpen(true)}/>
                <p>{t("Description")}: {t(qrData.description)}</p>
                <p>{t("Network")}: {qrData.network}</p>
                <p>{t("Address of deposit")}: {qrData.address_of_deposit}</p>
                <ImageModal isModalOpen={isModalOpen} selectedImage={qrCodeImagesURL+qrData.image} setModalOpen={setModalOpen} />
            </>
        );
    }
}