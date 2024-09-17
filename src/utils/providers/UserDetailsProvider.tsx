import React, {ChangeEvent, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {UserType} from "../types/user/userTypes";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {useUserContext} from "./providerUser.tsx";
import {updateUserDetails} from "../../api/authenticateService.ts";

type Props = {
    children: ReactNode;
}

type UserDetailsProviderProps = {
    userDetails: UserType | null;
    setUserDetails: Dispatch<SetStateAction<UserType | null>>;
    sumbitChanges: () => Promise<void>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserDetailsContext = React.createContext<UserDetailsProviderProps | undefined>(undefined);

export const UserDetailsProvider = ({children}: Props) => {
    const {user} = useUserContext();
    const {t} = useTranslation();
    const [userDetails, setUserDetails] = useState<UserType | null>(user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails!,
            [name]: value
        }));
    };

    const sumbitChanges = async () => {
        if (userDetails === null || userDetails.email === "") return;
        try {
            const response = await updateUserDetails(userDetails);
            if (!response) return;
            if (response.data.status === "success") {
                setUserDetails(response.data.user);
                Swal.fire({
                    icon: "success",
                    title: t("Updated"),
                    text: t("User details updated"),
                });
            } else if (response.data.status === "error" && response.data.message === "Email is already in use by another user") {
                Swal.fire({
                    icon: "error",
                    title: t("Error"),
                    text: t("Email already used"),
                });
            }
        } catch(error){
            console.error(error);
            Swal.fire({
                icon: "error",
                title: t("Update Failed"),
                text: t("Please try again"),
            });
        }
    };

    const value = {
        userDetails,
        setUserDetails,
        sumbitChanges,
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
