import {PostEditProvider} from "../../utils/providers/PostEditProvider.tsx";
import {useTranslation} from "react-i18next";
import {ArticlePostType} from "../../components/admin/articlePost/ArticlePostType.tsx";
import {ArticlePostLanguage} from "../../components/admin/articlePost/ArticlePostLanguage.tsx";
import {ArticlePostTitle} from "../../components/admin/articlePost/ArticlePostTitle.tsx";
import {ArticlePostDescription} from "../../components/admin/articlePost/ArticlePostDescription.tsx";
import {ArticlePostContent} from "../../components/admin/articlePost/ArticlePostContent.tsx";
import {ArticlePostSend} from "../../components/admin/articlePost/ArticlePostSend.tsx";

export const PostEdit = () => {
    const {t} = useTranslation();
    
    return (
        <div className="padding-bottom">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div
                            className="service-details__content"
                            data-aos="fade-up"
                            data-aos-duration="900"
                        >
                            <PostEditProvider>
                                <h1 className="admin-section-title">{t("Post to social media")}</h1>
                                <ArticlePostType />
                                <ArticlePostLanguage />
                                <ArticlePostTitle />
                                <ArticlePostDescription />
                                <ArticlePostContent />
                                <ArticlePostSend />
                            </PostEditProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}