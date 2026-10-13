import {FC} from "react";
import {Image} from "react-bootstrap";

type Props = {
    src: string;
    alt: string;
}

export const DemoWidgetImage:FC<Props> = ({src, alt}) => {
    return (
        <div className="d-flex justify-content-center" style={{maxHeight:"600px"}}>
            <Image src={src} alt={alt} />
        </div>
    )
}