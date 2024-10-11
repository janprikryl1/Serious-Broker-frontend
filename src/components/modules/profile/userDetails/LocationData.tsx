import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import {useUserDetails} from "../../../../utils/providers/UserDetailsProvider.tsx";
import {CountrySelect} from "../../signIn/CountrySelect.tsx";

export const LocationData:FC = () => {
    const {t} = useTranslation();
    const {userDetails, setUserDetails, handleChange} = useUserDetails();

    const handleCountryChange = (country: string) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails!,
            country: country
        }));
    };

    if (userDetails !== null) {
        return (
            <>
                <h3>{t("Location")}</h3>
                <Form>
                    <Form.Group controlId="street">
                        <Form.Label>{t("Street")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={userDetails.street}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="streetNumber">
                        <Form.Label>{t("Street number")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="street_number"
                            value={userDetails.street_number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="town">
                        <Form.Label>{t("Town")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="town"
                            value={userDetails.town}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>{t("Country")}</Form.Label>
                        <CountrySelect
                            value={userDetails.country}
                            setCountry={handleCountryChange}
                        />
                    </Form.Group>
                </Form>
            </>
        );
    }
}
