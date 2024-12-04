import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    addNewMembership: (price: number, dateTimeEnd: string) => void;
    selectedPrice?: number;
    selectedDateTimeEnd?: string;
};

export const NewMembership: FC<Props> = ({ addNewMembership, selectedPrice = 0, selectedDateTimeEnd = "" }) => {
    const { t } = useTranslation();
    const [price, setPrice] = useState<number>(selectedPrice);
    const [dateTimeEnd, setDateTimeEnd] = useState<string>(selectedDateTimeEnd.substring(0, 10));

    const handleSaveNewMembership = async () => {
        addNewMembership(price, dateTimeEnd);
    };

    return (
        <Form className="mb-3">
            <Form.Group controlId="price">
                <Form.Label>{t("Price")}</Form.Label>
                <Form.Control
                    type="number"
                    placeholder={t("Price")}
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </Form.Group>

            <Form.Group controlId="date_time_end" className="mt-2">
                <Form.Label>{t("Date time end")}</Form.Label>
                <Form.Control
                    type="date"
                    placeholder={t("Date time end")}
                    value={dateTimeEnd}
                    onChange={(e) => setDateTimeEnd(e.target.value)}
                />
            </Form.Group>

            <Button variant="outline-warning" className="mt-3" onClick={handleSaveNewMembership}>
                {t("Save")}
            </Button>
        </Form>
    );
};