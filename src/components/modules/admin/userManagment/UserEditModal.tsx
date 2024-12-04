import {ChangeEvent, FC, useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import { UserType } from "../../../../utils/types/user/userTypes";
import { useTranslation } from "react-i18next";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import { List } from "@mui/joy";
import { UserFormInput } from "./UserFormInput";
import { Button, InputGroup } from "react-bootstrap";
import {UserFormCheck} from "./UserFormCheck.tsx";
import {toCzechDateFormat} from "../../../../utils/constants/functions.ts";
import {MembershipManagement} from "./MembershipManagement.tsx";

type Props = {
    open: boolean;
    handleClose: () => void;
    selectedUser?: UserType;
    handleUpdateUser: (user: UserType) => void;
};

export const UserEditModal: FC<Props> = ({ open, handleClose, selectedUser, handleUpdateUser }) => {
    const { t } = useTranslation();
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [titleBefore, setTitleBefore] = useState("");
    const [firstname, setFirstname] = useState("");
    const [midlename, setMidlename] = useState("");
    const [surname, setSurname] = useState("");
    const [firmId, setFirmId] = useState("");
    const [firmName, setFirmName] = useState("");
    const [firmVat, setFirmVat] = useState("");
    const [titleAfter, setTitleAfter] = useState("");
    const [role, setRole] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [town, setTown] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");
    const [newsletterSubscription, setNewsletterSubscription] = useState(selectedUser?.newsletter_subscription || 0);
    const [receiveMessages, setReceiveMessages] = useState(selectedUser?.receive_messages || 0);
    const [verified, setVerified] = useState(selectedUser?.verified || 0);
    const [newPassword, setNewPassword] = useState<string>();

    useEffect(() => {
        if (selectedUser) {
            setNickname(selectedUser.nickname ?? "");
            setEmail(selectedUser.email ?? "");
            setTitleBefore(selectedUser.title_before ?? "");
            setFirstname(selectedUser.firstname ?? "");
            setMidlename(selectedUser.midlename ?? "");
            setSurname(selectedUser.surname ?? "");
            setFirmId(selectedUser.firm_id ?? "");
            setFirmName(selectedUser.firm_name ?? "");
            setFirmVat(selectedUser.firm_vat ?? "");
            setTitleAfter(selectedUser.title_after ?? "");
            setRole(selectedUser.role ?? "");
            setStreet(selectedUser.street ?? "");
            setStreetNumber(selectedUser.street_number ?? "");
            setTown(selectedUser.town ?? "");
            setCountry(selectedUser.country ?? "");
            setLanguage(selectedUser.language ?? "");
            setNewsletterSubscription(selectedUser.newsletter_subscription ?? 0);
            setReceiveMessages(selectedUser.receive_messages ?? 0);
            setVerified(selectedUser.verified ?? 0);
        }
    }, [selectedUser]);


    const handleSaveChanges = () => {
        if (selectedUser) {
            const updatedUser: UserType = {
                ...selectedUser,
                nickname,
                email,
                title_before: titleBefore,
                firstname,
                midlename,
                surname,
                firm_id: firmId,
                firm_name: firmName,
                firm_vat: firmVat,
                title_after: titleAfter,
                role,
                street,
                street_number: streetNumber,
                town,
                country,
                language,
                newsletter_subscription: newsletterSubscription,
                receive_messages: receiveMessages,
                verified,
                password: newPassword,
            };
            handleUpdateUser(updatedUser);
        }
    };

    const handleReceiveMessagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setReceiveMessages(isChecked ? 1 : 0);
        if (isChecked) {
            setNewsletterSubscription(0);
        }
    };
    
    const handleRecieveNewsletterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setNewsletterSubscription(isChecked ? 1 : 0);
        if (isChecked) {
            setReceiveMessages(0);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog layout="fullscreen" style={{ backgroundColor: "#101214" }}>
                <ModalClose onClick={handleClose} />
                <DialogTitle style={{ color: "white" }}>{t("Edit user")}</DialogTitle>
                <List
                    sx={[
                        {
                            mx: "calc(-1 * var(--ModalDialog-padding))",
                            px: "var(--ModalDialog-padding)",
                        },
                        !scroll ? {overflow: 'initial'} : {overflow: 'scroll'},
                    ]}
                >
                    {selectedUser ? (
                        <>
                            <UserFormInput label="Id" value={selectedUser.id} readOnly />
                            <UserFormInput label="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                            <UserFormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <UserFormInput label="Title before" value={titleBefore} onChange={(e) => setTitleBefore(e.target.value)} />
                            <UserFormInput label="Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            <UserFormInput label="Middle name" value={midlename} onChange={(e) => setMidlename(e.target.value)} />
                            <UserFormInput label="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            <UserFormInput label="Firm ID" value={firmId} onChange={(e) => setFirmId(e.target.value)} />
                            <UserFormInput label="Firm name" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                            <UserFormInput label="Firm VAT" value={firmVat} onChange={(e) => setFirmVat(e.target.value)} />
                            <UserFormInput label="Title after" value={titleAfter} onChange={(e) => setTitleAfter(e.target.value)} />
                            <UserFormInput label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                            <UserFormInput label="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                            <UserFormInput label="Street number" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
                            <UserFormInput label="Town" value={town} onChange={(e) => setTown(e.target.value)} />
                            <UserFormInput label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                            <UserFormInput label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                            <UserFormCheck
                                label="Newsletter"
                                value={newsletterSubscription}
                                onChange={handleRecieveNewsletterChange}
                            />
                            <UserFormCheck
                                label="I don't want any messages"
                                value={receiveMessages}
                                onChange={handleReceiveMessagesChange}
                            />
                            <UserFormCheck label="Verified" value={verified} onChange={(e) => setVerified(e.target.checked ? 1 : 0)} />
                            <UserFormInput label="Changed" value={toCzechDateFormat(selectedUser.changed)} readOnly />
                            <UserFormInput label="Created" value={toCzechDateFormat(selectedUser.created)} readOnly />
                            <InputGroup className="mb-3">
                                {newPassword === undefined ? <Button variant="warning" onClick={() => setNewPassword("")}>Změna hesla</Button> : <UserFormInput label="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>}
                            </InputGroup>
                            <MembershipManagement userId={selectedUser.id}/>
                            <InputGroup className="mb-3">
                                <Button variant="warning" onClick={handleSaveChanges}>
                                    {t("Update")}
                                </Button>
                            </InputGroup>
                        </>
                    ) : (
                        <p>{t("No user selected")}</p>
                    )}
                </List>
            </ModalDialog>
        </Modal>
    );
};
