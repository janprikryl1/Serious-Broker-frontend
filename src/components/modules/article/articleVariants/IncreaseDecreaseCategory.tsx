import {Dispatch, FC, SetStateAction} from "react";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ContentType} from "../../../../utils/types/article/ContentType.ts";

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
                variant="danger"
                onClick={handleDecreaseCategory}
                disabled={category === 0}
            >
                {t("Previous")}
            </Button>{' '}
            <Button
                variant="primary"
                onClick={handleIncreaseCategory}
                disabled={category === content.length - 1}
            >
                {t("Next")}
            </Button>
        </>
    )
}