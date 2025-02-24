import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";

export const ArticlePostContent:FC = () => {
    const {t} = useTranslation();
    const {content, setContent, postId} = usePostEdit();
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t("Content")}</InputGroup.Text>
            <Form.Control 
                placeholder={`${t("Content")}...`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={postId !== undefined}
            />
        </InputGroup>
    );
};