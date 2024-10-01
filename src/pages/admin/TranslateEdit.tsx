import {FC} from "react";
import {ArticleTranslateProvider} from "../../utils/providers/ArticleTranslateProvider.tsx";
import {ButtonToolbar} from "react-bootstrap";
import {TranslateUpdateButton} from "../../components/modules/admin/translations/TranslateUpdateButton.tsx";
import {NewTranslationContent} from "../../components/modules/admin/translations/NewTranslationContent.tsx";
import {NewTranslationPagesTitleDescriptionLanguage} from "../../components/modules/admin/translations/NewTranslationPagesTitleDescriptionLanguage.tsx";

export const TranslateEdit:FC = () => {
    return (
        <ArticleTranslateProvider>
            <div className="container">
                <NewTranslationPagesTitleDescriptionLanguage />
                <NewTranslationContent />
                <ButtonToolbar>
                    <TranslateUpdateButton />
                </ButtonToolbar>
            </div>
        </ArticleTranslateProvider>
)
};