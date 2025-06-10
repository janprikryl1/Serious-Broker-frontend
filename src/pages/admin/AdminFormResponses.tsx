import {ChangeEvent, FC, useEffect, useState} from "react";
import { UserLiteType } from "../../utils/types/user/UserLiteType.ts";
import {getUserLites, resetOldResponses} from "../../utils/api/formsService.ts";
import { useTranslation } from "react-i18next";
import {AdminFormResponsesTable} from "../../components/formQuestions/AdminFormResponsesTable.tsx";
import {Button} from "../../components/reusable/Button.tsx";

export const AdminFormResponses: FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<UserLiteType[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserLites();
                if (response?.data) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        })();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(event.target.value);
    };
    
    const handleResetAnswers = async () => {
        if (!selectedUserId) return;
        await resetOldResponses();
        setSelectedUserId("");
    };

    return (
        <div className="padding-bottom admin-container">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <h3 className="admin-section-title">{t("Responses")}</h3>
                        <Button onClick={handleResetAnswers}>{t("Reset old answers")}</Button>
                        <br /><br />
                        <label htmlFor="userSelect" className="form-label">Vyberte uživatele</label>
                        <select
                            id="userSelect"
                            className="form-select"
                            value={selectedUserId}
                            onChange={handleChange}
                        >
                            <option value="">-- Vyberte --</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.firstname} {user.surname} ({user.email})
                                </option>
                            ))}
                        </select>
                        <AdminFormResponsesTable userId={selectedUserId} />
                    </div>
                </div>
            </div>
        </div>
    );
};
