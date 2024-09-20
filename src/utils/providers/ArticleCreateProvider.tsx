import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {createArticle, getArticleByIdAdmin, updateArticle} from "../../api/articleService";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {ArticleCreateProps} from "../types/article/ArticleCreateProps.ts";
import {SubjectType} from "../types/article/SubjectType.ts";
import {ContentType} from "../types/article/ContentType.ts";
import {useParams} from "react-router-dom";
import {ArticleUpdateType} from "../types/article/ArticleUpdateType.ts";

type Props = {
    children: ReactNode;
}

type ArticleCreateProviderProps = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    template: string;
    setTemplate: Dispatch<SetStateAction<string>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    articleTypeOption: "article" | "new";
    setArticleTypeOption: Dispatch<SetStateAction<"article" | "new">>;
    publicationType: number;
    setPublicationType: Dispatch<SetStateAction<number>>;
    publicateFrom: string;
    publicateTo: string;
    setPublicateFromDays: Dispatch<SetStateAction<number | null>>;
    setPublicateTo: Dispatch<SetStateAction<string>>;
    publicateFromDays: number | null;
    setPublicateFrom: Dispatch<SetStateAction<string>>;
    premiumOnly: boolean;
    setPremiumOnly: Dispatch<SetStateAction<boolean>>;
    content: ContentType[];
    setContent: Dispatch<SetStateAction<ContentType[]>>;
    subjects: SubjectType[];
    setSubjects: Dispatch<SetStateAction<SubjectType[]>>;
    uploadArticle: () => void;
    nextPage: () => void;
    currentContent: number;
    setCurrentContent: Dispatch<SetStateAction<number>>;
    saved: boolean;
    setSaved: Dispatch<SetStateAction<boolean>>;
    titleImage: string;
    setTitleImage: Dispatch<SetStateAction<string>>;
    allowComments: boolean;
    setAllowComments: Dispatch<SetStateAction<boolean>>;
}

const ArticleCreateContext = React.createContext<ArticleCreateProviderProps | undefined>(undefined);

export const ArticleCreateProvider = ({children}: Props) => {
    const {id} = useParams();
    //const navigate = useNavigate();
    const {t} = useTranslation();
    const [articleId, setArticleId] = useState<number>();
    const [page, setPage] = useState(0);
    const [template, setTemplate] = useState("0");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("cs");
    const [articleTypeOption, setArticleTypeOption] = useState<"article" | "new">("article");
    const [publicationType, setPublicationType] = useState(0);
    const [publicateFrom, setPublicateFrom] = useState("");
    const [publicateTo, setPublicateTo] = useState("");
    const [publicateFromDays, setPublicateFromDays] = useState<number | null>(null);
    const [premiumOnly, setPremiumOnly] = useState(false);
    const [allowComments, setAllowComments] = useState(true);
    const [titleImage, setTitleImage] = useState("");
    const [content, setContent] = useState<ContentType[]>([{id: 0, title: "", tasks: [{id: 0, task: "", image: "", animateTo: {from: {x: 0, y: 0}, to: {x: 0, y: 0}}}]}]);
    const [subjects, setSubjects] = useState<SubjectType[]>([{id: 0, title: "", text: ""}]);
    const [currentContent, setCurrentContent] = useState(0);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (id !== undefined) {
            const getEditedArticle = async () => {
                const response = await getArticleByIdAdmin(id);
                if (!response) return;
                setArticleId(response.data.id);
                setName(response.data.title);
                setDescription(response.data.description);
                setLanguage(response.data.language);
                setArticleTypeOption(response.data.articleTypeOption as "article" | "new");
                setPublicationType(response.data.publicationType);
                setPublicateFrom(response.data.publicationFrom);
                setPublicateTo(response.data.publicationTo);
                setPublicateFromDays(response.data.publicationFromDays);
                setPremiumOnly(response.data.premiumOnly !== "0");
                setAllowComments(response.data.allowComments !== "0");
                setContent(JSON.parse(response.data.content));
                setSubjects(JSON.parse(response.data.subjects));
                setTitleImage(response.data.titleImage);
                setTemplate(response.data.templateId);
                setCurrentContent(0);
            }
            getEditedArticle();
        }
    }, [id]);

    useEffect(() => {
        setSaved(false);
    }, [name,
        description,
        language,
        articleTypeOption,
        publicationType,
        publicateFrom,
        publicateTo,
        publicateFromDays,
        premiumOnly,
        content,
        subjects,
        titleImage, 
        template,
        allowComments
    ]);
    
    const nextPage = () => {
        if (page === 0) setPage(1);
        else setPage(0);
    }
    
    const uploadNewArticle = async () => {
        const article: ArticleCreateProps = {
            language: language,
            title: name,
            description: description,
            premiumOnly: premiumOnly,
            templateId: template,
            publicationType: publicationType,
            publicationFrom: publicateFrom,
            content: JSON.stringify(content),
            subjects: JSON.stringify(subjects),
            publicationTo: publicateTo,
            publicationFromDays: publicateFromDays,
            allowComments: allowComments,
            titleImage: titleImage,
            articleTypeOption: articleTypeOption
        };
        try {
            const response = await createArticle(article);
            if (response !== undefined && response.data.message === "Article created successfully") {
                setArticleId(response.data.article_id);
                Swal.fire({
                    icon: "success",
                    title: t("Article created"),
                    text: t("Article created"),
                });
            }
            setSaved(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while creating article"),
            });
            console.error(error);
        }
    }
    
    const updateEditedArticle = async () => {
        const article: ArticleUpdateType = {
            id: articleId!,
            language: language,
            title: name,
            description: description,
            premiumOnly: premiumOnly,
            templateId: template,
            publicationType: publicationType,
            publicationFrom: publicateFrom,
            content: JSON.stringify(content),
            subjects: JSON.stringify(subjects),
            publicationTo: publicateTo,
            publicationFromDays: publicateFromDays,
            allowComments: allowComments,
            titleImage: titleImage,
            articleTypeOption: articleTypeOption
        };
        try {
            const response = await updateArticle(article);
            if (response !== undefined && response.data.message === "Article updated successfully") {
                Swal.fire({
                    icon: "success",
                    title: t("Article edited"),
                    text: t("Article edited successfully"),
                });
            }
            setSaved(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while editing article"),
            });
            console.error(error);
        }
    }

    const uploadArticle = () => {
        if (articleId !== undefined) {
            updateEditedArticle();
        } else {
            uploadNewArticle();
        }
    }
    
    const value = {
        page,
        setPage,
        template,
        setTemplate,
        name,
        setName,
        description,
        setDescription,
        language,
        setLanguage,
        articleTypeOption,
        setArticleTypeOption,
        publicationType,
        setPublicationType,
        publicateFrom,
        publicateTo,
        setPublicateFromDays,
        setPublicateTo,
        publicateFromDays,
        setPublicateFrom,
        premiumOnly,
        setPremiumOnly,
        content,
        setContent,
        subjects,
        setSubjects,
        uploadArticle,
        nextPage,
        currentContent,
        setCurrentContent,
        saved,
        setSaved,
        titleImage,
        setTitleImage,
        allowComments,
        setAllowComments,
    }

    return (
        <ArticleCreateContext.Provider value={value}>{children}</ArticleCreateContext.Provider>
    )
}

export const useArticleCreate = () => {
    const context = useContext(ArticleCreateContext);
    if (context === undefined) {
        throw new Error("useUserDetails must be used within a UserDetailsProvider");
    }
    return context;
}
