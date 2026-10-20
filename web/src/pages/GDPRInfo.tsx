import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";

export const GdprInfo:FC = () => {
    const {t} = useTranslation();

    return (
      <>
          <TitleHeader title={t("GDPR")} />
          <div className="container tw-py-8">
              <div className="tw-mx-auto tw-flex tw-flex-col tw-gap-6 tw-text-sm tw-text-stone-200 sm:tw-text-base lg:tw-text-lg">
                  <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                      {t("Based on EU Regulation 2016/679 (GDPR), we inform you that we process your personal data in connection with marketing activities and the sale of our goods.")}
                  </p>

                  <div>
                      <h5 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
                          {t("What data we process and why")}
                      </h5>
                      <ul className="tw-flex tw-list-disc tw-flex-col tw-gap-2 tw-pl-6">
                          <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                              <strong>{t("Contract fulfillment and invoicing:")} </strong>
                              {t("We process contact and identification data (obtained via email, post, phone, or in person) to prepare and fulfill orders, handle deliveries, issue invoices, and manage potential complaints.")}
                          </li>
                          <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                              <strong>{t("Legal obligation:")} </strong>
                              {t("Invoicing data must be kept on record for 10 years due to a legal obligation under the VAT Act.")}
                          </li>
                          <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                              <strong>{t("Legitimate interest (Marketing):")} </strong>
                              {t("We also use contact data to send email offers, invitations, printed, and other promotional materials. You can opt out of these communications at any time via the link at the bottom of each message.")}
                          </li>
                      </ul>
                  </div>

                  <div>
                      <h5 className="tw-mb-2 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
                          {t("Your Rights")}
                      </h5>
                      <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                          {t("You have the right to request access to, correction, deletion, or restriction of processing of your personal data, object to processing, withdraw consent, and lodge a complaint with a supervisory authority.")}
                      </p>
                  </div>

                  <hr className="tw-text-stone-300" />

                  <div>
                      <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                          <strong>{t("Data Controller:")} </strong>
                          {t("Serious Investment s.r.o., with registered office at Stanislavského 355, 72100 Ostrava - Svinov")}
                      </p>
                      <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                          <strong>{t("Contact person for data protection:")} </strong>
                          Marie Fasugová ({t("Mobile")}: +420 603 242 708, fasugova@serious-investment.cz)
                      </p>
                  </div>
              </div>
          </div>
      </>
    );
}