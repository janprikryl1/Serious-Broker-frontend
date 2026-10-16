import React, {ChangeEvent, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {UserType} from "../types/user/userTypes";
import {useTranslation} from "react-i18next";
import {useUserContext} from "./providerUser.tsx";
import {updateUserDetails} from "../api/authenticateService.ts";
import {CustomSwal} from "../functions/customSwal.ts";
import {captureEvent, identifyUser} from "../posthog.ts";

type Props = {
    children: ReactNode;
}

type UserDetailsProviderProps = {
    userDetails: UserType | undefined;
    setUserDetails: Dispatch<SetStateAction<UserType | undefined>>;
    submitChanges: () => Promise<void>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserDetailsContext = React.createContext<UserDetailsProviderProps | undefined>(undefined);

export const UserDetailsProvider = ({children}: Props) => {
    const {user, setUser} = useUserContext();
    const {t} = useTranslation();
    const [userDetails, setUserDetails] = useState<UserType | undefined>(user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails!,
            [name]: value
        }));
    };

    const submitChanges = async () => {
        if (userDetails === undefined || userDetails.email === "") return;
        try {
            const response = await updateUserDetails(userDetails);
            if (!response) return;
            if (response.data.status === "success") {
                setUserDetails(response.data.user);
                setUser(response.data.user);
                identifyUser(response.data.user.id, {
                    email: response.data.user.email,
                    nickname: response.data.user.nickname,
                    role: response.data.user.role,
                });
                captureEvent('profile_updated', {
                    language: response.data.user.language,
                    country: response.data.user.country,
                    newsletter_subscription: response.data.user.newsletter_subscription,
                });
                CustomSwal.fire({
                    icon: "success",
                    title: t("Updated"),
                    text: t("User details updated"),
                });
            } else if (response.data.status === "error" && response.data.message === "Email is already in use by another user") {
                CustomSwal.fire({
                    icon: "error",
                    title: t("Error"),
                    text: t("Email already used"),
                });
            }
        } catch(error){
            console.error(error);
            CustomSwal.fire({
                icon: "error",
                title: t("Update Failed"),
                text: t("Please try again"),
            });
        }
    };

    const value = {
        userDetails,
        setUserDetails,
        submitChanges,
        handleChange
    }

    return (
        <UserDetailsContext.Provider value={value}>{children}</UserDetailsContext.Provider>
    )
}

export const useUserDetails = () => {
    const context = useContext(UserDetailsContext);
    if (context === undefined) {
        throw new Error("useUserDetails must be used within a UserDetailsProvider");
    }
    return context;
}
