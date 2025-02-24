import {FC} from "react";
import {InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ListFilesModal} from "../imageUpload/ListFilesModal.tsx";
import {useArticleCreate} from "../../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {useModal} from "../../../../../../../utils/hooks/useModal.tsx";
import {Button} from "../../../../../../reusable/Button.tsx";
import {imageURL} from "../../../../../../../utils/constants";

export const TitleImage:FC = () => {
    const {t} = useTranslation();
    const {titleImage, setTitleImage} = useArticleCreate();
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