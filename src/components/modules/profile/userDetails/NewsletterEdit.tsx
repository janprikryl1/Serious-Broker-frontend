import { Form } from "react-bootstrap";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { useUserDetails } from "../../../../utils/providers/UserDetailsProvider.tsx";

export const NewsletterEdit: FC = () => {
    const { t } = useTranslation();
    const { userDetails, setUserDetails } = useUserDetails();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setUserDetails((prevDetails) => {
            const updatedDetails = { ...prevDetails! };
            if (name === "newsletter_subscription") {
                updatedDetails.newsletter_subscription = checked ? 1 : 0;
                if (checked) {
                    updatedDetails.receive_messages = 0;
                }
            }
            if (name === "receive_messages") {
                updatedDetails.receive_messages = checked ? 1 : 0;
                if (checked) {
                    updatedDetails.newsletter_subscription = 0;
                }
            }
            return updatedDetails;
        });
    };

    return (
        <Form className="padding-bottom">
            <h3>{t("Newsletter")}</h3>
            <Form.Check
                checked={userDetails!.newsletter_subscription === 1}
                type="switch"
                label={t("Subscribe to newsletter")}
                name="newsletter_subscription"
                onChange={handleChange}
            />
            <Form.Check
                checked={userDetails!.receive_messages === 1}
                type="switch"
                label={t("I don't want any messages")}
                name="receive_messages"
                onChange={handleChange}
            />
        </Form>
    );
};
