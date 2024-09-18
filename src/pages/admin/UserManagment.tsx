import {FC, useEffect, useState} from "react";
import {UserType} from "../../utils/types/user/userTypes.ts";
import {getAllUsers} from "../../api/adminService.ts";
import {UserComponent} from "../../components/modules/admin/userManagment/UserComponent.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useTranslation} from "react-i18next";

export const UserManagment:FC = () => {
    const {t} = useTranslation();
    const [users, setUsers] = useState<UserType[]>();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers();
                if (!response) return;
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUsers();
    }, []);
    
    return (
        <div>
            <h1>{t("User management")}</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">{t("Nickname")}</th>
                    <th scope="col">{t("Email")}</th>
                    <th scope="col">{t("Title before")}</th>
                    <th scope="col">{t("Name")}</th>
                    <th scope="col">{t("Middle name")}</th>
                    <th scope="col">{t("Surname")}</th>
                    <th scope="col">{t("Title after")}</th>
                    <th scope="col">{t("Role")}</th>
                    <th scope="col">{t("Firm")}</th>
                    <th scope="col">{t("Street")}</th>
                    <th scope="col">{t("Street number")}</th>
                    <th scope="col">{t("Town")}</th>
                    <th scope="col">{t("Country")}</th>
                    <th scope="col">{t("Changed")}</th>
                    <th scope="col">{t("Created")}</th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user) => (
                    <UserComponent user={user} key={uuidv4()}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}