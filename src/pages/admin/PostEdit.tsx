import {PostEditProvider} from "../../utils/providers/PostEditProvider.tsx";
import {ArticlePostType} from "../../components/modules/admin/articlePost/ArticlePostType.tsx";
import {useTranslation} from "react-i18next";
import {ArticlePostLanguage} from "../../components/modules/admin/articlePost/ArticlePostLanguage.tsx";
import {ArticlePostTitle} from "../../components/modules/admin/articlePost/ArticlePostTitle.tsx";
import {ArticlePostDescription} from "../../components/modules/admin/articlePost/ArticlePostDescription.tsx";
import {ArticlePostContent} from "../../components/modules/admin/articlePost/ArticlePostContent.tsx";
import {ArticlePostSend} from "../../components/modules/admin/articlePost/ArticlePostSend.tsx";

export const PostEdit = () => {
    const {t} = useTranslation();
    
    return (
        <PostEditProvider>
            <h1>{t("Post to social media")}</h1>
            <ArticlePostType />
            <ArticlePostLanguage />
            <ArticlePostTitle />
            <ArticlePostDescription />
            <ArticlePostContent />
            <ArticlePostSend />
        </PostEditProvider>
    )
}