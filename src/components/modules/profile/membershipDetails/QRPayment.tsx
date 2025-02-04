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
            <div style={{marginLeft: "2vw", marginTop: "0.1vw"}}>
                <h1>{t("To access premium articles, you need to pay with a cryptocurrency")}</h1>
                <div className="row">
                    <div className="col-sm-2">
                        <img src={qrCodeImagesURL+qrData.image} alt="QR Code" style={{width: "40vw", height:"40vh"}} className="mb-3" onClick={() => setModalOpen(true)}/>
                    </div>
                    <div className="col-sm-6" style={{fontSize: "25px"}}>
                        <p>{t("Description")}: {t(qrData.description)}</p>
                        <p>{t("Network")}: {qrData.network}</p>
                        <p>{t("Address of deposit")}: {qrData.address_of_deposit}</p>
                    </div>
                </div>
                <ImageModal isModalOpen={isModalOpen} selectedImage={qrCodeImagesURL+qrData.image} setModalOpen={setModalOpen} />
            </div>
        );
    }
}