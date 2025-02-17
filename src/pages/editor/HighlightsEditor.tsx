import {FC} from "react";
import {HighlightProvider} from "../../utils/providers/HighlightProvider.tsx";
import {HighlightContentEdit} from "../../components/modules/highlights/HighlightContentEdit.tsx";
import {useTranslation} from "react-i18next";

export const HighlightsEditor:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="container">
            <HighlightProvider>
                <h2 className="title-serious-broker">{t("Highlights Editor")}</h2>
                <HighlightContentEdit />
            </HighlightProvider>
        </div>
    );
};