import React, { Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {createArticle} from "../../api/articleService";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {ArticleCreateProps} from "../types/article/ArticleCreateProps.ts";
import {SubjectType} from "../types/article/SubjectType.ts";
import {ContentType} from "../types/article/ContentType.ts";

type Props = {
    children: ReactNode;
}

type ArticleCreateProviderProps = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    template: number;
    setTemplate: Dispatch<SetStateAction<number>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    articleTypeOption: number;
    setArticleTypeOption: Dispatch<SetStateAction<number>>;
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
}

const ArticleCreateContext = React.createContext<ArticleCreateProviderProps | undefined>(undefined);

export const ArticleCreateProvider = ({children}: Props) => {
    //const navigate = useNavigate();
    const {t} = useTranslation();

    const [page, setPage] = useState(0);
    const [template, setTemplate] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("cs");
    const [articleTypeOption, setArticleTypeOption] = useState(0);
    const [publicationType, setPublicationType] = useState(0);
    const [publicateFrom, setPublicateFrom] = useState("");
    const [publicateTo, setPublicateTo] = useState("");
    const [publicateFromDays, setPublicateFromDays] = useState<number | null>(null);
    const [premiumOnly, setPremiumOnly] = useState(false);
    const [content, setContent] = useState<ContentType[]>([{id: 0, title: "", tasks: [{id: 0, task: "", image: "", animateTo: {from: {x: 0, y: 0}, to: {x: 0, y: 0}}}]}]);
    const [subjects, setSubjects] = useState<SubjectType[]>([{id: 0, title: "", text: ""}]);
    const [currentContent, setCurrentContent] = useState(0);
    const [saved, setSaved] = useState(false);

    const nextPage = () => {
        if (page === 0) setPage(1);
        else setPage(0);
    }

    const uploadArticle = async () => {
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
            allowComments: true
        };
        try {
            const response = await createArticle(article);
            console.log(response);
            if (response !== undefined) {
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
        console.log(article);
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
        setSaved
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
