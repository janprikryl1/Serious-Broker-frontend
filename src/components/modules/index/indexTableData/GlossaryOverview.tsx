import {FC} from "react";
import {TableTemplate} from "../../TableTemplate.tsx";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {glossaryImagesURL, routes} from "../../../../utils/constants";

export const GlossaryOverview:FC = () => {
    const {data} = useIndexDataContext();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const title = currentLang === 'cs' ? data.DYOR.title_cs : data.DYOR.title;
    const answer = currentLang === 'cs' ? data.DYOR.answer_cs : data.DYOR.answer;

    return (
        <TableTemplate title="Overview of glossary of terms">
            <h2>{title}</h2>
            <p style={{ marginLeft: 10 }}>"{answer}"</p>
            {data.DYOR.image && <img src={`${glossaryImagesURL}${data.DYOR.image}`} style={{ width: 250 }} alt="DYOR" />}
            <br />
            <Link to={routes.dictionary} className="text-decoration-none">
                {t("Interested in more?")}
            </Link>
        </TableTemplate>
    );
};