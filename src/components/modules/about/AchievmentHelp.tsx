import {FC} from "react";
import {useTranslation} from "react-i18next";
import {ListGroup} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';

export const AchievmentHelp:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
            <h2>{t("Achievement help")}</h2>
            
                <p>{t("You can earn achievements by:")}</p>
                <ListGroup as="ol" numbered>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{t("Verifing account")}</div>
                            {t("Verified accounts are real humans")}
                        </div>
                        <Badge bg="primary" pill>
                            1
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{t("Posting first comment")}</div>
                        </div>
                        <Badge bg="primary" pill>
                            1
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{t("Being here for one, tree months")}</div>
                            {t("Being our loyal user (half year and every year)")}
                        </div>
                        <Badge bg="primary" pill>
                            &#8734;
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
        </div>
    );
}