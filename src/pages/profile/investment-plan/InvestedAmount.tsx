import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {InvestmentPlanLayout} from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import {CardContainer} from "../../../components/reusable/CardContainer.tsx";
import {Form} from "react-bootstrap";
import {NextStepButton} from "../../../components/reusable/NextStepButton.tsx";
import {routes} from "../../../utils/constants";
import {useInvestmentPlanContext} from "../../../utils/providers/InvestmentPlanProvider.tsx";

enum Currency {
    CZK = "CZK",
    EUR = "EUR",
    USD = "USD"
}

export const InvestedAmount = () => {
    const { t } = useTranslation();
    const currentStep = 2;

    const {
        investmentAmount: selectedAmount,
        setInvestmentAmount: setSelectedAmount,
        currency: selectedCurrency,
        setCurrency: setSelectedCurrency
    } = useInvestmentPlanContext();

    return (
        <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
            <h3 style={{marginBottom: "-15px"}}>{t("Invested Amount")}</h3>

            <CardContainer color="var(--tertiary-color)" style={{marginBottom: "5px"}}>

                <div className="d-flex flex-column align-items-start gap-3">
                    <span className="gray-3-color-text mb-3">
                        {t("How much do you want to invest each time?")}
                    </span>

                    <div className="d-flex flex-row align-items-center gap-3">

                        <span style={{width: "150px"}}>
                            <input
                                type="number"
                                min={1}
                                className="outline-input"
                                value={selectedAmount ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === "") {
                                        setSelectedAmount(null);
                                        return;
                                    }
                                    const num = parseInt(val, 10);
                                    if (!isNaN(num) && num >= 0) {
                                        setSelectedAmount(num);
                                    }
                                }}
                                onBlur={() => {if(selectedAmount != null && selectedAmount <= 0) setSelectedAmount(1) }}
                                style={{ textAlign: "start", width: "100%" }}
                            />
                        </span>

                        <Form.Select
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                            aria-label={t("Select currency")}
                            className="select-box-outline"
                            style={{width: "90px"}}
                        >
                            <option value={Currency.EUR}>EUR</option>
                            <option value={Currency.CZK}>CZK</option>
                            <option value={Currency.USD}>USD</option>
                        </Form.Select>
                    </div>
                </div>
            </CardContainer>

            <div className={"d-flex justify-content-between"}>
                <NextStepButton currentStep={currentStep} currentStepFinished={selectedAmount != null && selectedAmount > 0}  link={routes.profile.newInvestmentPlanRecurringInvestment} variant={"previous"} color={"var(--sandy-color)"} />
                <NextStepButton currentStep={currentStep} currentStepFinished={selectedAmount != null && selectedAmount > 0} link={routes.profile.newInvestmentPlanTrafficLights} />
            </div>
        </InvestmentPlanLayout>
    )
}