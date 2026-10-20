import {FC} from "react";
import {MenuItem} from "@mui/joy";
import AchievmentSvg from "../../../utils/icons/achievment_icon.svg";
import {useTranslation} from "react-i18next";
import {useAchievementsContext} from "../../../utils/providers/AchievementsProvider.tsx";
import {AchievementType} from "../../../utils/types/user/AchievementType.ts";

type Props = {
    achievment: AchievementType;
    handleClose: () => void;
};

export const AchievmentMenuListItem:FC<Props> = ({achievment, handleClose}) => {
    const {t} = useTranslation();
    const {markAchievementAsRead} = useAchievementsContext();
    
    const handleMarkAsRead = async () => {
        await markAchievementAsRead(achievment.id);
        handleClose();
    };
    
    return (
        <MenuItem onClick={handleMarkAsRead}>
            <img src={AchievmentSvg} alt="achievement icon" width={20}/> {t(achievment.text)}
        </MenuItem>
    );
};