import { FC, useEffect, useState } from "react";
import { QuestionEvaluationType } from "../../utils/types/admin/QuestionResponseUserType.ts";
import { getUserQuestions, resetUserResponses } from "../../utils/api/formsService.ts";
import { useTranslation } from "react-i18next";
import { Button } from "../reusable/Button.tsx";
import {AxiosError} from "axios";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

type Props = {
    userId: string;
};

export const AdminFormResponsesTable: FC<Props> = ({ userId }) => {
    const { t } = useTranslation();
    const [response, setResponse] = useState<QuestionEvaluationType>();

    useEffect(() => {
        if (!userId) return;

        (async () => {
            try {
                const res = await getUserQuestions(userId);
                if (res?.data) {
                    setResponse(res.data);
                }
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 404) {
                    setResponse(undefined);
                    CustomSwal.fire({
                        title: t("No data"),
                        text: t("No data for this user"),
                        icon: "error",
                    });
                    return;
                }
                console.error("Error fetching form responses:", error);
            }
        })();
    }, [userId]);

    const handleResetUserResponses = async () => {
        if (!userId) return;
        await resetUserResponses(userId);
    };

    if (!response) return <p>{t("Loading...")}</p>;

    return (
        <div className="mt-4">
            <h5 className="mb-3">{t("Total score")}: {response.total_score}</h5>
            <p className="text-muted">{response.evaluation.name} – {response.evaluation.description}</p>

            {Object.entries(response.scores_by_category).map(([category, score]) => (
                <div key={category} className="mb-4">
                    <h6>{category}: {score} {t("points")}</h6>
                    {response.detailed_answers[category]?.map((item, i) => (
                        <div key={i} className="border rounded p-3 mb-2">
                            <strong>{item.question}</strong>
                            <div>{t("Answer")}: {item.answer}</div>
                            <div>{t("Points")}: {item.points}</div>
                            {item.explanation && (
                                <div className="text-muted small">{item.explanation}</div>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            <Button onClick={handleResetUserResponses}>
                {t("Reset answers")}
            </Button>
        </div>
    );
};
