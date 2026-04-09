import React, {CSSProperties, FC, ReactNode} from 'react';
import {useTranslation} from "react-i18next";

type StepperProps = {
    steps: string[];
    currentStep: number;
};

export const Stepper: FC<StepperProps> = ({steps, currentStep}) => {
    const { t } = useTranslation();
    return (
        <div className="stepper-container">
            {steps.map((label, i) => {
                const isActive = i <= currentStep;
                const isLineActive = i < currentStep;

                return (
                    <div key={i} className={`step-item ${isActive ? 'active' : ''}`}>

                        {/* Label */}
                        <div className="step-label">{t(label)}</div>

                        {/* Circle and line wrapper */}
                        <div className="step-indicator-wrapper">

                            {/* Circle */}
                            <div className={`step-circle`} >
                                {i + 1}
                            </div>

                            {/* Line */}
                            {(i !== steps.length - 1 && (<div className={`step-line ${isLineActive ? 'line-active' : ''}`}></div>)) }

                        </div>
                    </div>
                );
            })}
        </div>
    )
}