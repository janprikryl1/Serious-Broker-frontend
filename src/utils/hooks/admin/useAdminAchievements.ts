import {useEffect, useState} from "react";
import {GridCellParams} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";
import {UserType} from "../../types/user/userTypes.ts";
import {getAllUsers} from "../../api/adminService.ts";
import {giveAchievmentsForLongPeriod} from "../../api/achievementService.ts";
import {showToast} from "../../../components/toast/toastHelper.tsx";

export const useAdminAchievements = () => {
    const {t} = useTranslation();
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType>();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState<string>('email');
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

    const handleSelectUser = (e: GridCellParams) => {
        setSelectedUser(users.find((user) => user.id == e.id));
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers();
                if (!response) return;
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
    }, []);

    const columns = [
        { field: 'id', headerName: "Id", flex: 1, headerClassName: 'background-gray' },
        { field: 'nickname', headerName: t("Nickname"), flex: 1, headerClassName: 'background-gray' },
        { field: 'email', headerName: t("Email"), flex: 1, headerClassName: 'background-gray' },
        { field: 'firstname', headerName: t("Name"), flex: 1, headerClassName: 'background-gray' },
        { field: 'surname', headerName: t("Surname"), flex: 1, headerClassName: 'background-gray' }
    ];

    const handleSearch = () => {
        const results = users.filter((user) =>
            user[searchColumn as keyof UserType]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilteredUsers(users);
    };

    const handleAddLongPeriodOfTimeAchievements = async () => {
        try {
            const response = await giveAchievmentsForLongPeriod();
            if (response.status === 200) {
                showToast.success(t("Activity checked"));
            }
        } catch (error) {
            console.error(error);
            showToast.error(t("Error"));
        }
    };
    
    return {
        handleAddLongPeriodOfTimeAchievements,
        searchColumn,
        setSearchColumn,
        searchTerm,
        setSearchTerm,
        filteredUsers,
        columns,
        handleSearch,
        handleClearFilters,
        selectedUser,
        handleSelectUser
    }
}