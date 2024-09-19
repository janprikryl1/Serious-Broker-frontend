import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {ImageListItemDto} from "../types/article/ImageListItemDto.ts";
import {getImages, uploadImage} from "../../api/imageService.ts";

export const useListFilesModal = (handleSetPath: (path: string) => void) => {
    const { t } = useTranslation();
    const [listOfImages, setListOfImages] = useState<ImageListItemDto[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        handleDroppedFiles(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });

    const loadSavedImages = async () => {
        try {
            const res = await getImages();
            if (!res) return;
            setListOfImages(res.data);
        } catch (error) {
            setListOfImages([]);
            Swal.fire({
                title: t("Error"),
                text: t("An error occurred while loading saved images"),
                icon: 'error',
                confirmButtonText: t("Ok")
            });
            console.error(error);
        }
    };


    useEffect(() => {
        (async () => {
            await loadSavedImages();
        })();
    }, []);

    const handleClickOnImage = (itemImg: string) => {
        handleSetPath(itemImg);
    };

    const handleDroppedFiles = (droppedFiles: File[]) => {
        droppedFiles.forEach((value: File) => {
            sendFiles(value);
        });
    };

    const sendFiles = async (element: File) => {
        const bodyFormData = new FormData();
        bodyFormData.append('image', element);

        try {
            await uploadImage(bodyFormData);
            Swal.fire({
                title: t("Success"),
                text: `${t("Successfully saved image")} ${element.name}!`,
                icon: 'success',
                confirmButtonText: t("Ok")
            });
            await loadSavedImages();
        } catch (error) {
            Swal.fire({
                title: t("Error"),
                text: t("An error occurred while saving this image"),
                icon: 'error',
                confirmButtonText: t("Ok")
            });
            console.error(error);
        }
    };

    return {getRootProps, getInputProps, listOfImages, handleClickOnImage, acceptedFiles};
}
