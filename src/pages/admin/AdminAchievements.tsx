import {FC} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {DataGrid} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import {UserAchievementDetails} from "../../components/admin/achievments/UserAchievementDetails.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAdminAchievements} from "../../utils/hooks/admin/useAdminAchievements.ts";

export const AdminAchievements:FC = () => {
    const {t} = useTranslation();
    const {
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
    } = useAdminAchievements();
    
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
                            <Button className="mb-3" onClick={handleAddLongPeriodOfTimeAchievements}>{t("Give achievements for long period of time")}</Button>
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
                            <UserAchievementDetails selectedUser={selectedUser}/>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};
