import {FC} from "react";
import {ButtonToolbar} from "react-bootstrap";
import {ArticleCreateProvider} from "../../utils/providers/ArticleCreateProvider.tsx";
import {NewArticlePages} from "../../components/modules/admin/userManagment/newArticle/newArticlePages/NewArticlePages.tsx";
import {NewPage} from "../../components/modules/admin/userManagment/newArticle/newArticleButtons/NewArticleNewtPage.tsx";
import {NewArticleUploadButton} from "../../components/modules/admin/userManagment/newArticle/newArticleButtons/NewArticleUploadButton.tsx";

export const EditArticle:FC = () => {
    return (
        <ArticleCreateProvider>
            <div className="container">
                <NewArticlePages />
                <ButtonToolbar>
                    <NewPage />
                    <NewArticleUploadButton />
                </ButtonToolbar>
            </div>
        </ArticleCreateProvider>
    )
}