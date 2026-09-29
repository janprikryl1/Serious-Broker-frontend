import {Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {ContentType} from "../../../utils/types/article/ContentType.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import {NextStepButton} from "../../reusable/NextStepButton.tsx";

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

  const hasPrevious = category > 0;
  const hasNext = category + 1 < content.length;

  const prevCategoryTitle = hasPrevious ? content[category - 1]?.title : undefined;
  const nextCategoryTitle = hasNext ? content[category + 1]?.title : undefined;
    
    return (
        <div className="tw-flex tw-justify-between">
          {hasPrevious ? (
            <NextStepButton
              variant="previous"
              currentStep={category}
              currentStepFinished={true}
              onClick={handleDecreaseCategory}
              buttonLabel={prevCategoryTitle || t("Previous")}
              buttonDescription={t("Previous page")}
            />
          ) : (
            <div />
          )}

          {hasNext && (
            <NextStepButton
              variant="next"
              currentStep={category}
              currentStepFinished={true}
              onClick={handleIncreaseCategory}
              buttonLabel={nextCategoryTitle || t("Next")}
              buttonDescription={t("Next page")}
            />
          )}
        </div>
    )
}