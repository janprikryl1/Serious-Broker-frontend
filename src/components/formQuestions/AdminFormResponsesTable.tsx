import { FC, useEffect, useState } from "react";
import { QuestionResponseUserType } from "../../utils/types/admin/QuestionResponseUserType.ts";
import { getUserQuestions } from "../../utils/api/formsService.ts";
import {useTranslation} from "react-i18next";

type Props = {
    userId: string;
};

export const AdminFormResponsesTable: FC<Props> = ({ userId }) => {
    const { t } = useTranslation();
    const [responses, setResponses] = useState<QuestionResponseUserType[]>();

    useEffect(() => {
        if (!userId) return;

        (async () => {
            try {
                const response = await getUserQuestions(userId);
                if (response?.data) {
                    setResponses(response.data);
                }
            } catch (error) {
                console.error("Error fetching form responses:", error);
            }
        })();
    }, [userId]);

    return (
        <div className="mt-4">
            {responses ? responses.map((item) => (
                <div key={item.question_id} className="mb-3 p-3 border rounded shadow-sm">
                    <h6 className="mb-2">{item.question_text}</h6>
                    <p className="mb-0">
                        {item.value ? (
                            item.value
                        ) : (
                            <span className="text-muted">Bez odpovědi</span>
                        )}
                    </p>
                </div>
            )) : t("Loading...")}
        </div>
    );
};
