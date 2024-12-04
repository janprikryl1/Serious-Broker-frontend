import { FC, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../utils/providers/ThemeProvider";
import { QRCodeType } from "../../utils/types/QRCodeType";
import { getQR, saveQRCode } from "../../api/qrService";
import Swal from "sweetalert2";

export const QRManagement: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const [formData, setFormData] = useState<Partial<QRCodeType>>({
        image: "",
        description: "",
        network: "",
        address_of_deposit: "",
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const response = await getQR();
                if (response) {
                    setFormData(response.data);
                }
            } catch (error) {
                console.error(t("Failed to fetch QR code details"), error);
            }
        };
        fetchQR();
    }, [t]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
    };

    const handleSave = async () => {
        try {
            const response = await saveQRCode(formData, image);
            if (response) {
                Swal.fire({
                    title: t("QR Code updated"),
                    text: t("QR Code updated successfully"),
                    icon: "success",
                });
                setFormData({
                    image: "",
                    description: "",
                    network: "",
                    address_of_deposit: "",
                });
                setImage(null);
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
                <Form>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="image">
                                <Form.Label>{t("Image")}</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="network">
                                <Form.Label>{t("Network")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t("Enter network")}
                                    name="network"
                                    value={formData.network}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>{t("Description")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={t("Enter description")}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="address_of_deposit" className="mb-3">
                        <Form.Label>{t("Address of deposit")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={t("Enter address of deposit")}
                            name="address_of_deposit"
                            value={formData.address_of_deposit}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSave} className="mt-3">
                        {t("Save")}
                    </Button>
                </Form>
            </div>
        </div>
    );
};
