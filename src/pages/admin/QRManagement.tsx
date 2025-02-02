import {ChangeEvent, FC, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../utils/providers/ThemeProvider";
import { QRCodeType } from "../../utils/types/QRCodeType";
import { getQR, saveQRCode } from "../../api/qrService";
import Swal from "sweetalert2";
import { qrCodeImagesURL } from "../../utils/constants";

export const QRManagement: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isEditingImage, setIsEditingImage] = useState<boolean>(false);

    const { register, handleSubmit, reset } = useForm<QRCodeType>({
        defaultValues: {
            image: "",
            description: "",
            network: "",
            address_of_deposit: "",
        },
    });

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const response = await getQR();
                if (response) {
                    reset(response.data);
                    setImageUrl(response.data.image ? `${qrCodeImagesURL}/${response.data.image}` : null);
                }
            } catch (error) {
                console.error(t("Failed to fetch QR code details"), error);
            }
        };
        fetchQR();
    }, [t, reset]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
    };

    const onSubmit = async (data: QRCodeType) => {
        try {
            const response = await saveQRCode(data, image);
            if (response) {
                Swal.fire({
                    title: t("QR Code updated"),
                    text: t("QR Code updated successfully"),
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: t("Error"),
                    text: t("Failed to update QR Code"),
                    icon: "error",
                });
            }
        } catch (error) {
            console.error(t("Error saving QR Code"), error);
            Swal.fire({
                title: t("Error"),
                text: t("Failed to update QR Code"),
                icon: "error",
            });
        }
    };

    return (
        <div className="padding-bottom">
            <div
                className="text-center"
                style={{
                    maxWidth: "95%",
                    backgroundColor: theme === "dark" ? "#343a40" : "#f5f8fb",
                    borderRadius: 24,
                    padding: "30px",
                    zIndex: 2,
                }}
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <h1>{t("QR payment management")}</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="image">
                                <Form.Label>{t("Image")}</Form.Label>
                                {imageUrl && !isEditingImage ? (
                                    <div className="mb-2">
                                        <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                            {t("View current image")}
                                        </a>
                                        <Button variant="warning" className="ms-5" onClick={() => setIsEditingImage(true)}>
                                            {t("Change Image")}
                                        </Button>
                                    </div>
                                ) : (
                                    <Form.Control type="file" {...register("image")} onChange={handleImageChange} />
                                )}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="network">
                                <Form.Label>{t("Network")}</Form.Label>
                                <Form.Control type="text" placeholder={t("Enter network")} {...register("network")} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>{t("Description")}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={t("Enter description")} {...register("description")} />
                    </Form.Group>
                    <Form.Group controlId="address_of_deposit" className="mb-3">
                        <Form.Label>{t("Address of deposit")}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={t("Enter address of deposit")} {...register("address_of_deposit")} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        {t("Save")}
                    </Button>
                </Form>
            </div>
        </div>
    );
};
