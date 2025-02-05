import {FC} from "react";
import {useTranslation} from "react-i18next";
import {usePostEdit} from "../../../../utils/providers/PostEditProvider.tsx";
import {useNavigate} from "react-router-dom";
import {Button, ButtonColor} from "../../../Button.tsx";

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
                <>
                    <Button style={{marginRight:20}} onClick={uploadPost}>{t("Publish")}</Button>
                    <Button color={ButtonColor.red} onClick={goBack}>{t("Back")}</Button>
                </>
            ) : (
                <Button color={ButtonColor.gray} onClick={goBack}>{t("Back")}</Button>
            )}
        </>
    );
};