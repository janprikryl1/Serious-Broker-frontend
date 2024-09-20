import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageListItemDto } from "../../../../../../../../utils/types/article/ImageListItemDto.ts";
import { imageURL } from "../../../../../../../../utils/constants";

type Props = {
    item: ImageListItemDto;
    handleClickOnImage: (itemImg: string) => void;
};

export const DropZoneImageComponent: FC<Props> = ({ item, handleClickOnImage }) => {
    return (
        <div
            key={uuidv4()}
            style={{width: "200px", height: "200px"}}
        >
            <img
                onClick={() => {
                    handleClickOnImage(item.image);
                }}
                src={`${imageURL}${item.image}`}
                srcSet={`${imageURL}${item.image}`}
                alt={item.image}
                loading="lazy"
            />
        </div>
    );
};
