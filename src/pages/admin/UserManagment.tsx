import {FC, useEffect, useState} from "react";
import {UserType} from "../../utils/types/user/userTypes.ts";
import {getAllUsers} from "../../api/adminService.ts";
import {useTranslation} from "react-i18next";
import {DataGrid} from "@mui/x-data-grid";
import {Paper} from "@mui/material";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";
import {UserEditModal} from "../../components/modules/admin/userManagment/UserEditModal.tsx";

export const UserManagment:FC = () => {
    const {t} = useTranslation();
    const [users, setUsers] = useState<UserType[]>();
    const { theme } = useThemeContext();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType>();
    
    const handleOpen = (userId: number) => {
        setSelectedUser(users?.find((user) => user.id === userId));
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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

    const columns = [
        {field: 'id', headerName: "Id", flex: 1},
        {field: 'nickname', headerName: t("Nickname"), flex: 1},
        {field: 'email', headerName: t("Email"), flex: 1},
        {field: 'title_before', headerName: t("Title before"), flex: 1},
        {field: 'firstname', headerName: t("Name"), flex: 1},
        {field: 'midlename', headerName: t("Middle name"), flex: 1},
        {field: 'surname', headerName: t("Surname"), flex: 1},
        {field: 'firm_id', headerName: t("Firm")+ " ID", flex: 1},
        {field: 'firm_name', headerName: t("Firm") + " name", flex: 1},
        {field: 'firm_vat', headerName: t("Firm") + " VAT", flex: 1},
        {field: 'title_after', headerName: t("Title after"), flex: 1},
        {field: 'role', headerName: t("Role"), flex: 1},
        {field: 'firm', headerName: t("Firm"), flex: 1},
        {field: 'street', headerName: t("Street"), flex: 1},
        {field: 'street_number', headerName: t("Street number"), flex: 1},
        {field: 'town', headerName: t("Town"), flex: 1},
        {field: 'country', headerName: t("Country"), flex: 1},
        {field: 'changed', headerName: t("Changed"), flex: 1},
        {field: 'created', headerName: t("Created"), flex: 1},
    ];

    const sendEmailToAll = () => {
        if (!users) return;
        const emailAddresses = users.map((user) => user.email).join(",");
        window.location.href = `mailto:${emailAddresses}`;
    };

    return (
        <div>
            <h1>{t("User management")}</h1>
            <Paper sx={{ width: '100%', backgroundColor: theme === 'dark' ? "#5a636c" : "#f5f8fb" }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    hideFooter={true}
                    onCellClick={(e) => handleOpen(Number(e.id))}
                    sx={{ border: 0 }}
                />
            </Paper>
            <button onClick={sendEmailToAll} className="btn btn-primary mt-3">
                {t("Send email to all")}
            </button>
            <UserEditModal open={open} handleClose={handleClose} selectedUser={selectedUser} />
        </div>
    )
}