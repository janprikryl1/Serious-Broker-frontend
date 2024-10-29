import { FC, useEffect, useState } from "react";
import { UserType } from "../../utils/types/user/userTypes.ts";
import { getAllUsers, updateUser } from "../../api/adminService.ts";
import { useTranslation } from "react-i18next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { useThemeContext } from "../../utils/providers/ThemeProvider.tsx";
import { UserEditModal } from "../../components/modules/admin/userManagment/UserEditModal.tsx";
import Swal from "sweetalert2";
import { Form, Button, InputGroup } from "react-bootstrap";

export const UserManagment: FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<UserType[]>([]);
    const { theme } = useThemeContext();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType>();
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchColumn1, setSearchColumn1] = useState<string>('email');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchColumn2, setSearchColumn2] = useState<string>('role');
    const [filterCondition, setFilterCondition] = useState<'AND' | 'OR'>('AND');
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

    const handleOpen = (userId: number) => {
        setSelectedUser(users.find((user) => user.id == userId));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: t("ID"), width: 90 },
        { field: "email", headerName: t("Email"), width: 200 },
        { field: "role", headerName: t("Role"), width: 120 },
        { field: "nickname", headerName: t("Nickname"), width: 150 },
        { field: "firstname", headerName: t("First Name"), width: 150 },
        { field: "surname", headerName: t("Surname"), width: 150 },
    ];

    const handleUpdateUser = async (updatedUser: UserType) => {
        try {
            await updateUser(updatedUser);
            setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
            setFilteredUsers(filteredUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
            Swal.fire(t("Success"), t("User updated successfully"), "success");
        } catch (error) {
            Swal.fire(t("Error"), t("Failed to update user"), "error");
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

    return (
        <div className="padding-bottom">
            <div
                className="text-center"
                style={{
                    maxWidth: "95%",
                    backgroundColor: theme === 'dark' ? "#343a40" : "#f5f8fb",
                    borderRadius: 24,
                    padding: "30px",
                    zIndex: 2,
                }}
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <h1>{t("User management")}</h1>
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t("Column 1")}</InputGroup.Text>
                    <Form.Select value={searchColumn1} onChange={(e) => setSearchColumn1(e.target.value)}>
                        {columns.map((column) => (
                            <option key={column.field} value={column.field}>
                                {column.headerName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        type="text"
                        placeholder={t("Search term 1...")}
                        value={searchTerm1}
                        onChange={(e) => setSearchTerm1(e.target.value)}
                    />
                    <Form.Select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value as 'AND' | 'OR')}>
                        <option value="AND">{t("AND")}</option>
                        <option value="OR">{t("OR")}</option>
                    </Form.Select>
                    <InputGroup.Text>{t("Column 2")}</InputGroup.Text>
                    <Form.Select value={searchColumn2} onChange={(e) => setSearchColumn2(e.target.value)}>
                        {columns.map((column) => (
                            <option key={column.field} value={column.field}>
                                {column.headerName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        type="text"
                        placeholder={t("Search term 2...")}
                        value={searchTerm2}
                        onChange={(e) => setSearchTerm2(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearch}>{t("Search")}</Button>
                    <Button variant="secondary" onClick={handleClearFilters}>{t("Clear filters")}</Button>
                </InputGroup>
                <Paper sx={{ backgroundColor: theme === 'dark' ? "#5a636c" : "#f5f8fb"}}>
                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        hideFooterPagination
                        hideFooterSelectedRowCount
                        hideFooter
                        onCellClick={(e) => handleOpen(Number(e.id))}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
            <Button onClick={sendEmailToAll} className="mt-3">
                {t("Send email to all")}
            </Button>
            <UserEditModal open={open} handleClose={handleClose} selectedUser={selectedUser} handleUpdateUser={handleUpdateUser}/>
        </div>
    );
};
