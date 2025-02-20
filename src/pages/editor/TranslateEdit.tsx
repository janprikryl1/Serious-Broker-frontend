import {FC} from "react";
import {ArticleTranslateProvider} from "../../utils/providers/ArticleTranslateProvider.tsx";
import {NewTranslationPagesTitleDescriptionLanguage} from "../../components/admin/translations/NewTranslationPagesTitleDescriptionLanguage.tsx";
import {NewTranslationContent} from "../../components/admin/translations/NewTranslationContent.tsx";
import {TranslateUpdateButton} from "../../components/admin/translations/TranslateUpdateButton.tsx";

export const TranslateEdit:FC = () => {
    return (
        <ArticleTranslateProvider>
            <div className="admin-container">
                <NewTranslationPagesTitleDescriptionLanguage />
                <NewTranslationContent />
                <TranslateUpdateButton />
            </div>
        </ArticleTranslateProvider>
)
};