import {FC, useEffect, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {DataGrid, GridCellParams} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";
import {UserType} from "../../utils/types/user/userTypes.ts";
import {UserAchievmentDetails} from "../../components/modules/admin/achevments/UserAchievmentDetails.tsx";
import {Button, ButtonColor} from "../../components/Button.tsx";
import {getAllUsers} from "../../utils/api/adminService.ts";


export const AdminAchivments:FC = () => {
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
                            <h1 className="admin-section-title">{t("Achievments management")}</h1>
                            <p>{t("Click on user to load and edit achievements")}</p>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">{t("Column")}</InputGroup.Text>
                                <Form.Select
                                    value={searchColumn}
                                    onChange={(e) => setSearchColumn(e.target.value)}
                                    aria-label={t("Search Column")}
                                >
                                    {columns.map((column) => (
                                        <option key={column.field} value={column.field}>
                                            {column.headerName}
                                        </option>
                                    ))}
                                </Form.Select>
                                <InputGroup.Text id="inputGroup-sizing-sm">{t("Value")}</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder={t("Search term...")}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button onClick={handleSearch}>
                                    {t("Search")}
                                </Button>
                                <Button color={ButtonColor.red} onClick={handleClearFilters}>
                                    {t("Clear filters")}
                                </Button>
                            </InputGroup>
                            <DataGrid
                                rows={filteredUsers}
                                columns={columns}
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                hideFooter={true}
                                onCellClick={handleSelectUser}
                                sx={{border: 0, color:"#fff"}}
                            />
                            <UserAchievmentDetails selectedUser={selectedUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
