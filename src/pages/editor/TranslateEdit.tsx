import {FC} from "react";
import {ArticleTranslateProvider} from "../../utils/providers/ArticleTranslateProvider.tsx";
import {NewTranslationPagesTitleDescriptionLanguage} from "../../components/editor/articleManagement/articleTranslations/NewTranslationPagesTitleDescriptionLanguage.tsx";
import {NewTranslationContent} from "../../components/editor/articleManagement/articleTranslations/NewTranslationContent.tsx";
import {TranslateUpdateButton} from "../../components/editor/articleManagement/articleTranslations/TranslateUpdateButton.tsx";

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