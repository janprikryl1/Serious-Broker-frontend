import { FC, useEffect, useState } from "react";
import { MembershipComponent } from "./MembershipComponent.tsx";
import { useTranslation } from "react-i18next";
import { NewMembership } from "./NewMembership.tsx";
import { MembershipLoadingSkeleton } from "./MembershipLoadingSkeleton.tsx";
import {MembershipTypes} from "../../../utils/types/user/userTypes.ts";
import {addMembership, editMembership, getMembershipByUserId} from "../../../utils/api/membershipService.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

type Props = {
    userId: number;
};

export const MembershipManagement: FC<Props> = ({ userId }) => {
    const { t } = useTranslation();
    const [memberships, setMemberships] = useState<MembershipTypes[]>([]);
    const [showNewMembership, setShowNewMembership] = useState(false);
    const [editingMembershipId, setEditingMembershipId] = useState<number | null>(null);

    useEffect(() => {
        const fetchMemberships = async () => {
            try {
                const response = await getMembershipByUserId(userId);
                if (!response) return;
                setMemberships(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMemberships();
    }, []);

    const handleAddMembership = () => {
        setShowNewMembership(true);
    };

    const handleAddSavedMembership = async (price: number, dateTimeEnd: string) => {
        try {
            const newMembership = await addMembership(userId, price, dateTimeEnd);
            setMemberships([...memberships, newMembership.data]);
            setShowNewMembership(false);
        } catch (err) {
            console.error(err);
        }
        
    };

    const handleEditMembership = (id: number) => {
        setEditingMembershipId(id);
    };

    const handleSaveEditedMembership = async (price: number, dateTimeEnd: string) => {
        if (editingMembershipId === null) return;
        try {
            const response = await editMembership(userId, editingMembershipId, price, dateTimeEnd);
            if (!response) return;
            setMemberships(
                memberships.map((membership) =>
                    membership.id === editingMembershipId ? response.data : membership
                )
            )
            handleCancelEdit();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setEditingMembershipId(null);
    };

    return (
        <div>
            {!showNewMembership && editingMembershipId === null && (
                <Button onClick={handleAddMembership}>
                    {t("Add membership")}
                </Button>
            )}

            {showNewMembership && (
                <NewMembership addNewMembership={handleAddSavedMembership} />
            )}

            {memberships === undefined ? (
                <MembershipLoadingSkeleton />
            ) : memberships.length === 0 ? (
                <p>{t("No memberships")}</p>
            ) : (
                memberships.map((membership) => (
                    <div key={membership.id}>
                        {editingMembershipId === membership.id ? (
                            <NewMembership
                                addNewMembership={handleSaveEditedMembership}
                                selectedPrice={membership.price}
                                selectedDateTimeEnd={membership.datetime_end}
                            />
                        ) : (
                            <MembershipComponent
                                membership={membership}
                                onEdit={() => handleEditMembership(membership.id)}
                            />
                        )}
                    </div>
                ))
            )}

            {editingMembershipId !== null && (
                <Button color={ButtonColor.gray} className="mb-5" onClick={handleCancelEdit}>
                    {t("Cancel Edit")}
                </Button>
            )}
        </div>
    );
};
