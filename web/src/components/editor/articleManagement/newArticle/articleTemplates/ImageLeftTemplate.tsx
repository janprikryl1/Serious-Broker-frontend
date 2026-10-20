import {FC} from "react";
import {Button, ButtonColor} from "../../../../reusable/Button.tsx";
import {TemplateProps} from "../../../../../utils/types/admin/TemplateProps.ts";

export const ImageLeftTemplate: FC<TemplateProps> = ({ selected, index }) => {
    return (
        <Button color={ButtonColor.transparent}>
            <svg fill={selected===index ? "#ff9f00" : "gray"}
                 width="50mm"
                 height="70mm">
                <g>
                    <rect width="78.996796" height="16.607281" x="10.77229" y="15.260744" />
                    <rect width="185.37317" height="27.37957" x="11.221135" y="40.844936" />
                    <rect width="71.366417" height="13.465363" x="10.996715" y="78.547958" />
                    <rect width="70.91758" height="89.320236" x="11.221135" y="96.50177" />
                    <rect width="93.808685" height="12.118827" x="89.769081" y="96.501755" />
                    <rect width="93.808685" height="12.118827" x="89.993507" y="137.12227" />
                    <rect width="93.808685" height="12.118827" x="89.993515" y="118.7196" />
                    <rect width="35.458778" height="16.158436" x="11.221138" y="196.14546" />
                    <rect width="35.458778" height="16.158436" x="54.085876" y="196.14543" />
                </g>
            </svg>
        </Button>
    );
};
