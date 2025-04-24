import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Form, InputGroup } from "react-bootstrap";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import {UserEditModal} from "../../components/admin/userManagement/UserEditModal.tsx";
import {useAdminUserManagement} from "../../utils/hooks/admin/useAdminUserManagement.ts";

export const AdminUserManagement: FC = () => {
    const { t } = useTranslation();
    const {
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
    } = useAdminUserManagement();

    return (
        <div className="padding-bottom">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div className="service-details__content" data-aos="fade-up" data-aos-duration="900">
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
                        <UserEditModal open={isOpen} handleClose={closeModal} selectedUser={selectedUser} handleUpdateUser={handleUpdateUser}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
