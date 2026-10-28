import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { CookieCategoriesBox } from "./CookieCategoriesBox.tsx";

interface CookieCustomizeStepProps {
  analyticsEnabled: boolean;
  onAnalyticsChange: (enabled: boolean) => void;
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onSaveSelection: () => void;
  onBack: () => void;
  onClose: () => void;
}

/**
 * Step 2: Granular cookies customization with switches for each category.
 */
export const CookieCustomizeStep: FC<CookieCustomizeStepProps> = ({
  analyticsEnabled,
  onAnalyticsChange,
  onAcceptAll,
  onDeclineAll,
  onSaveSelection,
  onBack,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center tw-text-center tw-gap-3 tw-w-full">
      {/* Top header with Back and Close buttons */}
      <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
        <button
          type="button"
          onClick={onBack}
          className="tw-text-stone-300 hover:tw-text-white tw-transition-colors tw-bg-transparent tw-border-0 tw-p-1.5 tw-cursor-pointer tw-flex tw-items-center tw-gap-1.5 tw-text-xs sm:tw-text-sm -tw-ml-1"
          aria-label={t("Back")}
        >
          <IoArrowBack size={18} />
          <span>{t("Back")}</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="tw-text-stone-400 hover:tw-text-white tw-transition-colors tw-bg-transparent tw-border-0 tw-p-1.5 tw-cursor-pointer tw-flex tw-items-center -tw-mr-1"
          aria-label={t("Close") || "Close"}
          title={t("Close") || "Close"}
        >
          <IoClose size={22} />
        </button>
      </div>

      <h2 id="cookie-consent-title" className="tw-mb-0 tw-text-lg sm:tw-text-xl tw-font-bold tw-text-white tw-leading-tight">
        {t("Customize cookies")}
      </h2>

      <p className="tw-text-xs sm:tw-text-sm tw-text-stone-300 tw-leading-relaxed tw-mb-1">
        {t("Select which cookies you want to allow.")}
      </p>

      {/* Category switches box */}
      <CookieCategoriesBox
        analyticsEnabled={analyticsEnabled}
        onAnalyticsChange={onAnalyticsChange}
        idPrefix="modal"
      />

      {/* Responsive action buttons */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-stretch sm:tw-items-center tw-justify-between tw-gap-2 sm:tw-gap-2.5 tw-w-full tw-mt-2">
        <Button
          color={ButtonColor.transparent}
          style={{
            border: "1px solid #52525b",
            color: "var(--white-color)",
            fontSize: "0.875rem",
            padding: "0.55rem 0.75rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          shadow={false}
          className="primary tw-w-full sm:tw-flex-1 tw-order-3 sm:tw-order-1"
          onClick={onDeclineAll}
        >
          {t("Decline all")}
        </Button>
        <Button
          color={ButtonColor.transparent}
          style={{
            border: "1px solid var(--secondary-color)",
            color: "var(--white-color)",
            fontSize: "0.875rem",
            padding: "0.55rem 0.75rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          shadow={false}
          className="primary tw-w-full sm:tw-flex-1 tw-order-2 sm:tw-order-2"
          onClick={onSaveSelection}
        >
          {t("Save selection")}
        </Button>
        <Button
          color={ButtonColor.gold}
          style={{
            fontSize: "0.875rem",
            padding: "0.55rem 0.75rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.5px",
          }}
          className="primary tw-w-full sm:tw-flex-1 tw-order-1 sm:tw-order-3"
          onClick={onAcceptAll}
        >
          {t("Accept all")}
        </Button>
      </div>
    </div>
  );
};
