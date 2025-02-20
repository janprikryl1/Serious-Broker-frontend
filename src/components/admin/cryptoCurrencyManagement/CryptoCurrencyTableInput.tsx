import {FC} from "react";
import Form from "react-bootstrap/Form";

type Props = {
    id: number;
    value?: string;
    field: 'name' | 'symbol';
    onChange: (id: number, value: string, field: 'name' | 'symbol') => void;
}

export const CryptoCurrencyTableInput:FC<Props> = ({id, value = "", onChange, field}) => {
    return (
        <Form.Control
            style={{ marginTop:5, height: 40 }}
            value={value}
            onChange={(e) => onChange(id, e.target.value, field)}
        />
    );
};