import {FC} from "react";
import {ImageLeftTemplate} from "./ImageLeftTemplate";
import {ImageRightTemplate} from "./ImageRightTemplate";
import {ScrollTemplate} from "./ScrollTemplate";
import {NoImagesScrollableTemplateText} from "./NoImagesScrollableTemplateText";
import {FullscreenImageTemplate} from "./FullscreenImageTemplate";

type Props = {
    selected: string;
    setSelected: (value: string) => void;
}

export const ArticleTemplates:FC<Props> = ({selected, setSelected}) => {
    return (
        <div className="row">
            <div className="col-sm" onClick={() => setSelected("0")}>
                <ImageLeftTemplate index={"0"} selected={selected}/>
            </div>
            <div className="col-sm" onClick={() => setSelected("1")}>
                <ImageRightTemplate index={"1"} selected={selected}/>
            </div>
            <div className="col-sm" onClick={() => setSelected("2")}>
                <ScrollTemplate index={"2"} selected={selected}/>
            </div>
            <div className="col-sm" onClick={() => setSelected("3")}>
                <NoImagesScrollableTemplateText index={"3"} selected={selected}/>
            </div>
            <div className="col-sm" onClick={() => setSelected("4")}>
                <FullscreenImageTemplate index={"4"} selected={selected}/>
            </div>
        </div>
    )
}
