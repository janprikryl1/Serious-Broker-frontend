import { FC } from "react";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import {FaRegTrashAlt} from "react-icons/fa";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

type Props = {
    handleFileChange: (id: number, file: File | null) => void;
    handleSubmit: (id: number) => void;
    rowId: number;
    handleDelete: (id: number) => void;
};

export const CryptoCurrencyFileUpload: FC<Props> = ({ handleFileChange, handleSubmit, rowId, handleDelete }) => {
    const { t } = useTranslation();

    return (
        <Form.Group className="crypto-currency-upload-file-section">
            <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(rowId, (e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files![0] : null)}
            />
            <Button
                onClick={() => handleSubmit(rowId)}
            >
                {t("Upload")}
            </Button>
            <Button
                color={ButtonColor.red}
                onClick={() => handleDelete(rowId)}
            >
                <FaRegTrashAlt />
            </Button>
        </Form.Group>
    );
};
