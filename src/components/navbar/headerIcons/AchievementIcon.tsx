import {FC, useState} from "react";
import AchievmentSvg from "../utils/icons/achievment_icon_black_white_grayscale.svg";
import {Link} from "react-router-dom";
import { Divider, Menu, MenuItem } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Badge from '@mui/material/Badge';
import {GiConfirmed} from "react-icons/gi";
import {AchievmentMenuListItem} from "./AchievmentMenuListItem.tsx";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {useAchievementsContext} from "../../../utils/providers/AchievementsProvider.tsx";
import {routes} from "../../../utils/constants";

export const AchievementIcon: FC = () => {
    const { user } = useUserContext();
    const { t } = useTranslation();
    const {unreadAchievements} = useAchievementsContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!anchorEl) {
            setAnchorEl(event.currentTarget);    
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (user) {
        return (
            <>
                <Badge badgeContent={unreadAchievements.length} color="warning">
                    <img src={AchievmentSvg} alt="achievement icon" width={40} onClick={handleClick} />
                </Badge>
                    
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {unreadAchievements.length > 0 ? unreadAchievements.map((achievment) => (
                        <AchievmentMenuListItem achievment={achievment} key={achievment.id} handleClose={handleClose} />
                    )) : (
                        <MenuItem disabled>
                            <GiConfirmed /> {t("No unread achievements")}
                        </MenuItem>)
                    }
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <Link to={routes.profile.achievements} className="link-underline-none">{t("All achievements")}</Link>
                    </MenuItem>
                </Menu>
            </>
        );
    }
};
