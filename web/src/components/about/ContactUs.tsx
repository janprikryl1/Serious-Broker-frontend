import {FC, FormEvent} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "../reusable/Button.tsx";
import "../../styles/sass/components/contact_us.scss";
import {addFeedback} from "../../utils/api/feedbackService.ts";
import dotMesh from "../../utils/icons/about/dot_mesh.svg";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

export const ContactUs: FC = () => {
  const {t} = useTranslation();

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") ?? "").toString();
    const email = (formData.get("email") ?? "").toString();
    const message = (formData.get("message") ?? "").toString();

    try {
      const response = await addFeedback({name, email, message});
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
    <div className="tw-bg-white">
      <div className="container tw-pt-14 tw-pb-10 tw-mt-20 tw-text-black">
        <h4 className="tw-text-black">{t("Contact us")}</h4>
        <p className="tw-mb-10 tw-text-stone-600">{t("If you want to learn more about our work or have any questions, feel free to send us a message.")}</p>

        <form onSubmit={handleSendMessage}>
          <input type="email" name="email"
                 className="contact-input tw-mb-6 tw-min-w-[300px]"
                 placeholder={t("E-mail")}
                 required />
          <textarea cols={30} rows={5} name="message" className="contact-input" placeholder={t("Leave a message...")} required/>

          <div>
            <Button type="submit">{t("Send")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
