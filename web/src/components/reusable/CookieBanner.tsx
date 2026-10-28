import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { routes } from "../../utils/constants";
import {
  acceptCookies,
  declineCookies,
  saveCookiePreferences,
  isConsentDecided,
  hasConsent,
} from "../../utils/posthog.ts";
import { CookieIntroStep } from "../cookie/CookieIntroStep.tsx";
import { CookieCustomizeStep } from "../cookie/CookieCustomizeStep.tsx";

/**
 * Centered two-step Cookie Consent modal dialog.
 * Step 1: Initial Accept all / Decline all / Customize choice.
 * Step 2: Granular switches for Necessary and Analytics cookies.
 */
export const CookieBanner: FC = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"intro" | "customize">("intro");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  // Avoid overlaying the modal if user is already viewing the cookies policy page
  const isCookiesPage = location.pathname.startsWith(routes.cookiesInfo);

  useEffect(() => {
    if (!isConsentDecided()) {
      setShow(true);
    } else {
      setAnalyticsEnabled(hasConsent());
    }
  }, []);

  const handleAcceptAll = () => {
    acceptCookies();
    setAnalyticsEnabled(true);
    setShow(false);
    setStep("intro");
  };

  const handleDeclineAll = () => {
    declineCookies();
    setAnalyticsEnabled(false);
    setShow(false);
    setStep("intro");
  };

  const handleSaveSelection = () => {
    saveCookiePreferences(analyticsEnabled);
    setShow(false);
    setStep("intro");
  };

  const handleClose = () => {
    setShow(false);
    setStep("intro");
  };

  if (!show || isCookiesPage) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="cookie-consent-title"
      centered
      backdrop={true}
      keyboard={true}
      dialogClassName="cookie-consent-modal"
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <Modal.Body className="tw-p-1 sm:tw-p-2 tw-w-full">
        {step === "intro" ? (
          <CookieIntroStep
            onAcceptAll={handleAcceptAll}
            onDeclineAll={handleDeclineAll}
            onCustomize={() => setStep("customize")}
            onClose={handleClose}
          />
        ) : (
          <CookieCustomizeStep
            analyticsEnabled={analyticsEnabled}
            onAnalyticsChange={setAnalyticsEnabled}
            onAcceptAll={handleAcceptAll}
            onDeclineAll={handleDeclineAll}
            onSaveSelection={handleSaveSelection}
            onBack={() => setStep("intro")}
            onClose={handleClose}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
