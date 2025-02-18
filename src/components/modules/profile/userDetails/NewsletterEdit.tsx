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
                updatedDetails.newsletter_subscription = checked;
                if (checked) {
                    updatedDetails.receive_messages = false;
                }
            }
            if (name === "receive_messages") {
                updatedDetails.receive_messages = checked;
                if (checked) {
                    updatedDetails.newsletter_subscription = false;
                }
            }
            return updatedDetails;
        });
    };

    return (
        <Form className="padding-bottom">
            <h3>{t("Newsletter")}</h3>
            <Form.Check
                checked={userDetails!.newsletter_subscription}
                type="switch"
                label={t("Subscribe to newsletter")}
                name="newsletter_subscription"
                onChange={handleChange}
            />
            <Form.Check
                checked={userDetails!.receive_messages}
                type="switch"
                label={t("I don't want any messages")}
                name="receive_messages"
                onChange={handleChange}
            />
        </Form>
    );
};
