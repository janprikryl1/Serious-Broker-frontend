import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { ImageDropzone } from "./ImageDropzone.tsx";
import { DropZoneImageComponent } from "./DropZoneImageComponent.tsx";
import {ImageListItemDto} from "../../../../../../../utils/types/article/ImageListItemDto.ts";

type Props = {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    listOfImages: ImageListItemDto[];
    handleClickOnImage: (itemImg: string) => void;
};

export const ListOfImagesAndDropZone: FC<Props> = ({ getRootProps, getInputProps, listOfImages, handleClickOnImage }) => {
    return (
        <div className="d-flex flex-grow-1 overflow-auto">
            <div className="row row-cols-auto g-4">
                <ImageDropzone getRootProps={getRootProps} getInputProps={getInputProps} />
                {listOfImages.map((item) => (
                    <DropZoneImageComponent item={item} handleClickOnImage={handleClickOnImage} key={uuidv4()} />
                ))}
            </div>
        </div>
    );
};
