import {FC} from "react";
import {HighlightProvider} from "../../utils/providers/HighlightProvider.tsx";
import {useTranslation} from "react-i18next";
import {HighlightContentEdit} from "../../components/editor/highlights/HighlightContentEdit.tsx";

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