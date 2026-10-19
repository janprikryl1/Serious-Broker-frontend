import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TitleHeader } from "../components/about/TitleHeader.tsx";
import { CookieSettingsManager } from "../components/cookie/CookieSettingsManager.tsx";

/**
 * Cookies Policy information page with embedded consent management controls.
 */
export const CookiesInfo: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TitleHeader title={t("Cookies Policy")} />
      <div className="container tw-py-8">
        <div className="tw-mx-auto tw-flex tw-flex-col tw-gap-8 tw-text-sm tw-text-stone-200 sm:tw-text-base lg:tw-text-lg">
          {/* Section 1: What are cookies? */}
          <div>
            <h5 className="tw-mb-2 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              1. {t("What are cookies?")}
            </h5>
            <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
              {t(
                "Cookies are small text files that are stored on your computer or device when you visit our website."
              )}
            </p>
          </div>

          {/* Section 2: Purpose of using cookies */}
          <div>
            <h5 className="tw-mb-2 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              2. {t("Purpose of using cookies")}
            </h5>
            <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
              {t(
                "We use cookies to ensure the effectiveness of your visits and purchases on our website. We also use them to make it easier for you to use our website and to understand your purchasing behaviour."
              )}
            </p>
          </div>

          {/* Section 3: How we use cookies */}
          <div>
            <h5 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              3. {t("How we use cookies")}
            </h5>
            <p className="tw-mb-2 tw-text-sm sm:tw-text-base lg:tw-text-lg">
              {t("We use cookies for the following purposes:")}
            </p>
            <ul className="tw-flex tw-list-disc tw-flex-col tw-gap-2 tw-pl-6">
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t("Retention of your login details.")}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t("Your identification when you log in to our website.")}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t("Information on offers and inquiries for companies and users.")}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t(
                  "Saving products placed in your shopping cart if you navigate between pages or end your session before completing a purchase."
                )}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t(
                  "Collecting information to send you promotional communications relevant to your interests."
                )}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t(
                  "Saving viewing preferences, such as preferred language, text size, page layout, or preferred colors."
                )}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t(
                  "Obtaining analytical information (e.g. number of visitors, most visited pages) for marketing and planning purposes."
                )}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t("Determining whether visitors easily adapt to changes on our website.")}
              </li>
            </ul>
          </div>

          {/* Section 4: Information collected through cookies */}
          <div>
            <h5 className="tw-mb-2 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              4. {t("Information collected through cookies")}
            </h5>
            <p className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
              {t(
                "Although cookies help us to collect information about how you use our website, we do not store any personal information in them. We only store a unique session identifier that helps us retrieve your preferences and user profile the next time you visit."
              )}
            </p>
          </div>

          {/* Section 5: Types of cookies */}
          <div>
            <h5 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              5. {t("Types of cookies")}
            </h5>
            <ul className="tw-flex tw-list-disc tw-flex-col tw-gap-2 tw-pl-6">
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                <strong>{t("Session cookies:")} </strong>
                {t(
                  "Stored temporarily on your device during a browsing session and removed when the browser is closed."
                )}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                <strong>{t("Persistent cookies:")} </strong>
                {t(
                  "Stored on your device for a longer period to identify you across multiple browsing sessions."
                )}
              </li>
            </ul>
          </div>

          {/* Section 6: Cookie management in browsers */}
          <div>
            <h5 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              6. {t("Cookie management")}
            </h5>
            <p className="tw-mb-2 tw-text-sm sm:tw-text-base lg:tw-text-lg">
              {t(
                "Most browsers offer the possibility to manage cookies in their settings, including options to:"
              )}
            </p>
            <ul className="tw-mb-4 tw-flex tw-list-disc tw-flex-col tw-gap-1 tw-pl-6">
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">{t("View stored cookies.")}</li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">{t("Enable or block cookies.")}</li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">{t("Disable all or specific cookies.")}</li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t("Clear all cookies when you close your browser.")}
              </li>
              <li className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
                {t("Show a notification when accepting a cookie.")}
              </li>
            </ul>
            <p className="tw-text-sm tw-text-stone-300 sm:tw-text-base lg:tw-text-lg">
              {t(
                "Please note that if you block our cookies, some features (like the shopping cart or order management) may not function properly. If you clear all cookies, your saved preferences will be removed."
              )}
            </p>
          </div>

          <hr className="tw-text-stone-300" />

          {/* Useful external links */}
          <div>
            <h6 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
              {t("Learn more about cookies")}
            </h6>
            <div className="tw-text-sm sm:tw-text-base lg:tw-text-lg">
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-secondary hover:tw-underline"
              >
                www.allaboutcookies.org
              </a>
              <br />
              <a
                href="https://www.youronlinechoices.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-secondary hover:tw-underline"
              >
                www.youronlinechoices.eu
              </a>
              <br />
              <a
                href="https://www.international-chamber.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-secondary hover:tw-underline"
              >
                www.international-chamber.co.uk
              </a>
              <br />
              <a
                href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-secondary hover:tw-underline"
              >
                www.cnil.fr
              </a>
            </div>
          </div>

          {/* Interactive cookie settings manager */}
          <CookieSettingsManager />
        </div>
      </div>
    </>
  );
};