import {Dispatch, FC, SetStateAction, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {useTranslation} from "react-i18next";
import {Input} from "@mui/joy";
import {Transition} from "../../reusable/Transition.tsx";
import {PaperComponent} from "../../reusable/PaperComponent.tsx";
import {UserType} from "../../../utils/types/user/userTypes.ts";
import {adminAddAchievement} from "../../../utils/api/achievementService.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import {CustomSwal} from "../../../utils/functions/customSwal.ts";
import {AchievementType} from "../../../utils/types/user/AchievementType.ts";
import "../../../styles/sass/components/achievment.scss";

type Props = {
    selectedUser?: UserType;
    setAchievements: Dispatch<SetStateAction<AchievementType[]>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const NewAchievmentModal: FC<Props> = ({ selectedUser, setAchievements, open, setOpen }) => {
    const { t } = useTranslation();
    const [achievmentText, setAchievmentText] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddAchievement = async () => {
        try {
            const response = await adminAddAchievement(selectedUser!.id, achievmentText);
            if (!response) return;
            setAchievements((prev: AchievementType[]) => [...prev, response.data]);
            setAchievmentText("");
            handleClose();
        } catch (error) {
            console.error(error);
            CustomSwal.fire({
                title: t('Error'),
                text: t('Something went wrong!'),
                icon: 'error',
            });
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperComponent={PaperComponent}
        >
            <DialogTitle className="new-achievement-dialog-title" id="draggable-dialog-title">
                {t("Add new achievement")}
            </DialogTitle>
            <DialogContent>
                <p className="new-achievement-dialog-text" id="alert-dialog-slide-description">
                    {t("Text for new achievement")}
                </p>
                <Input
                    type="text"
                    placeholder={t("Enter text for new achievement")}
                    value={achievmentText}
                    onChange={(e) => setAchievmentText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color={ButtonColor.gray} onClick={handleClose}>{t("Close")}</Button>
                <Button onClick={handleAddAchievement}>{t("Add")}</Button>
            </DialogActions>
        </Dialog>
    );
};
