import {Form} from "react-bootstrap";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useUserDetails} from "../../../../utils/providers/UserDetailsProvider.tsx";

export const NewsletterEdit:FC = () => {
    const {t} = useTranslation();
    const {userDetails, handleChange} = useUserDetails();
    
    return (
      <Form className="padding-bottom">
          <h3>{t("Newsletter")}</h3>
          <Form.Check
              checked={userDetails!.newsletter_subscription == 1}
              type="switch"
              label={t("Subscribe to newsletter")}
              name="newsletter_subscription"
              onChange={handleChange}
          />
          <Form.Check
              checked={userDetails!.receive_messages == 1}
              type="switch"
              label={t("I don't want any messages")}
              name="receive_messages"
              onChange={handleChange}
          />
      </Form>
  );
};