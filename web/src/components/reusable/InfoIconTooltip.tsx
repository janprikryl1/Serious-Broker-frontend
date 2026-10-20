import React, { FC } from "react";
import { FiInfo } from "react-icons/fi";
import {IoIosAddCircleOutline} from "react-icons/io";
import {CustomTooltip} from "./CustomTooltip.tsx";
import {RxInfoCircled} from "react-icons/rx";

type Props = {
    text: string;
    color?: string;
    placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    size?: number;
};

export const InfoIconTooltip: FC<Props> = ({
                                           text,
                                           color = "var(--secondary-color)",
                                           placement = "top",
                                           size = 20
                                       }) => {
    return (
        <div className="custom-tooltip-wrapper">
            <CustomTooltip title={text} placement={placement}>
                <span>
                    <RxInfoCircled
                        size={size}
                        style={{ color: color, cursor: "help" }}
                        className="tooltip-icon"
                    />
                </span>
            </CustomTooltip>
        </div>
    );
};