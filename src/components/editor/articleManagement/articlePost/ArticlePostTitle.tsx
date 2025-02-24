import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";

export const ArticlePostTitle:FC = () => {
    const {t} = useTranslation();
    const {title, setTitle, postId} = usePostEdit();
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t("Title")}</InputGroup.Text>
            <Form.Control 
                placeholder={t("How to buy Bitcoin...")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={postId !== undefined}
            />
        </InputGroup>  
        );
};