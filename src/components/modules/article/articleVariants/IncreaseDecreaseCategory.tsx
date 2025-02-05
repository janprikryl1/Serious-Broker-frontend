import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {ContentType} from "../../../../utils/types/article/ContentType.ts";
import {Button, ButtonColor} from "../../../Button.tsx";

type Props = {
    category: number;
    setCategory: Dispatch<SetStateAction<number>>;
    content: ContentType[];
    setTask: Dispatch<SetStateAction<number>>;
};

export const IncreaseDecreaseCategory:FC<Props> = ({category, setCategory, setTask, content}) => {
    const {t} = useTranslation();
    const handleIncreaseCategory = () => {
        if (category + 1 < content.length) {
            setCategory(category + 1);
            setTask(0);
        }
    };

    const handleDecreaseCategory = () => {
        if (category - 1 >= 0) {
            setCategory(category - 1);
            setTask(0);
        }
    };
    
    return (
        <>
            <Button
                color={ButtonColor.red}
                onClick={handleDecreaseCategory}
                disabled={category === 0}
                style={{fontSize: "20px"}}
            >
                {t("Previous")}
            </Button>{' '}
            <Button
                color={ButtonColor.blue}
                onClick={handleIncreaseCategory}
                disabled={category === content.length - 1}
                style={{fontSize: "20px"}}
            >
                {t("Next")}
            </Button>
        </>
    )
}