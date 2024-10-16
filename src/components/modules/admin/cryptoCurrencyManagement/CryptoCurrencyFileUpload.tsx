import { FC } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    handleFileChange: (id: number, file: File | null) => void;
    handleSubmit: (id: number) => void;
    rowId: number;
};

export const CryptoCurrencyFileUpload: FC<Props> = ({ handleFileChange, handleSubmit, rowId }) => {
    const { t } = useTranslation();

    return (
        <Form.Group style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 5 }}>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(rowId, (e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files![0] : null)}
            />
            <Button
                variant="warning"
                onClick={() => handleSubmit(rowId)}
            >
                {t("Upload")}
            </Button>
        </Form.Group>
    );
};
