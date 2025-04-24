import {FC, useEffect, useState} from "react";
import {UserAchievementSkeleton} from "./UserAchievementSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {NewAchievementModal} from "./NewAchievementModal.tsx";
import {TimeLineComponent} from "../../reusable/TimeLineComponent.tsx";
import {UserType} from "../../../utils/types/user/userTypes.ts";
import {adminUserAchievements} from "../../../utils/api/achievementService.ts";
import {Button} from "../../reusable/Button.tsx";
import {CustomSwal} from "../../../utils/functions/customSwal.ts";
import {AchievementType} from "../../../utils/types/user/AchievementType.ts";
import {useModal} from "../../../utils/hooks/useModal.tsx";

type Props = {
    selectedUser?: UserType;
}

export const UserAchievementDetails:FC<Props> = ({selectedUser}) => {
    const {t} = useTranslation();
    const [achievements, setAchievements] = useState<AchievementType[]>([]);
    const {isOpen: newAchievementModalOpen, closeModal: closeNewAchievementModal, openModal: openNewAchievementModal} = useModal();
    
    useEffect(() => {
        if (!selectedUser) return;
        const fetchAchievements = async () => {
            try {
                const response = await adminUserAchievements(selectedUser.id);
                if (!response) return;
                setAchievements(response.data);
            } catch (error) {
                console.error(error);
                CustomSwal.fire({
                    title: 'Error',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
        }
        fetchAchievements();
    }, [selectedUser]);
    
    return (
        <div className="cta__subscribe padding-bottom padding-top">
            {selectedUser && achievements ? (
                <>
                    <Button onClick={openNewAchievementModal}>{t("Add new achievement")}</Button>
                    <TimeLineComponent achievements={achievements} />
                </>
            ) : (
              <UserAchievementSkeleton />  
            )}
            <NewAchievementModal 
                open={newAchievementModalOpen}
                closeModal={closeNewAchievementModal}
                selectedUser={selectedUser}
                setAchievements={setAchievements}
            />
        </div>
    );
};