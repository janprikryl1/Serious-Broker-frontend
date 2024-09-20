import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";

export const TitleField = () => {
    const { t } = useTranslation();
    const { content, currentContent, setContent } = useArticleCreate();

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
            </InputGroup>
        </>
    )
}