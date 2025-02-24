import {FC} from "react";
import {ButtonToolbar} from "react-bootstrap";
import {ArticleCreateProvider} from "../../utils/providers/ArticleCreateProvider.tsx";
import {NewArticlePages} from "../../components/editor/articleManagement/newArticle/newArticlePages/NewArticlePages.tsx";
import {NewPage} from "../../components/editor/articleManagement/newArticle/newArticleButtons/NewArticleNewtPage.tsx";
import {NewArticleUploadButton} from "../../components/editor/articleManagement/newArticle/newArticleButtons/NewArticleUploadButton.tsx";

export const EditArticle:FC = () => {
    return (
        <ArticleCreateProvider>
            <div className="admin-container">
                <NewArticlePages />
                <ButtonToolbar>
                    <NewPage />
                    <NewArticleUploadButton />
                </ButtonToolbar>
            </div>
        </ArticleCreateProvider>
    )
}