import {FC} from "react";
import {templateProps} from "./templateProps";

export const ImageRightTemplate:FC<templateProps> = ({selected, index}) => {
    return (
        <button style={{background: "none", border: "none"}}>
            <svg fill={selected===index ? "#ff9f00" : "gray"}
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
                        y="78.547958"/>
                    <rect
                        width="70.91758"
                        height="89.320236"
                        x="124.77903"
                        y="101.43907"/>
                    <rect
                        width="93.808685"
                        height="12.118827"
                        x="11.669979"
                        y="101.8879"/>
                    <rect
                        width="93.808685"
                        height="12.118827"
                        x="11.894405"
                        y="142.50841"/>
                    <rect
                        width="93.808685"
                        height="12.118827"
                        x="11.894413"
                        y="124.10574"/>
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
        </button>
    )
}
