import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../reusable/Button.tsx";
import "../../styles/sass/components/ContactUs.scss";
import {addFeedback} from "../../utils/api/feedbackService.ts";
import dotMesh from "../../utils/icons/about/dot_mesh.svg";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

export const ContactUs: FC = () => {
    const { t } = useTranslation();

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = (formData.get("name") ?? "").toString();
        const email = (formData.get("email") ?? "").toString();
        const message = (formData.get("message") ?? "").toString();

        try {
            const response = await addFeedback({ name, email, message });
            if (response.data.message === "Message created") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Success"),
                    text: t("Message sent"),
                });
                if (event.currentTarget) event.currentTarget.reset();
            }
        } catch (error) {
            console.error(error);
            CustomSwal.fire({
                icon: "error",
                title: t("Failed"),
                text: t("Please try again later"),
            });
        }
    };

    return (
        <div className="position-relative cta-dark">
            <div className="position-relative cta-dark" style={{
                backgroundImage: `url(${dotMesh})`,
                backgroundSize: '2000px',
                backgroundPosition: 'center 700px',
            }}>
                <div className="container">
                <h2 className="index-title">{t("Contact us")}</h2>
                <p>{t("If you want to learn more about our work or have any questions, feel free to send us a message.")}</p>

                    <form onSubmit={handleSendMessage}>
                        <input type="email" name="email" className="contact-input" placeholder="E-mail"/>
                        <textarea cols={30} rows={5} name="message" className="contact-input"
                                  placeholder={t("Leave a message...")} required/>
        
                        <div className="contact-button-wrapper">
                            <Button type="submit" style={{fontWeight: 600, fontSize: 20}}>{t("Send")}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
