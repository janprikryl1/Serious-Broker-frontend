import { Dispatch, FC, SetStateAction } from "react";
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import {useTranslation} from "react-i18next";

type Props = {
    showCategory: boolean;
    setShowCategory: Dispatch<SetStateAction<boolean>>;
};

export const CryptoCurrencyViewSwitch: FC<Props> = ({ showCategory, setShowCategory }) => {
    const {t} = useTranslation();
    
    return (
        <Row className="justify-content-center align-items-center">
            <Col xs="auto">
                <Form.Check
                    type="switch"
                    id="category-switch"
                    label={t("Show categories")}
                    onChange={() => setShowCategory(!showCategory)}
                    checked={showCategory}
                />
            </Col>
        </Row>
    );
};
