import {FC} from 'react';
import {useTranslation} from "react-i18next";
import HeaderImage from "../../utils/icons/cta/sticks_graph.webp";
import {coinURL} from "../../utils/constants";

type Props = {
    title: string;
    title2?: string;
    text?: string;
    img?: string;
};

export const TitleHeader: FC<Props> = ({title, title2 = "", text = "", img = ""}) => {
    const {t} = useTranslation();

    return (
        <section className="container tw-my-6 tw-pt-12">
            <div
                data-aos="fade-right"
                data-aos-duration="1000"
            >

                <div style={{display: "flex", gap: "20px", alignItems: "baseline"}}>
                    <h3>{t(title)}</h3>
                    {title2 && <h2 className={"secondary-title"}>{title2}</h2>}
                </div>
                {text ? <small>{t(text)}</small> : null}
            </div>
        </section>
    );
};