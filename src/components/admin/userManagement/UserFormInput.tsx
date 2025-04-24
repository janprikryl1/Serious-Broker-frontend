import {ChangeEvent, FC} from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type UserFormInputProps = {
    label: string;
    value: string | number | null | undefined;
    readOnly?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UserFormInput: FC<UserFormInputProps> = ({ label, value, readOnly = false, onChange }) => {
    const { t } = useTranslation();
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t(label)}</InputGroup.Text>
            <Form.Control placeholder={t(label)} value={value ?? ""} readOnly={readOnly} onChange={onChange} />
        </InputGroup>
    );
};
