import {FC} from "react";
import {InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useArticleTranslate} from "../../../../../../utils/providers/ArticleTranslateProvider.tsx";
import {useModal} from "../../../../../../utils/hooks/useModal.tsx";
import {ListFilesModal} from "../../../articleManagement/newArticle/newArticlePages/NewArticleContentVariants/imageUpload/ListFilesModal.tsx";
import {imageURL} from "../../../../../../utils/constants";

export const TranslationTitleImage:FC = () => {
    const {t} = useTranslation();
    const {titleImage, setTitleImage} = useArticleTranslate();
    const { isOpen: isFileModalOpen, openModal: openFileModal, closeModal: closeFileModal } = useModal();

    const handleSetPathOfImage = (path: string) => {
        setTitleImage(path);
        closeFileModal();
    };

    return (
        <>
            <ListFilesModal
                isOpen={isFileModalOpen}
                handleSetPath={handleSetPathOfImage}
                handleModalClose={closeFileModal}
            />
            <InputGroup className="mb-3">
                <InputGroup.Text>{t("Title image")}</InputGroup.Text>
                <Button onClick={openFileModal}>
                    {titleImage || t("Choose image")}
                </Button>
            </InputGroup>
            {titleImage && <img src={`${imageURL}${titleImage}`} alt="title image" className="img-fluid"/>}
        </>
    )
}