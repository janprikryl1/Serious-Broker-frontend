import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {SubjectType} from "../types/article/SubjectType.ts";
import {ContentType} from "../types/article/ContentType.ts";
import {useParams} from "react-router-dom";
import {ArticleNewTranslateEditType, ArticleTranslateEditType} from "../types/article/translate/ArticleTranslateEditType.ts";
import {useTranslation} from "react-i18next";
import {createTranslation, getArticleTranslateByIdAdmin, updateTranslation} from "../api/translateService.ts";
import {getArticleByIdAdmin} from "../api/articleService.ts";
import {CustomSwal} from "../functions/customSwal.ts";

type Props = {
    children: ReactNode;
}

type ArticleTranslateProviderProps = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    content: ContentType[];
    setContent: Dispatch<SetStateAction<ContentType[]>>;
    subjects: SubjectType[];
    setSubjects: Dispatch<SetStateAction<SubjectType[]>>;
    uploadTranslate: () => void;
    currentContent: number;
    setCurrentContent: Dispatch<SetStateAction<number>>;
    saved: boolean;
    setSaved: Dispatch<SetStateAction<boolean>>;
    template: number;
    setTemplate: Dispatch<SetStateAction<number>>;
}

const ArticleTranslateContext = React.createContext<ArticleTranslateProviderProps | undefined>(undefined);

export const ArticleTranslateProvider = ({children}: Props) => {
    const {articleId, id} = useParams();
    const {t} = useTranslation();
    const [articleIdParam, setArticleIdParam] = useState<number>();
    const [translateId, setTranslateId] = useState<number>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("cs");
    const [content, setContent] = useState<ContentType[]>([{id: 0, title: "", tasks: [{id: 0, task: "", image: "", animateTo: {from: {x: 0, y: 0}, to: {x: 0, y: 0}}}]}]);
    const [subjects, setSubjects] = useState<SubjectType[]>([{id: 0, title: "", text: ""}]);
    const [currentContent, setCurrentContent] = useState(0);
    const [saved, setSaved] = useState(false);
    const [template, setTemplate] = useState(0);

    const getEditedTranslate = async () => {
        if (id === undefined) return;
        const response = await getArticleTranslateByIdAdmin(id);
        if (!response) return;
        setArticleIdParam(response.data.object_id);
        setTranslateId(response.data.id);
        setName(response.data.title);
        setDescription(response.data.description);
        setLanguage(response.data.language);
        setContent(response.data.content);
        setSubjects(response.data.subjects);
        setCurrentContent(0);
        setTemplate(response.data.templateId);
    }
    
    const loadArticleData = async () => {
        if (articleId === undefined) return;
        const response = await getArticleByIdAdmin(articleId);
        if (!response) return;
        setArticleIdParam(parseInt(articleId));
        setName(response.data.title);
        setDescription(response.data.description);
        setLanguage(response.data.language);
        setContent(response.data.content);
        setSubjects(response.data.subjects);
        setCurrentContent(0);
        setTemplate(response.data.templateId);
    }
    
    useEffect(() => {
        if (id !== undefined) {
            getEditedTranslate();
        } else {
            loadArticleData();
        }
    }, [id]);

    useEffect(() => {
        setSaved(false);
    }, [name,
        description,
        language,
        content,
        subjects,
    ]);

    const uploadNewTranslate = async () => {
        const article: ArticleNewTranslateEditType = {
            articleId: articleIdParam!,
            language: language,
            title: name,
            description: description,
            content: JSON.stringify(content),
            subjects: JSON.stringify(subjects),
        };
        try {
            const response = await createTranslation(article);
            if (response !== undefined && response.data.message === "Translate created successfully") {
                setTranslateId(response.data.translateId);
                CustomSwal.fire({
                    icon: "success",
                    title: t("Translation created"),
                    text: t("Translation created"),
                });
            }
            setSaved(true);
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while creating translation"),
            });
            console.error(error);
        }
    }

    const updateEditedTranslate = async () => {
        const article: ArticleTranslateEditType = {
            articleId: articleIdParam!,
            translateId: translateId!,
            language: language,
            title: name,
            description: description,
            content: JSON.stringify(content),
            subjects: JSON.stringify(subjects),
        };
        try {
            const response = await updateTranslation(article);
            if (response !== undefined && response.data.message === "Translate updated successfully") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Translation edited"),
                    text: t("Translation edited successfully"),
                });
            }
            setSaved(true);
        } catch (error) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while editing translation"),
            });
            console.error(error);
        }
    }

    const uploadTranslate = () => {
        if (translateId !== undefined) {
            updateEditedTranslate();
        } else {
            uploadNewTranslate();
        }
    }

    const value = {
        name,
        setName,
        description,
        setDescription,
        language,
        setLanguage,
        content,
        setContent,
        subjects,
        setSubjects,
        uploadTranslate,
        currentContent,
        setCurrentContent,
        saved,
        setSaved,
        template,
        setTemplate,
    }

    return (
        <ArticleTranslateContext.Provider value={value}>{children}</ArticleTranslateContext.Provider>
    )
}

export const useArticleTranslate = () => {
    const context = useContext(ArticleTranslateContext);
    if (context === undefined) {
        throw new Error("useUserDetails must be used within a UserDetailsProvider");
    }
    return context;
}
