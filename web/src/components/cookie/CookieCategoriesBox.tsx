import { FC } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface CookieCategoriesBoxProps {
  analyticsEnabled: boolean;
  onAnalyticsChange: (enabled: boolean) => void;
  idPrefix?: string;
  className?: string;
}

/**
 * Renders granular cookie category switches (Necessary & Analytics).
 */
export const CookieCategoriesBox: FC<CookieCategoriesBoxProps> = ({
  analyticsEnabled,
  onAnalyticsChange,
  idPrefix = "cookie",
  className = "",
}) => {
  const { t } = useTranslation();

  const necessaryId = `${idPrefix}-necessary-switch`;
  const analyticsId = `${idPrefix}-analytics-switch`;

  return (
    <div
      className={`tw-w-full tw-flex tw-flex-col tw-gap-3 tw-text-left tw-bg-stone-900/90 tw-border tw-border-stone-800 tw-rounded-xl tw-p-3 sm:tw-p-4 tw-text-xs sm:tw-text-sm ${className}`}
    >
      {/* Necessary cookies (always active) */}
      <div className="tw-flex tw-items-start tw-justify-between tw-gap-3">
        <div className="tw-flex-1 tw-min-w-0">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-font-semibold tw-text-white tw-mb-0.5">
            <span className="tw-text-xs sm:tw-text-sm">{t("Necessary cookies")}</span>
            <span className="tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[10px] sm:tw-text-[11px] tw-font-medium tw-bg-emerald-500/20 tw-text-emerald-400 tw-border tw-border-emerald-500/30">
              {t("Always active")}
            </span>
          </div>
          <p className="tw-text-stone-400 tw-text-xs tw-mb-0 tw-leading-relaxed">
            {t("Necessary cookies description")}
          </p>
        </div>
        <div className="tw-pt-0.5 tw-shrink-0">
          <Form.Check
            type="switch"
            id={necessaryId}
            checked={true}
            disabled={true}
            className="custom-switch"
            aria-label={t("Necessary cookies")}
          />
        </div>
      </div>

      <div className="tw-border-t tw-border-stone-800" />

      {/* Analytics cookies (PostHog - toggleable) */}
      <div className="tw-flex tw-items-start tw-justify-between tw-gap-3">
        <div className="tw-flex-1 tw-min-w-0">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-font-semibold tw-text-white tw-mb-0.5">
            <label
              htmlFor={analyticsId}
              className="tw-cursor-pointer tw-text-white tw-mb-0 hover:tw-text-[var(--secondary-color)] tw-transition-colors tw-text-xs sm:tw-text-sm"
            >
              {t("Analytics cookies (PostHog)")}
            </label>
            <span className="tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[10px] sm:tw-text-[11px] tw-font-medium tw-bg-[var(--secondary-color)]/20 tw-text-[var(--secondary-color)] tw-border tw-border-[var(--secondary-color)]/30">
              PostHog
            </span>
          </div>
          <p className="tw-text-stone-400 tw-text-xs tw-mb-0 tw-leading-relaxed">
            {t("Analytics cookies description")}
          </p>
        </div>
        <div className="tw-pt-0.5 tw-shrink-0">
          <Form.Check
            type="switch"
            id={analyticsId}
            checked={analyticsEnabled}
            onChange={(e) => onAnalyticsChange(e.target.checked)}
            className="custom-switch"
            aria-label={t("Analytics cookies (PostHog)")}
          />
        </div>
      </div>
    </div>
  );
};
