import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {GridColDef} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";
import {useModal} from "../useModal.tsx";
import {useUserContext} from "../../providers/providerUser.tsx";
import {UserRole, UserType} from "../../types/user/userTypes.ts";
import {routes} from "../../constants";
import {getAllUsers, updateUser} from "../../api/adminService.ts";
import {CustomSwal} from "../../functions/customSwal.ts";

export const useAdminUserManagement = () => {
    const { t } = useTranslation();
    const {user} = useUserContext();
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserType[]>([]);
    const {isOpen, closeModal, openModal} = useModal();
    const [selectedUser, setSelectedUser] = useState<UserType>();
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchColumn1, setSearchColumn1] = useState<string>('email');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchColumn2, setSearchColumn2] = useState<string>('role');
    const [filterCondition, setFilterCondition] = useState<'AND' | 'OR'>('AND');
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

    useEffect(() => {
        if (!user || user.role !== UserRole.Admin) {
            navigate(routes.home);
        }
    }, [user]);

    const handleOpen = (userId: number) => {
        setSelectedUser(users.find((user) => user.id == userId));
        openModal();
    };
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: "Id", flex: 1, headerClassName: 'background-gray' },
        { field: 'nickname', headerName: t("Nickname"), flex: 1, headerClassName: 'background-gray' },
        { field: 'email', headerName: t("Email"), flex: 1, headerClassName: 'background-gray' },
        { field: 'title_before', headerName: t("Title before"), flex: 1, headerClassName: 'background-gray' },
        { field: 'firstname', headerName: t("Name"), flex: 1, headerClassName: 'background-gray' },
        { field: 'midlename', headerName: t("Middle name"), flex: 1, headerClassName: 'background-gray' },
        { field: 'surname', headerName: t("Surname"), flex: 1, headerClassName: 'background-gray' },
        { field: 'firm_id', headerName: t("Firm") + " ID", flex: 1, headerClassName: 'background-gray' },
        { field: 'firm_name', headerName: t("Firm") + " name", flex: 1, headerClassName: 'background-gray' },
        { field: 'firm_vat', headerName: t("Firm") + " VAT", flex: 1, headerClassName: 'background-gray' },
        { field: 'title_after', headerName: t("Title after"), flex: 1, headerClassName: 'background-gray' },
        { field: 'role', headerName: t("Role"), flex: 1, headerClassName: 'background-gray' },
        { field: 'firm', headerName: t("Firm"), flex: 1, headerClassName: 'background-gray' },
        { field: 'street', headerName: t("Street"), flex: 1, headerClassName: 'background-gray' },
        { field: 'street_number', headerName: t("Street number"), flex: 1, headerClassName: 'background-gray' },
        { field: 'town', headerName: t("Town"), flex: 1, headerClassName: 'background-gray' },
        { field: 'country', headerName: t("Country"), flex: 1, headerClassName: 'background-gray' },
        { field: 'verified', headerName: t("Verified"), flex: 1, headerClassName: 'background-gray' },
    ];

    const handleUpdateUser = async (updatedUser: UserType) => {
        try {
            await updateUser(updatedUser);
            setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
            setFilteredUsers(filteredUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
            CustomSwal.fire(t("Success"), t("User updated successfully"), "success");
        } catch (error) {
            CustomSwal.fire(t("Error"), t("Failed to update user"), "error");
            console.error(error);
        }
    };

    const sendEmailToAll = () => {
        if (!users) return;
        const emailAddresses = users.map((user) => user.email).join(",");
        window.location.href = `mailto:${emailAddresses}`;
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

    const handleSearch = () => {
        const results = users.filter((user) => {
            const condition1 = user[searchColumn1 as keyof UserType]?.toString().toLowerCase().includes(searchTerm1.toLowerCase());
            const condition2 = user[searchColumn2 as keyof UserType]?.toString().toLowerCase().includes(searchTerm2.toLowerCase());
            return filterCondition === 'AND' ? condition1 && condition2 : condition1 || condition2;
        });
        setFilteredUsers(results);
    };

    const handleClearFilters = () => {
        setSearchTerm1('');
        setSearchTerm2('');
        setFilteredUsers(users);
    };
    
    return {
        searchColumn1,
        setSearchColumn1,
        searchTerm1,
        setSearchTerm1,
        columns,
        filterCondition,
        setFilterCondition,
        filteredUsers,
        handleSearch,
        handleClearFilters,
        searchColumn2,
        setSearchColumn2,
        searchTerm2,
        setSearchTerm2,
        handleUpdateUser,
        sendEmailToAll,
        handleOpen,
        selectedUser,
        isOpen,
        closeModal
    }
}