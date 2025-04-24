import {FC, useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import { List } from "@mui/joy";
import { InputGroup } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { UserFormInput } from "./UserFormInput";
import { UserFormCheck } from "./UserFormCheck.tsx";
import { MembershipManagement } from "./MembershipManagement.tsx";
import { UserRole, UserType } from "../../../utils/types/user/userTypes.ts";
import { Button } from "../../reusable/Button.tsx";
import { toCzechDateFormat } from "../../../utils/functions/dateFunctions.ts";
import {editUserDefaultValues} from "../../../utils/constants/defaultContent.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    selectedUser?: UserType;
    handleUpdateUser: (user: UserType) => void;
};

export const UserEditModal: FC<Props> = ({ open, handleClose, selectedUser, handleUpdateUser }) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<UserType>({defaultValues: editUserDefaultValues});
    const [showPasswordField, setShowPasswordField] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            reset({
                ...selectedUser,
                password: undefined
            });
            setShowPasswordField(false);
        }
    }, [selectedUser, reset]);

    const onSubmit = (data: UserType) => {
        if (selectedUser) {
            const updatedUser: UserType = {
                ...selectedUser,
                ...data,
            };
            handleUpdateUser(updatedUser);
            handleClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog layout="fullscreen" style={{ backgroundColor: "#101214" }}>
                <ModalClose onClick={handleClose} />
                <DialogTitle style={{ color: "white" }}>{t("Edit user")}</DialogTitle>
                <List sx={[{mx: "calc(-1 * var(--ModalDialog-padding))", px: "var(--ModalDialog-padding)"}, { overflow: 'auto' }]}
                >
                    {selectedUser ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <UserFormInput label="Id" value={selectedUser.id} readOnly />
                            <Controller
                                name="nickname"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Nickname" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Email" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="title_before"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Title before" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="firstname"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Name" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="midlename"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Middle name" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="surname"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Surname" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="firm_id"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Firm ID" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="firm_name"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Firm name" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="firm_vat"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Firm VAT" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="title_after"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Title after" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput
                                        label="Role"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value as UserRole)}
                                    />
                                )}
                            />
                            <Controller
                                name="street"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Street" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="street_number"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Street number" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="town"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Town" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Country" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="language"
                                control={control}
                                render={({ field }) => (
                                    <UserFormInput label="Language" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <Controller
                                name="newsletter_subscription"
                                control={control}
                                render={({ field }) => (
                                    <UserFormCheck
                                        label="Newsletter"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                            <Controller
                                name="receive_messages"
                                control={control}
                                render={({ field }) => (
                                    <UserFormCheck
                                        label="I don't want any messages"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                            <Controller
                                name="verified"
                                control={control}
                                render={({ field }) => (
                                    <UserFormCheck
                                        label="Verified"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                            <UserFormInput
                                label="Changed"
                                value={toCzechDateFormat(selectedUser.changed)}
                                readOnly
                            />
                            <UserFormInput
                                label="Created"
                                value={toCzechDateFormat(selectedUser.created)}
                                readOnly
                            />
                            <InputGroup className="mb-3">
                                {!showPasswordField ? (
                                    <Button onClick={() => setShowPasswordField(true)}>Změna hesla</Button>
                                ) : (
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <UserFormInput label="Password" value={field.value || ""} onChange={field.onChange} />
                                        )}
                                    />
                                )}
                            </InputGroup>
                            <MembershipManagement userId={selectedUser.id} />
                            <InputGroup className="mb-3">
                                <Button type="submit">
                                    {t("Update")}
                                </Button>
                            </InputGroup>
                        </form>
                    ) : (
                        <p>{t("No user selected")}</p>
                    )}
                </List>
            </ModalDialog>
        </Modal>
    );
};