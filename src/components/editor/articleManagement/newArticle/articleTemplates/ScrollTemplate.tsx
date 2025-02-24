import {FC} from "react";
import {templateProps} from "./templateProps";
import {Button, ButtonColor} from "../../../../reusable/Button.tsx";

export const ScrollTemplate:FC<templateProps> = ({selected, index}) => {
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
                    width="184.94342"
                    height="12.118827"
                    x="11.138291"
                    y="37.67918"/>
                <rect
                    width="94.540688"
                    height="64.457245"
                    x="10.913873"
                    y="71.118156"/>
                <rect
                    width="81.364578"
                    height="64.457245"
                    x="114.86895"
                    y="106.12049"/>
                <rect
                    width="93.808685"
                    height="12.118827"
                    x="11.645876"
                    y="157.56885"/>
                <rect
                    width="79.831551"
                    height="12.118827"
                    x="11.197034"
                    y="140.06387"/>
                <rect
                    width="79.598595"
                    height="12.118827"
                    x="10.913879"
                    y="54.062031"/>
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
