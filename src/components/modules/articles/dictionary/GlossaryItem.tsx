import { FC } from "react";
import { GlossaryType } from "../../../../utils/types/GlossaryType";
import { useTranslation } from "react-i18next";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";
import {glossaryImagesURL} from "../../../../utils/constants";

type Props = {
    glossary: GlossaryType;
};

export const GlossaryItem: FC<Props> = ({ glossary }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    
    const title = currentLang === 'cs' ? glossary.title_cs : glossary.title;
    const answer = currentLang === 'cs' ? glossary.answer_cs : glossary.answer;

    return (
        <div className="blog__writer" style={{ marginTop: 50 }} id={glossary.title}>
            <div className="blog__writer-designation">
                <TypographyWithPopover popover={glossary.image ? <img src={`${glossaryImagesURL}${glossary.image}`} alt={title} style={{width:"300px"}}/> : title}>
                    <p>
                        {title}
                        <span style={{ marginLeft: 10 }}>{answer}</span>
                    </p>
                </TypographyWithPopover>
            </div>
        </div>
    );
};
