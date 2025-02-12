import { FC, useEffect, useState } from "react";
import {UserRole, UserType} from "../../utils/types/user/userTypes.ts";
import { getAllUsers, updateUser } from "../../api/adminService.ts";
import { useTranslation } from "react-i18next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UserEditModal } from "../../components/modules/admin/userManagment/UserEditModal.tsx";
import Swal from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";
import {Button, ButtonColor} from "../../components/Button.tsx";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {routes} from "../../utils/constants";
import {useNavigate} from "react-router-dom";

export const UserManagment: FC = () => {
    const { t } = useTranslation();
    const {user} = useUserContext();
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserType[]>([]);
    const [open, setOpen] = useState(false);
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div
                            className="service-details__content"
                            data-aos="fade-up"
                            data-aos-duration="900"
                        >
                            <h1 className="admin-section-title">{t("User management")}</h1>
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
                                <Button color={ButtonColor.yellow} onClick={handleSearch}>{t("Search")}</Button>
                                <Button color={ButtonColor.red} onClick={handleClearFilters}>{t("Clear filters")}</Button>
                            </InputGroup>
                            <DataGrid
                                rows={filteredUsers}
                                columns={columns}
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                hideFooter
                                onCellClick={(e) => handleOpen(Number(e.id))}
                                sx={{ border: 0, color:"#fff" }}
                            />
                        </div>
                        <Button onClick={sendEmailToAll} className="mt-3">
                            {t("Send email to all")}
                        </Button>
                        <UserEditModal open={open} handleClose={handleClose} selectedUser={selectedUser} handleUpdateUser={handleUpdateUser}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
