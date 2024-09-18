/*import React, {ChangeEvent, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {articlesURL, createArticleAPI} from "../constants";
import {createArticle} from "../../api/articleService";
import {ArticleCreateProps} from "../types/article/ArticleProps";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

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
    allowComments: boolean;
    setAllowedComments: Dispatch<SetStateAction<boolean>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    subject: string;
    setSubject: Dispatch<SetStateAction<string>>;
    uploadArticle: () => void;
    nextPage: () => void;
}

const ArticleCreateContext = React.createContext<ArticleCreateProviderProps | undefined>(undefined);

export const ArticleCreateProvider = ({children}: Props) => {
    const navigate = useNavigate();
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
    const [allowComments, setAllowedComments] = useState(false);
    const [content, setContent] = useState("");
    const [subject, setSubject] = useState("");

    const nextPage = () => {
        if (page === 0) setPage(1);
        else setPage(0);
    }

    const uploadArticle = async () => {
        /*fetch(createArticleAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //author_id: 1,
                language: language,
                title: name,
                description: description,
                allowComments: allowComments,
                premiumOnly: premiumOnly,
                tmplateId: template,
                publicationType: publicationType,
                publicationFrom: publicateFrom,
                content: content,
                subjects: subject,
                publicatonTo: publicateTo,
                publicationFromDays: publicateFromDays
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));*/
    /*    const article: ArticleCreateProps = {
            language: language,
            title: name,
            description: description,
            allowComments: allowComments,
            premiumOnly: premiumOnly,
            tmplateId: template,
            publicationType: publicationType,
            publicationFrom: publicateFrom,
            content: content,
            subjects: subject,
            publicatonTo: publicateTo,
            publicationFromDays: publicateFromDays
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
                navigate(articlesURL + "/" + response.data.id);
            }
        } catch (error) {
            {
                Swal.fire({
                    icon: "error",
                    title: t("Error"),
                    text: t("Error while creating article"),
                });
            }
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
        allowComments,
        setAllowedComments,
        content,
        setContent,
        subject,
        setSubject,
        uploadArticle,
        nextPage
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
*/