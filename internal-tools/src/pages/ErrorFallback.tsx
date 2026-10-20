import { type FC, useState } from "react";
import type { FallbackProps } from "react-error-boundary"


export const ErrorFallback: FC<FallbackProps> = ({ error }) => {
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
                                        <span>ooops!</span> Nastala chyba
                                    </h2>
                                    <p>Pracujeme na opravě problému, zkuste to prosím později</p>

                                    <a
                                        href="/"
                                        className="trk-btn trk-btn--border trk-btn--primary mt-3"
                                    >
                                        Domů
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
                    {showDetails ? "Skrýt detail" : "Zobrazit detaily"}
                </button>

                {showDetails && (
                    <div className="error__details mt-3 mx-auto text-center" style={{ maxWidth: "700px" }}>
                        <pre>
                            {(error as {message: string}).message}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
