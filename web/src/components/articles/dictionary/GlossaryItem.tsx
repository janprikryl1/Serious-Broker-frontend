import { FC } from "react";
import { useTranslation } from "react-i18next";
import {TypographyWithPopover} from "../../reusable/TypographyWithPopover.tsx";
import {glossaryImagesURL} from "../../../utils/constants";
import {GlossaryType} from "../../../utils/types/article/GlossaryType.ts";

type Props = {
    glossary: GlossaryType;
};

export const GlossaryItem: FC<Props> = ({ glossary }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    
    const title = currentLang === 'cs' ? glossary.title_cs : glossary.title;
    const answer = currentLang === 'cs' ? glossary.answer_cs : glossary.answer;

    return (
        <div className="" id={glossary.title}>
            <p>
                <span className="tw-text-secondary tw-text-bold tw-text-xl">{title}</span>
                <span className="tw-ml-6">{answer}</span>
            </p>
        </div>
    );
};
