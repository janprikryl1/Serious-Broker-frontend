import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";

export const ArticlePostDescription:FC = () => {
    const {t} = useTranslation();
    const {description, setDescription, postId} = usePostEdit();
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t("Description")}</InputGroup.Text>
            <Form.Control
                placeholder={`${t("Description")}...`}
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                disabled={postId !== undefined}
            />
        </InputGroup>
    );
};