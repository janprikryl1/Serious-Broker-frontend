import {Dispatch, FC, SetStateAction} from "react";
import {FaCheckCircle} from "react-icons/fa";
import {ContentType} from "../../../utils/types/article/ContentType.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

type Props = {
    task: number;
    category: number;
    content: ContentType[];
    setTask: Dispatch<SetStateAction<number>>;
};

/*
export const ArticleTaskTextColumn:FC<Props> = ({task, category, content, setTask}) => {
    const handleTaskDone = () => {
        if (task + 1 < content[category].tasks.length) {
            setTask(task + 1);
        }
    };

    return (
        <div className="col-sm-8">
            {content[category].tasks.map((taskData, index) => (
                <p key={index} style={{color: index <= task ? "default" : "gray"}}>
                    {taskData.task}
                </p>
            ))}

            <Button
                onClick={handleTaskDone}
                color={ButtonColor.green}
                style={{width: 40, height: 40}}
                disabled={task === content[category].tasks.length - 1}
            >
                <FaCheckCircle/>
            </Button>
        </div>
    );
}*/

export const ArticleTaskTextColumn: FC<Props> = ({ task, category, content, setTask }) => {
    const { t } = useTranslation();
    const tasks = content[category]?.tasks || [];

    return (
      <div className="col-sm-8 tw-flex tw-flex-col tw-justify-between">
          {/* Zoznam krokov (Stepper) */}
          <div className="tw-space-y-4">
              {tasks.map((taskData, index) => {
                  const isCurrent = index === task;
                  const isCompleted = index < task;

                  return (
                    <div
                      key={index}
                      onClick={() => setTask(index)}
                      className={`
                                tw-flex tw-items-start tw-gap-4 tw-p-3 tw-rounded-xl tw-transition-all tw-cursor-pointer
                                ${isCurrent ? " tw-outline tw-outline-1 tw-outline-stone-500 tw-shadow-md" : "tw-opacity-60 hover:tw-opacity-90"}
                            `}
                    >
                        {/* Krúžok s číslom alebo fajočkou */}
                        <div className={`
                                tw-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-mt-1 tw-rounded-full tw-font-semibold tw-text-sm tw-shrink-0 tw-transition-all
                                ${isCompleted ? "tw-text-secondary" : isCurrent ? "tw-text-black tw-bg-secondary" : "tw-bg-stone-600 tw-text-stone-200"}
                            `}>
                            {isCompleted ? <FaCheckCircle size={20} /> : index + 1}
                        </div>

                        {/* Text kroku */}
                        <div className="">
                            <p className={`tw-m-0 ${isCurrent ? "tw-font-semibold tw-text-white" : "tw-text-stone-200"}`}>
                                {taskData.task}
                            </p>
                        </div>
                    </div>
                  );
              })}
          </div>

          {/* Akčné tlačidlo pod krokmi */}
          <div className="tw-mt-0 tw-pt-4 tw-flex tw-items-center tw-justify-start">
                <span className="tw-text-xs tw-text-stone-400">
                    {t("stepProgress", { current: task + 1, total: tasks.length })}
                </span>
              <Button onClick={() => task - 1 >= 0 && setTask(task - 1)} color={ButtonColor.transparent} fontColor={"var(--white-color)"} className={""} style={{fontSize: "1rem"}}>
                  <div className="tw-flwx tw-text-center tw-justify-center hover:tw-text-secondary">
                      <IoIosArrowBack />
                      {t("Previous step")}
                  </div>
              </Button>
              <Button onClick={() => task + 1 < tasks.length && setTask(task + 1)} color={ButtonColor.transparent} fontColor={"var(--white-color)"} className={""} style={{fontSize: "1rem"}}>
                  <div className="tw-flwx tw-text-center tw-justify-center hover:tw-text-secondary">
                      {t("Next step")}
                      <IoIosArrowForward />
                  </div>
              </Button>
          </div>
      </div>
    );
};