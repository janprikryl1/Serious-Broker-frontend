import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    error: Error;
};

export const ErrorFallback: FC<Props> = ({ error }) => {
    const { t } = useTranslation();
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="error padding-top padding-bottom">
                    <div className="container">
                        <div className="error__wrapper">
                            <div data-aos="fade-up" data-aos-duration="800">
                                <div className="error__content text-center">
                                    <h2>
                                        <span>ooops!</span> {t("There was an error")}
                                    </h2>
                                    <p>{t("We are working on resolving this issue. Please try again later.")}</p>

                                    <a
                                        href="/"
                                        className="trk-btn trk-btn--border trk-btn--primary mt-3"
                                    >
                                        {t("Back to home")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center mt-auto pb-4">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="trk-btn trk-btn--small"
                    aria-expanded={showDetails}
                >
                    {showDetails ? t("Hide details") : t("Show error details")}
                </button>

                {showDetails && (
                    <div className="error__details mt-3 text-start mx-auto text-center" style={{ maxWidth: "700px" }}>
                        <pre>
                            {error.message}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
