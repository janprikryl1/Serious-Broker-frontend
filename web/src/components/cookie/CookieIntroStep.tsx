import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { routes } from "../../utils/constants";
import { Button, ButtonColor } from "../reusable/Button.tsx";

interface CookieIntroStepProps {
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onCustomize: () => void;
  onClose: () => void;
}

/**
 * Step 1: Initial cookie consent dialog with accept, decline, and customize actions.
 */
export const CookieIntroStep: FC<CookieIntroStepProps> = ({
  onAcceptAll,
  onDeclineAll,
  onCustomize,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center tw-text-center tw-gap-3 tw-w-full">
      {/* Header bar with icon and close button */}
      <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
        <span className="tw-text-2xl sm:tw-text-3xl" role="img" aria-label="cookie">
          🍪
        </span>
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

      <h4 className="tw-mb-0 tw-text-lg sm:tw-text-xl tw-font-bold tw-text-white tw-leading-tight">
        {t("Cookies & Analytics")}
      </h4>

      <p className="tw-text-xs sm:tw-text-sm tw-text-stone-300 tw-leading-relaxed tw-mb-2">
        {t("We use cookies and PostHog to analyze traffic and enhance your browsing experience.")}{" "}
        <Link
          to={routes.cookiesInfo}
          target="_blank"
          rel="noopener noreferrer"
          className="tw-text-[var(--secondary-color)] hover:tw-underline tw-font-medium tw-whitespace-nowrap"
        >
          {t("Cookies Policy")} ↗
        </Link>
      </p>

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
          onClick={onCustomize}
        >
          {t("Customize")}
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
