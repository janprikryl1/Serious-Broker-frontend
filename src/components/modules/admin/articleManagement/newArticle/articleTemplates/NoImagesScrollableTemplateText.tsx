import {FC} from "react";
import {templateProps} from "./templateProps";
import {Button, ButtonColor} from "../../../../../Button.tsx";

export const NoImagesScrollableTemplateText:FC<templateProps> = ({selected, index}) => {
    return (
        <Button color={ButtonColor.transparent}>
            <svg fill={selected === index ? "#ff9f00" : "gray"}
                 width="50mm"
                 height="70mm">
                <g>
                    <rect
                        width="78.996796"
                        height="16.607281"
                        x="10.77229"
                        y="15.260744"/>
                    <rect
                        width="185.37317"
                        height="27.37957"
                        x="11.221135"
                        y="40.844936"/>
                    <rect
                        width="71.366417"
                        height="13.465363"
                        x="10.996715"
                        y="73.610657"/>
                    <rect
                        width="93.808685"
                        height="12.118827"
                        x="10.772288"
                        y="91.115608"/>
                    <rect
                        width="93.808685"
                        height="12.118827"
                        x="10.54787"
                        y="124.55458"/>
                    <rect
                        width="93.808685"
                        height="12.118827"
                        x="10.547867"
                        y="158.66685"/>
                    <rect
                        width="79.831551"
                        height="12.118827"
                        x="10.099025"
                        y="141.16188"/>
                    <rect
                        width="79.598595"
                        height="12.118827"
                        x="10.547876"
                        y="107.49846"/>
                    <rect
                        width="35.458778"
                        height="16.158436"
                        x="10.772294"
                        y="174.60088"/>
                    <rect
                        width="35.458778"
                        height="16.158436"
                        x="53.637032"
                        y="174.60085"/>
                </g>
            </svg>
        </Button>
    )
}
