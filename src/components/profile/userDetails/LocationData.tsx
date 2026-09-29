import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import {CountrySelect} from "../../signIn/CountrySelect.tsx";
import {useUserDetails} from "../../../utils/providers/UserDetailsProvider.tsx";

export const LocationData:FC = () => {
    const {t} = useTranslation();
    const {userDetails, setUserDetails, handleChange} = useUserDetails();

    const handleCountryChange = (country: string) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails!,
            country: country
        }));
    };

    if (userDetails !== undefined) {
        return (
            <>
                <h3 className="tw-mb-4 tw-text-lg sm:tw-text-xl lg:tw-text-2xl">{t("Location")}</h3>
                <Form className="tw-mb-6">
                    <Form.Group controlId="street" className="mb-4">
                        <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Street")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={userDetails.street}
                            onChange={handleChange}
                            className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                        />
                    </Form.Group>
                    <Form.Group controlId="streetNumber" className="mb-4">
                        <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Street number")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="street_number"
                            value={userDetails.street_number}
                            onChange={handleChange}
                            className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                        />
                    </Form.Group>
                    <Form.Group controlId="town" className="mb-4">
                        <Form.Label className="tw-mb-2 tw-text-sm tw-font-medium tw-text-stone-200 sm:tw-text-base">{t("Town")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="town"
                            value={userDetails.town}
                            onChange={handleChange}
                            className="tw-min-h-[44px] tw-text-sm sm:tw-text-base"
                        />
                    </Form.Group>
                    <Form.Group controlId="country" className="mb-4">
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
