import {FC, useState, MouseEvent, useEffect} from "react";
import {ContentSection} from "../../../../../../utils/types/article/ContentType.ts";
import {PaperComponent} from "../../../../../reusable/PaperComponent.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button, ButtonColor} from "../../../../../reusable/Button.tsx";
import Dialog from "@mui/material/Dialog";
import {useTranslation} from "react-i18next";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {imageURL} from "../../../../../../utils/constants";
import {Coordinates} from "../../../../../../utils/types/article/Coordinates.ts";
import {defaultCoordinates} from "../../../../../../utils/constants/defaultContent.ts";
import "../../../../../../styles/sass/components/control-image-modal.scss";

type Props = {
    controlImage: ContentSection | undefined;
    isControlImageModalOpen: boolean;
    closeModal: () => void;
}

export const ControlImageModal:FC<Props> = ({controlImage, isControlImageModalOpen, closeModal}) => {
    const {t} = useTranslation();
    const {setContent, currentContent} = useArticleCreate();
    const [startCoords, setStartCoords] = useState<Coordinates>(defaultCoordinates);
    const [endCoords, setEndCoords] = useState<Coordinates>(defaultCoordinates);

    useEffect(() => {
        if (isControlImageModalOpen && controlImage?.animateTo) {
            setStartCoords(controlImage.animateTo.from ?? defaultCoordinates);
            setEndCoords(controlImage.animateTo.to ?? defaultCoordinates);
        }
    }, [isControlImageModalOpen, controlImage]);

    const handleImageClick = (event: MouseEvent<HTMLImageElement>, coordType: 'start' | 'end') => {
        const img = event.currentTarget;
        const rect = img.getBoundingClientRect();

        // Get rendered dimensions of the image
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        // Prevent division by zero if image has no dimensions yet
        if (imgWidth === 0 || imgHeight === 0) {
            console.warn("Image dimensions are zero, cannot calculate percentage coordinates.");
            return;
        }

        // Calculate click position relative to the image's top-left corner
        const clickX = Math.max(0, Math.min(event.clientX - rect.left, imgWidth));
        const clickY = Math.max(0, Math.min(event.clientY - rect.top, imgHeight));

        // Calculate percentage coordinates
        const percentX = (clickX / imgWidth) * 100;
        const percentY = (clickY / imgHeight) * 100;
        const newCoords = { x: percentX, y: percentY };

        if (coordType === 'start') {
            setStartCoords(newCoords);
        } else {
            setEndCoords(newCoords);
        }
    };

    const handleResetCoordinates = () => {
        setStartCoords(defaultCoordinates);
        setEndCoords(defaultCoordinates);
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task) => {
                            if (task.id === controlImage?.id) {
                                return { ...task, animateTo: { from: defaultCoordinates, to: defaultCoordinates } };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
    }

    const handleSaveChanges = () => {
        setContent((prevState) =>
            prevState.map((category, i) => {
                if (i === currentContent) {
                    return {
                        ...category,
                        tasks: category.tasks.map((task) => {
                            if (task.id === controlImage?.id) {
                                return { ...task, animateTo: { from: startCoords, to: endCoords } };
                            }
                            return task;
                        }),
                    };
                }
                return category;
            })
        );
        closeModal();
    }

    return (
        <Dialog open={isControlImageModalOpen} keepMounted onClose={closeModal} PaperComponent={PaperComponent} maxWidth="lg">
            <DialogTitle className="new-achievement-dialog-title">
                {t("Set coordinates of animation")}
            </DialogTitle>
            <DialogContent className="text-light">
                <p className="text-center mb-3">{t("Click on the images to set the start and end points (percentages)")}.</p>
                <div className="row">
                    <div className="col-md-6 text-center mb-4 d-flex flex-column align-items-center">
                        <p className="new-achievement-dialog-text">{t("Start coordinates")}</p>
                        <div className="control-image-modal-image-wrapper">
                            <img
                                src={`${imageURL}${controlImage?.image}`}
                                alt={t("Start coordinates image - Click to set point")}
                                className="control-image-modal-image"
                                onClick={(e) => handleImageClick(e, 'start')}
                                draggable="false"
                            />
                            <div className="control-image-modal-marker" style={{left: `${startCoords.x}%`, top: `${startCoords.y}%`}} />
                        </div>
                        <p className="mt-2">X: {startCoords.x.toFixed(1)}%, Y: {startCoords.y.toFixed(1)}%</p>
                    </div>

                    <div className="col-md-6 text-center mb-4 d-flex flex-column align-items-center">
                        <p className="new-achievement-dialog-text">{t("End coordinates")}</p>
                        <div className="control-image-modal-image-wrapper">
                            <img
                                src={`${imageURL}${controlImage?.image}`}
                                alt={t("End coordinates image - Click to set point")}
                                className="control-image-modal-image"
                                onClick={(e) => handleImageClick(e, 'end')}
                                draggable="false"
                            />
                            <div className="control-image-modal-marker" style={{left: `${endCoords.x}%`, top: `${endCoords.y}%`}} />
                        </div>
                        <p className="mt-2">X: {endCoords.x.toFixed(1)}%, Y: {endCoords.y.toFixed(1)}%</p>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color={ButtonColor.gray2} onClick={closeModal}>{t("Close")}</Button>
                <Button color={ButtonColor.red} onClick={handleResetCoordinates}>{t("Reset coordinates")}</Button>
                <Button onClick={handleSaveChanges}>{t("Save")}</Button>
            </DialogActions>
        </Dialog>
    )
}