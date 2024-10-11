import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Accordion, Form} from "react-bootstrap";
import {useUserDetails} from "../../../../utils/providers/UserDetailsProvider.tsx";

export const FirmData:FC = () => {
    const {t} = useTranslation();
    const {userDetails, handleChange} = useUserDetails();

    if (userDetails !== null) {
        return (
            <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t("Firm")}</Accordion.Header>
                    <Accordion.Body>

                    <Form>
                        <Form.Group controlId="firmName">
                            <Form.Label>{t("Firm name")}</Form.Label>
                            <Form.Control
                                type="text"
                                name="firm_name"
                                value={userDetails.firm_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="firmId">
                            <Form.Label>{t("Firm id")}</Form.Label>
                            <Form.Control
                                type="text"
                                name="firm_id"
                                value={userDetails.firm_id}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="firmVat">
                            <Form.Label>{t("Firm VAT")}</Form.Label>
                            <Form.Control
                                type="text"
                                name="firm_vat"
                                value={userDetails.firm_vat}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}
