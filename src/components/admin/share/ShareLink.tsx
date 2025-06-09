import {ChangeEvent, FC, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {FaCopy} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {ArticleSendEmailComponent} from "./ArticleSendEmailComponent.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {domain} from "../../../utils/constants";
import {Button} from "../../reusable/Button.tsx";

type Props = {
    id: string;
    languages: string[];
}

export const ShareLink:FC<Props> = ({id, languages}) => {
    const {t} = useTranslation();
    const [url, setUrl] = useState(`${domain}/article/${id}`);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    
    const copyLink = () => {
        navigator.clipboard.writeText(url);    
        toast.success(t("Link copied to clipboard"));
    }
    
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
        if (e.target.value === languages[0]) {
            setUrl(`${domain}/article/${id}`);
            return;
        }
        setUrl(`${domain}/article/${id}/${e.target.value}`);
    }
    
    return (
        <>
            <Form.Label htmlFor="basic-url">{t("Share link")}</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Language")}</InputGroup.Text>
                <Form.Select value={selectedLanguage} onChange={handleLanguageChange} style={{maxWidth: "200px"}}>
                    {languages.map((language) => (
                        <option value={language} key={language}>{language}</option>
                    ))}
                </Form.Select>
                <InputGroup.Text> <a href={url} target="_blank"
                                     rel="noreferrer" className="link-underline-none">{url}</a>
                </InputGroup.Text>
                <Button onClick={copyLink}>
                    <FaCopy />
                </Button>
            </InputGroup>
            <ArticleSendEmailComponent url={url}/>
        </>
    );
}