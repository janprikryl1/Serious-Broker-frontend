import {ChangeEventHandler, FC} from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type UserFormInputProps = {
    label: string;
    value: boolean;
    readOnly?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const UserFormCheck: FC<UserFormInputProps> = ({ label, value, readOnly = false, onChange }) => {
    const { t } = useTranslation();
    return (
        <div className="row">
            <div className="col-md-3 text-white">
                <h3>{t(label)}</h3>
            </div>
            <div className="col-md-2">
                <Form.Check type="switch" checked={value} readOnly={readOnly} onChange={onChange}/>
            </div>
    </div>
);
};
