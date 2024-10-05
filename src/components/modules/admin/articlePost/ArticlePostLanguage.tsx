import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {languages} from "../../../../utils/options/languages.ts";
import {useTranslation} from "react-i18next";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";

export const ArticlePostLanguage:FC = () => {
    const {t} = useTranslation();
    const {language, setLanguage, postId} = usePostEdit();
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t("Language")}</InputGroup.Text>
            <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={postId !== undefined}>
                {languages.map((language) => (
                    <option value={language.id} key={language.id}>{language.name}</option>
                ))}
            </Form.Select>
        </InputGroup>
    );
};