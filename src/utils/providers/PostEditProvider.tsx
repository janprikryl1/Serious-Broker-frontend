import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {ArticlePost} from "../types/ArticlePostListResponse.ts";
import {createPost, getArticlePostDetail} from "../../api/articlePostService.ts";
import {PostOptionType} from "../options/PostOption.ts";

type Props = {
    children: ReactNode;
}

type PostProviderProps = {
    type: PostOptionType;
    setType: Dispatch<SetStateAction<PostOptionType>>;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    articleIdParam: string | undefined;
    postId: string | undefined;
    uploadPost: () => void;
}

const PostEditContext = React.createContext<PostProviderProps | undefined>(undefined);

export const PostEditProvider = ({children}: Props) => {
    const {articleId, id} = useParams();
    const {t} = useTranslation();
    const [articleIdParam, setArticleIdParam] = useState<string>();
    const [postId, setPostId] = useState<string>();
    const [type, setType] = useState<PostOptionType>("Facebook");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("cs");
    const [content, setContent] = useState<string>("");
    const [saved, setSaved] = useState(false);

    const getEditedPost = async () => {
        if (id === undefined) return;
        const response = await getArticlePostDetail(id);
        if (!response) return;
        setArticleIdParam(response.data.article_id);
        setPostId(response.data.id);
        setType(response.data.type as PostOptionType);
        setLanguage(response.data.language);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setContent(response.data.content);
    }
    
    useEffect(() => {
        getEditedPost();
    }, [id, articleId]);

    useEffect(() => {
        setSaved(false);
    }, [title,
        description,
        language,
        content,
    ]);

    const uploadNewPost = async () => {
        if (!articleId || !type || !content) return;
        const post: ArticlePost = {
            article_id: articleId,
            type: type,
            language: language,
            title: title,
            description: description,
            content: content,
        };
        try {
            const response = await createPost(post);
            if (response !== undefined && response.data.message === "Post created successfully") {
                setPostId(response.data.translateId);
                Swal.fire({
                    icon: "success",
                    title: t("Post created"),
                    text: t("Post created"),
                });
            }
            setSaved(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while creating post"),
            });
            console.error(error);
        }
    }
    
    const uploadPost = () => {
        if (postId === undefined) {
            uploadNewPost();
        }
    }

    const value = {
        type,
        setType,
        title,
        setTitle,
        description,
        setDescription,
        language,
        setLanguage,
        content,
        setContent,
        uploadPost,
        saved,
        setSaved,
        articleIdParam,
        postId,
    }

    return (
        <PostEditContext.Provider value={value}>{children}</PostEditContext.Provider>
    )
}

export const usePostEdit = () => {
    const context = useContext(PostEditContext);
    if (context === undefined) {
        throw new Error("usePostEdit must be used within a PostEditProvider");
    }
    return context;
}
