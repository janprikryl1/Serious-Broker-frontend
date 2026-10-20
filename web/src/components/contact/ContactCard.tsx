import {FC} from "react";
import {useTranslation} from "react-i18next";
import {addFeedback} from "../../utils/api/feedbackService.ts";
import {contactEmail, phoneNumber} from "../../utils/constants";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {FaBuilding, FaEnvelope} from "react-icons/fa6";
import {FaPhoneAlt} from "react-icons/fa";
import {GlassCard} from "../reusable/GlassCard.tsx";
import {Button} from "../reusable/Button.tsx";
import {captureEvent} from "../../utils/posthog.ts";

const contactInputClass =
  "tw-w-full tw-bg-stone-900/60 tw-border tw-border-stone-700 tw-rounded-lg tw-px-3 tw-py-2.5 " +
  "tw-text-sm tw-text-stone-100 placeholder:tw-text-stone-500 focus:tw-border-secondary focus:tw-outline-none tw-transition-colors";

export const ContactCard: FC = () => {
  const {t} = useTranslation();

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") ?? "").toString();
    const email = (formData.get("email") ?? "").toString();
    const message = (formData.get("message") ?? "").toString();

    try {
      const response = await addFeedback({name, email, message});
      if (response.data.message === "Message created") {
        captureEvent('contact_form_submitted', { email });
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
    <div className="container tw-py-8">
      <GlassCard bgColor="var(--secondary-color)" shrinkPadding={true}>
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8 ">

        {/* Levý blok: Firemní údaje */}
        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-border-b tw-border-stone-800 tw-pb-4">
            <h5 className="tw-text-white tw-font-bold tw-text-base sm:tw-text-lg md:tw-text-xl tw-tracking-wide">
              Serious Investment s.r.o.
            </h5>
            <p className="tw-text-stone-400 tw-mt-1 tw-text-sm sm:tw-text-base md:tw-text-lg">
              Stanislavského 355, 721 00 Ostrava-Svinov, {t("Czech Republic")}
            </p>
          </div>

          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-3 tw-text-sm">
            <div className="tw-bg-stone-800/40 tw-p-3 tw-rounded-lg tw-border tw-border-stone-800">
              <span className="tw-text-stone-400 tw-block tw-text-xs">{t("Company ID (IČO):")}</span>
              <strong className="tw-text-white font-mono">29456568</strong>
            </div>

            <div className="tw-bg-stone-800/40 tw-p-3 tw-rounded-lg tw-border tw-border-stone-800">
              <span className="tw-text-stone-400 tw-block tw-text-xs">{t("VAT ID (DIČ):")}</span>
              <strong className="tw-text-white font-mono">CZ29456568</strong>
            </div>

            <div className="tw-bg-stone-800/40 tw-p-3 tw-rounded-lg tw-border tw-border-stone-800 sm:tw-col-span-2">
              <span className="tw-text-stone-400 tw-block tw-text-xs">{t("Data Box ID:")}</span>
              <strong className="tw-text-white font-mono">gw2mvge</strong>
            </div>
          </div>

          <div className="tw-flex tw-items-start tw-gap-2.5 tw-text-xs tw-text-stone-400 tw-mt-2">
            <FaBuilding className="tw-text-stone-500 tw-shrink-0 tw-mt-0.5" />
            <p>
              {t("Registered in the Commercial Register kept by the Regional Court in Ostrava, Section C, Insert 54906.")}
            </p>
          </div>
        </div>

        {/* Pravý blok: Kontakty */}
        <div className="tw-flex tw-flex-col tw-justify-between tw-gap-6 tw-bg-stone-800/30 tw-p-6 tw-rounded-xl tw-border tw-border-stone-800/80">
          <div>
            <h6 className="tw-text-white tw-font-semibold tw-text-lg tw-mb-4">
              {t("Contact Us")}
            </h6>

            <div className="tw-flex tw-flex-col tw-gap-6 sm:tw-gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-4 sm:tw-p-3 sm:tw-rounded-lg sm:tw-bg-stone-800/50 sm:hover:tw-bg-stone-800 sm:tw-border sm:tw-border-stone-700 sm:tw-bg-opacity-50 tw-text-stone-200 hover:tw-text-secondary tw-transition-all tw-group"
              >
                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-secondary/10 tw-text-secondary tw-flex tw-items-center tw-justify-center group-hover:tw-scale-110 tw-transition-transform">
                  <FaPhoneAlt size={16} />
                </div>
                <div>
                  <span className="tw-block tw-text-xs tw-text-stone-400">{t("Phone")}</span>
                  <span className="tw-font-medium tw-text-sm sm:tw-text-base md:tw-text-lg">{phoneNumber}</span>
                </div>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-4 sm:tw-p-3 sm:tw-rounded-lg sm:tw-bg-stone-800/50 sm:hover:tw-bg-stone-800 sm:tw-border sm:tw-border-stone-700 sm:tw-bg-opacity-50 tw-text-stone-200 hover:tw-text-secondary tw-transition-all tw-group"
              >
                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-secondary/10 tw-text-secondary tw-flex tw-items-center tw-justify-center group-hover:tw-scale-110 tw-transition-transform">
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <span className="tw-block tw-text-xs tw-text-stone-400">{t("Email")}</span>
                  <span className="tw-font-medium tw-break-all tw-text-sm sm:tw-text-base md:tw-text-lg">{contactEmail}</span>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="tw-flex tw-flex-col tw-gap-3">
            <input
              type="text"
              name="name"
              className={contactInputClass}
              placeholder={t("Name")}
              autoComplete="name"
              required
            />
            <input
              type="email"
              name="email"
              className={contactInputClass}
              placeholder={t("E-mail")}
              autoComplete="email"
              required
            />
            <textarea
              name="message"
              rows={4}
              className={`${contactInputClass} tw-resize-y`}
              placeholder={t("Leave a message...")}
              required
            />
            <div>
              <Button type="submit">{t("Send")}</Button>
            </div>
          </form>
        </div>

      </div>
      </GlassCard>
    </div>
  );
};
