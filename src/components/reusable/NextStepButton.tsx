import { FC } from "react";
import { Button } from "./Button.tsx";
import { INVESTMENT_PLAN_STEPS } from "../../utils/constants/investmentPlanStepsConfig.ts";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

type Props = {
    currentStep: number;
    currentStepFinished: boolean;
    link?: string;
    onClick?: () => void;
    showLabel?: boolean;
    buttonLabel?: string;
    buttonDescription?: string;
    variant?: "next" | "previous";
    color?: string;
};

export const NextStepButton: FC<Props> = ({
                                              currentStep,
                                              currentStepFinished,
                                              showLabel = true,
                                              link,
                                              onClick,
                                              buttonLabel,
                                              buttonDescription,
                                              variant = "next",
                                              color
                                          }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isNext = variant === "next";

    const renderButtonContent = () => (
        <div style={{ display: "flex", alignItems: "center" }}>
            {!isNext && <IoIosArrowBack style={{ marginRight: "10px", marginLeft: "-7px" }} />}

            {t(buttonLabel || (isNext
                ? INVESTMENT_PLAN_STEPS[currentStep + 1]
                : INVESTMENT_PLAN_STEPS[currentStep - 1]))}

            {isNext && <IoIosArrowForward style={{ marginLeft: "10px", marginRight: "-7px" }} />}
        </div>
    );

    const handleButtonClick = () => {
        if (isNext && !currentStepFinished) return;

        if (onClick) {
            onClick();
        } else if (link) {
            navigate(link);
        }
    };

    const alignmentStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: isNext ? "flex-end" : "flex-start",
        width: "100%"
    };

    const buttonColor = color ?? (isNext ? "var(--secondary-color)" : "transparent");

    const buttonStyle: React.CSSProperties = isNext
        ? { marginTop: 0, marginBottom: 0, backgroundColor: buttonColor }
        : {
            marginTop: 0,
            marginBottom: 0,
            color: "var(--white-color)",
            backgroundColor: "transparent",
            outline: "1px solid var(--secondary-color)",
            fontWeight: 400,
        };

    return (
        <div style={alignmentStyle}>
            {showLabel && (
                <p className="tw-text-xs sm:tw-text-sm" style={{ color: "var(--gray-2-color)", marginBottom: "5px" }}>
                    {buttonDescription ?? (isNext ? t("Next Step") : t("Previous Step"))}
                </p>
            )}

            {link && (isNext ? currentStepFinished : true) ? (
                <Link to={link} style={{ textDecoration: "none" }}>
                    <Button className="tw-w-full sm:tw-w-auto tw-text-sm sm:tw-text-base" style={buttonStyle}>
                        {renderButtonContent()}
                    </Button>
                </Link>
            ) : (
                <Button
                    className="tw-w-full sm:tw-w-auto tw-text-sm sm:tw-text-base"
                    style={buttonStyle}
                    disabled={isNext && !currentStepFinished}
                    onClick={handleButtonClick}
                >
                    {renderButtonContent()}
                </Button>
            )}
        </div>
    );
};