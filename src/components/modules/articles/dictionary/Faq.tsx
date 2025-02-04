import {FC} from "react";
import {Accordion} from "react-bootstrap";
import {serviceFaqData} from "../../../../utils/constants/FAQData.ts";
import {useTranslation} from "react-i18next";

export const Faq:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div
            className="mt-55"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="faq">
                <h1>FAQ</h1>
                    <Accordion className="accordion--style1" defaultActiveKey="">
                        <div className="row">
                            {serviceFaqData.map((data, index) => (
                                <div className="col-12" key={index}>
                                    <Accordion.Item style={{border:"none", background: "transparent"}} eventKey={index.toString()}>
                                        <Accordion.Button className="accordion__button--style2">
                                            <span className="accordion__button-content">
                                                {t(data.question)}
                                            </span>
                                        </Accordion.Button>
                                        <Accordion.Body className="accordion__body">
                                            {t(data.answer)}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                </div>
        </div>
    );
};