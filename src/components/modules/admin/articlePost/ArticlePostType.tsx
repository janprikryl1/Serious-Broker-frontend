import {FC} from "react";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";
import {PostOption, PostOptionType} from "../../../../utils/options/PostOption.ts";
import {useTranslation} from "react-i18next";
import Form from 'react-bootstrap/Form';
import {InputGroup} from "react-bootstrap";


export const ArticlePostType:FC = () => {
    const {t} = useTranslation();
    const {type, setType, postId} = usePostEdit();
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>{t("Social media")}</InputGroup.Text>
            <Form.Select value={type} onChange={(e) => setType(e.target.value as PostOptionType)} disabled={postId !== undefined}>
                {PostOption.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}
            </Form.Select>
        </InputGroup>
    )
}