import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {translate} from "../../../../../../utils/api/translateService.ts";
import {Button} from "../../../../../reusable/Button.tsx";

export const TranslateTextField = () => {
    const { t } = useTranslation();
    const { content, currentContent, setContent, language } = useArticleTranslate();

    const handleSetContentTitle = (value: string, contentIndex: number) => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === contentIndex) {
                    return { ...category, title: value };
                }
                return category;
            })
        );
    };
    
    const handleTranslateCurrentContentTitle = async () => {
        const currentContentTitle = content[currentContent].title;
        const response = await translate(currentContentTitle, language);
        if (!response) return;
        const translatedText = response.data.translated_text;
        handleSetContentTitle(translatedText, currentContent);
    }
    

    return (
        <>
            <h2>{t("Title")}</h2>
            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Category name")}</InputGroup.Text>
                <Form.Control
                    placeholder={t("Getting ready")}
                    value={content[currentContent].title}
                    onChange={(e) => handleSetContentTitle(e.target.value, currentContent)}
                />
                <Button onClick={handleTranslateCurrentContentTitle}>{t("Translate")}</Button>
            </InputGroup>
        </>
    )
}