import {CSSProperties, FC, ReactNode, useState} from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

type Props = {
    children: ReactNode;
    popover: string | ReactNode;
    style?: CSSProperties;
}

export const TypographyWithPopover:FC<Props> = ({children, popover, style}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    
    return (
        <div style={{...style, marginBottom: -10, marginLeft: "2%"}}>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {children}
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none' }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{popover}</Typography>
            </Popover>
        </div>
    );
};