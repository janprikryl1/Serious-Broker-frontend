import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../components/reusable/Button.tsx";
import {routes} from "../utils/constants";

type Props = {
    error: Error;
};

export const ErrorFallback: FC<Props> = ({error}) => {
    const {t} = useTranslation();
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="error404-page d-flex flex-column min-vh-100">
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div data-aos="fade-up" data-aos-duration="800">
                    <h2>
                        <span className="tw-text-secondary">{t("Whoops")}!</span> {t("There was an error")}
                    </h2>
                    <p className="tw-mb-16 tw--mt-2">{t("We are working on resolving this issue. Please try again later.")}</p>

                    <Button type="link" to={routes.home}>
                        {t("Back to home")}
                    </Button>
                </div>
            </div>

            <div className="container text-center mt-auto pb-4">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="btn trk-btn trk-btn--border trk-btn--primary trk-btn--outline tw-text-sm tw-text-white tw-p-2 hover:tw-bg-transparent"
                    aria-expanded={showDetails}
                >
                    {showDetails ? t("Hide details") : t("Show error details")}
                </button>

                {showDetails && (
                    <div className="error__details mt-3 text-start mx-auto text-center" style={{maxWidth: "700px"}}>
                        <pre>
                            {error.message}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
