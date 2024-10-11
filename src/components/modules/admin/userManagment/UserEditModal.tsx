import {FC} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {UserType} from "../../../../utils/types/user/userTypes.ts";
import {useTranslation} from "react-i18next";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

type Props = {
    open: boolean;
    handleClose: () => void;
    selectedUser?: UserType;
}

export const UserEditModal:FC<Props> = ({open, handleClose, selectedUser}) => {
    const {t} = useTranslation();
    
    return (
            <Modal open={open} onClose={handleClose}>
                <Box className="modal-container">
                    <h2 id="parent-modal-title">{t("Edit user")}</h2>
                    {selectedUser ? (
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={selectedUser.nickname}
                            />
                        </InputGroup>
                        
                    ) : <p>{t("No user selected")}</p>}
                </Box>
            </Modal>
    );
}