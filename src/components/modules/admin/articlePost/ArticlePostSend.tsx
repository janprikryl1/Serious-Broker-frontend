import {FC} from "react";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";
import {useNavigate} from "react-router-dom";

export const ArticlePostSend:FC = () => {
    const {t} = useTranslation();
    const {uploadPost, postId} = usePostEdit();
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }
    
    return (
        <>
            {postId === undefined ? (
                <Button variant="outline-warning" onClick={uploadPost}>{t("Publish")}</Button>
            ) : (
                <Button variant="outline-danger" onClick={goBack}>{t("Back")}</Button>
            )}
        </>
    );
};