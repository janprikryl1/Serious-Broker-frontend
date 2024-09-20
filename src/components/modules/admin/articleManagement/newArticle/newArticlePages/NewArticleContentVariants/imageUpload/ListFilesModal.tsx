import {FC} from 'react';
import {useListFilesModal} from "../../../../../../../../utils/hooks/useListFilesModal.ts";
import {AddWidgetModalWrapper} from "./AddWidgetModalWrapper.tsx";
import {ListOfImagesAndDropZone} from "./ListOfImagesAndDropZone.tsx";
import {ListOfDroppedImages} from "./ListOfDroppedImages.tsx";


type Props = {
    isOpen: boolean;
    handleModalClose: () => void;
    handleSetPath: (path: string) => void;
}

export const ListFilesModal:FC<Props> = ({isOpen, handleModalClose, handleSetPath}) => {
    const {getRootProps, getInputProps, listOfImages, handleClickOnImage, acceptedFiles} = useListFilesModal(handleSetPath);

    return (
        <AddWidgetModalWrapper isOpen={isOpen} handleModalClose={handleModalClose}>
            <ListOfImagesAndDropZone getRootProps={getRootProps} getInputProps={getInputProps} listOfImages={listOfImages} handleClickOnImage={handleClickOnImage} />
            <ListOfDroppedImages acceptedFiles={acceptedFiles} />
        </AddWidgetModalWrapper>
    );
};
