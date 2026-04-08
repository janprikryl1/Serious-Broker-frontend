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

            {buttonLabel || (isNext
                ? INVESTMENT_PLAN_STEPS[currentStep + 1]
                : INVESTMENT_PLAN_STEPS[currentStep - 1])}

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
        marginTop: "35px"
    };

    const buttonStyle: React.CSSProperties = isNext
        ? { marginTop: 0, marginBottom: 0, backgroundColor: color }
        : {
            marginTop: 0,
            marginBottom: 0,
            color: "var(--white-color)",
            backgroundColor: "transparent",
            outline: "1px solid var(--secondary-color)",
            fontWeight: 400
        };

    return (
        <div style={alignmentStyle}>
            {showLabel && (
                <p style={{ color: "var(--gray-2-color)", marginBottom: "5px" }}>
                    {buttonDescription || (isNext ? t("Next Step") : t("Previous Step"))}
                </p>
            )}

            {link && (isNext ? currentStepFinished : true) ? (
                <Link to={link} style={{ textDecoration: "none" }}>
                    <Button style={buttonStyle}>
                        {renderButtonContent()}
                    </Button>
                </Link>
            ) : (
                <Button
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