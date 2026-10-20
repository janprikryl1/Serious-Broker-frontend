import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { showToast } from "../toast/toastHelper.tsx";
import {
  acceptCookies,
  declineCookies,
  resetCookieConsent,
  saveCookiePreferences,
  getConsentStatus,
  hasConsent,
} from "../../utils/posthog.ts";
import { CookieCategoriesBox } from "./CookieCategoriesBox.tsx";
import { CookieStatusBadge } from "./CookieStatusBadge.tsx";

/**
 * Self-contained cookie consent manager embedded in the Cookies Policy page.
 * Displays current consent status, category switches, and preference action buttons.
 */
export const CookieSettingsManager: FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"accepted" | "declined" | "undecided">(() =>
    getConsentStatus()
  );
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => hasConsent());

  const handleAcceptAll = () => {
    acceptCookies();
    setAnalyticsEnabled(true);
    setStatus("accepted");
    showToast.success(t("Cookies accepted"));
  };

  const handleSaveSelection = () => {
    saveCookiePreferences(analyticsEnabled);
    setStatus(analyticsEnabled ? "accepted" : "declined");
    showToast.success(t("Cookie preferences updated"));
  };

  const handleDeclineAll = () => {
    declineCookies();
    setAnalyticsEnabled(false);
    setStatus("declined");
    showToast.info(t("Cookies declined"));
  };

  const handleReset = () => {
    resetCookieConsent();
    setAnalyticsEnabled(false);
    setStatus("undecided");
    showToast.info(t("Preferences reset"));
  };

  return (
    <div className="tw-border-t tw-border-stone-800 tw-pt-6">
      <h5 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-white sm:tw-text-lg lg:tw-text-xl">
        {t("Change cookie settings")}
      </h5>
      <p className="tw-mb-4 tw-text-sm sm:tw-text-base">
        {t("Here you can change your consent to the collection of cookies and analytics data.")}
      </p>

      {/* Current consent status badge */}
      <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
        <span className="tw-text-sm tw-text-stone-300 tw-font-medium">
          {t("Consent status")}:
        </span>
        <CookieStatusBadge status={status} />
      </div>

      {/* Granular category switches */}
      <CookieCategoriesBox
        analyticsEnabled={analyticsEnabled}
        onAnalyticsChange={setAnalyticsEnabled}
        idPrefix="page"
        className="tw-max-w-xl tw-mb-6"
      />

      {/* Responsive action buttons */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-flex-wrap tw-items-stretch sm:tw-items-center tw-gap-2.5 sm:tw-gap-3 tw-w-full sm:tw-w-auto">
        <Button
          color={ButtonColor.gold}
          style={{
            fontSize: "0.875rem",
            padding: "0.55rem 0.85rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          className="primary tw-w-full sm:tw-w-auto"
          onClick={handleAcceptAll}
        >
          {t("Accept all")}
        </Button>
        <Button
          color={ButtonColor.transparent}
          style={{
            border: "1px solid var(--secondary-color)",
            color: "var(--white-color)",
            fontSize: "0.875rem",
            padding: "0.55rem 0.85rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          shadow={false}
          className="primary tw-w-full sm:tw-w-auto"
          onClick={handleSaveSelection}
        >
          {t("Save selection")}
        </Button>
        <Button
          color={ButtonColor.transparent}
          style={{
            border: "1px solid #52525b",
            color: "var(--white-color)",
            fontSize: "0.875rem",
            padding: "0.55rem 0.85rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          shadow={false}
          className="primary tw-w-full sm:tw-w-auto"
          onClick={handleDeclineAll}
        >
          {t("Decline all")}
        </Button>
        <Button
          color={ButtonColor.transparent}
          style={{
            border: "1px solid #3f3f46",
            color: "var(--gray-1-color)",
            fontSize: "0.875rem",
            padding: "0.55rem 0.85rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          shadow={false}
          className="primary tw-w-full sm:tw-w-auto"
          onClick={handleReset}
        >
          {t("Reset preferences")}
        </Button>
      </div>
    </div>
  );
};
