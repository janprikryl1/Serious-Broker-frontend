import {FC} from "react";
import {Button, ButtonColor} from "../../../../reusable/Button.tsx";
import {TemplateProps} from "../../../../../utils/types/admin/TemplateProps.ts";

export const FullscreenImageTemplate:FC<TemplateProps> = ({selected, index}) => {
    return (
        <Button color={ButtonColor.transparent}>
            <svg fill={selected === index ? "#ff9f00" : "gray"}
                 width="50mm"
                 height="70mm">
                <g>
                    <rect width="78.996796" height="16.607281" x="10.77229" y="15.260744"/>
                    <rect width="184.94342" height="12.118827" x="11.138291" y="37.67918"/>
                    <rect width="184.57741" height="116.06366" x="11.279876" y="53.916019"/>
                    <rect width="35.458778" height="16.158436" x="10.772294" y="174.60088"/>
                    <rect width="35.458778" height="16.158436" x="53.637032" y="174.60085"/>
                </g>
            </svg>
        </Button>
    )
}
