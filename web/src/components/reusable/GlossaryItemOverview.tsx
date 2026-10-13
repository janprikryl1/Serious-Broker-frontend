import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {TableTemplate} from "./TableTemplate.tsx";
import {glossaryImagesURL, routes} from "../../utils/constants";
import {GlossaryType} from "../../utils/types/article/GlossaryType.ts";

type Props = {
    data: GlossaryType;
}

export const GlossaryItemOverview:FC<Props> = ({data}) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const title = currentLang === 'cs' ? data.title_cs : data.title;
    const answer = currentLang === 'cs' ? data.answer_cs : data.answer;
    
    return (
        <TableTemplate title="Overview of glossary of terms">
            <h2>{title}</h2>
            <p style={{ marginLeft: 10 }}>"{answer}"</p>
            {data.image && <img src={`${glossaryImagesURL}${data.image}`} style={{ width: 250 }} alt="DYOR" />}
            <br />
            <Link to={routes.dictionary} className="text-decoration-none">
                {t("Interested in more?")}
            </Link>
        </TableTemplate>
    )
}