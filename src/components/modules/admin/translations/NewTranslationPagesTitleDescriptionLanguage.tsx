import {Dispatch, FC, SetStateAction} from "react";
import {useArticleTranslate} from "../../../../utils/providers/ArticleTranslateProvider.tsx";
import {Form, InputGroup} from "react-bootstrap";
import {languages} from "../../../../utils/options/languages.ts";
import {useTranslation} from "react-i18next";
import {Button} from "../../../Button.tsx";
import {translate} from "../../../../utils/api/translateService.ts";

export const NewTranslationPagesTitleDescriptionLanguage:FC = () => {
    const {t} = useTranslation();
    const {setName, 
        name, 
        description, 
        setDescription,
        language,
        setLanguage} = useArticleTranslate();
    
    const handleTranslate = async (text: string, setter: Dispatch<SetStateAction<string>>) => {
        const response = await translate(text, language);
        if (!response) return;
        setter(response.data.translated_text);
    }

    return (
        <div>
            <h1 className="admin-section-title">{t("Translate")}</h1>
            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Title")}</InputGroup.Text>
                <Form.Control placeholder={t("How to buy Bitcoin...")} value={name}
                              onChange={(e) => setName(e.target.value)}/>
                <Button onClick={() => handleTranslate(name, setName)}>{t("Translate")}</Button>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Description")}</InputGroup.Text>
                <Form.Control as="textarea" placeholder={t("This article will be about...")} value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                <Button onClick={() => handleTranslate(description, setDescription)}>{t("Translate")}</Button>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Language")}</InputGroup.Text>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    {languages.map((language) => (
                        <option value={language.id} key={language.id}>{language.name}</option>
                    ))}
                </Form.Select>
            </InputGroup>
        </div>
    )
}
