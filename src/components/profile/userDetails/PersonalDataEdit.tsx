import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import {LanguageSelect} from "../../signIn/LanguageSelect.tsx";
import {useUserDetails} from "../../../utils/providers/UserDetailsProvider.tsx";

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
            <Form className="tw-mb-6">
                <h3 className="tw-mb-4 tw-text-lg sm:tw-text-xl lg:tw-text-2xl">{t("Profile")}</h3>
                <Form.Group controlId="titleBefore" className="mb-4">
                    <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("title_before")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="title_before"
                        value={userDetails.title_before ?? ""}
                        onChange={handleChange}
                        className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                    />
                </Form.Group>
                <Form.Group controlId="firstname" className="mb-4">
                    <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Name")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={userDetails.firstname}
                        onChange={handleChange}
                        className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                    />
                </Form.Group>
                <Form.Group controlId="surname" className="mb-4">
                    <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Surname")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="surname"
                        value={userDetails.surname}
                        onChange={handleChange}
                        className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                    />
                </Form.Group>
                <Form.Group controlId="titleAfter" className="mb-4">
                    <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Suffix")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="title_after"
                        value={userDetails.title_after ?? ""}
                        onChange={handleChange}
                        className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                    />
                </Form.Group>
                <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Email")}</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                    />
                </Form.Group>
                <Form.Group controlId="nickname" className="mb-4">
                    <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Nickname")}</Form.Label>
                    <Form.Control
                        type="text"
                        name="nickname"
                        value={userDetails.nickname}
                        onChange={handleChange}
                        className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                    />
                </Form.Group>
                <Form.Group controlId="language" className="mb-4">
                    <LanguageSelect value={userDetails.language} setLanguage={handleLanguageChange}/>
                </Form.Group>
            </Form>
        )
    }
}
