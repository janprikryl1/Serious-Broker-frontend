import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import {useUserDetails} from "../../../../utils/providers/UserDetailsProvider.tsx";
import {LanguageSelect} from "../../signIn/LanguageSelect.tsx";

export const PersonalDataEdit:FC = () => {
    const {t} = useTranslation();
    const {userDetails, handleChange, setUserDetails} = useUserDetails();
    
    const handleLanguageChange = (language: string) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails!,
            language: language
        }));
    };

    if (userDetails !== undefined) {
        return (
            <Form>
                <h3>{t("Profile")}</h3>
                <Form.Group controlId="titleBefore" className="mb-4">
                    <Form.Label>{t("Title before")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="title_before"
                        value={userDetails.title_before ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="firstname" className="mb-4">
                    <Form.Label>{t("Name")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={userDetails.firstname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="midlename" className="mb-4">
                    <Form.Label>{t("Middle name")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="midlename"
                        value={userDetails.midlename ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="surname" className="mb-4">
                    <Form.Label>{t("Surname")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="surname"
                        value={userDetails.surname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="titleAfter" className="mb-4">
                    <Form.Label>{t("Title after")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="title_after"
                        value={userDetails.title_after ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="email" className="mb-4">
                    <Form.Label>{t("Email")}</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="nickname" className="mb-4">
                    <Form.Label>{t("Nickname")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="nickname"
                        value={userDetails.nickname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="language" className="mb-4">
                    <Form.Label>{t("Language")}</Form.Label>
                    <LanguageSelect value={userDetails.language} setLanguage={handleLanguageChange}/>
                </Form.Group>
            </Form>
        )
    }
}
