import React, {ChangeEvent, FC, ReactElement, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import {Tooltip} from "@mui/joy";

type Props = {
    children: ReactElement;
    title: string;
    placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
}

export const CustomTooltip: FC<Props> = ({children, title, placement = "right"}) => {
    return (
        <Tooltip
            placement={placement}
            title={title}
            variant={"solid"}
            size={"lg"}
            sx={{
                backgroundColor: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(12px)',
                color: 'white',
                borderRadius: '5px',
                padding: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                border: '1px solid #44403B',
            }}
        >
            {children}
        </Tooltip>
    )
}