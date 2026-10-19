import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CookieStatusBadgeProps {
  status: "accepted" | "declined" | "undecided";
}

/**
 * Renders a visual badge representing the current cookie consent decision.
 */
export const CookieStatusBadge: FC<CookieStatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  if (status === "accepted") {
    return (
      <span className="tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-bg-emerald-500/20 tw-text-emerald-400 tw-border tw-border-emerald-500/30">
        ✓ {t("Cookies accepted")}
      </span>
    );
  }

  if (status === "declined") {
    return (
      <span className="tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-bg-rose-500/20 tw-text-rose-400 tw-border tw-border-rose-500/30">
        ✕ {t("Cookies declined")}
      </span>
    );
  }

  return (
    <span className="tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-bg-stone-700/40 tw-text-stone-300 tw-border tw-border-stone-600">
      {t("Undecided")}
    </span>
  );
};
