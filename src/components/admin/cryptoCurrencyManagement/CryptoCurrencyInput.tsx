import {ChangeEvent, FC} from "react";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";

type Props = {
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
}

export const CryptoCurrencyInput:FC<Props> = ({name, value, onChange, placeholder, type = "text"}) => {
    const {t} = useTranslation();
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t(placeholder)}</InputGroup.Text>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={`${placeholder}...`}
            />
        </InputGroup>
    );
}