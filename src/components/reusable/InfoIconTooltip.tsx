import React, { FC } from "react";
import { FiInfo } from "react-icons/fi";
import {IoIosAddCircleOutline} from "react-icons/io";
import {CustomTooltip} from "./CustomTooltip.tsx";
import {RxInfoCircled} from "react-icons/rx";

type TooltipPosition = "top" | "bottom" | "left" | "right";

type Props = {
    text: string;
    color?: string;
    position?: TooltipPosition;
    size?: number;
};

export const InfoIconTooltip: FC<Props> = ({
                                           text,
                                           color = "var(--secondary-color)",
                                           position = "top",
                                           size = 20
                                       }) => {
    return (
        <div className="custom-tooltip-wrapper">
            <CustomTooltip title={text}>
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