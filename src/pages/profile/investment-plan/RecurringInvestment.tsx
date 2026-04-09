import React, {useEffect} from "react";
import { InvestmentPlanLayout } from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import { useTranslation } from "react-i18next";
import { CardContainer } from "../../../components/reusable/CardContainer.tsx";
import { Form } from "react-bootstrap";
import { NextStepButton } from "../../../components/reusable/NextStepButton.tsx";
import { routes } from "../../../utils/constants";
import { DayEnum } from "../../../utils/enums/DayEnum.ts";
import { useInvestmentPlanContext } from "../../../utils/providers/InvestmentPlanProvider.tsx";
import {InfoIconTooltip} from "../../../components/reusable/InfoIconTooltip.tsx";

export enum InvestmentFrequency {
    day = "day",
    week = "week",
    month = "month"
}

const daysOrder: (keyof typeof DayEnum)[] = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const monthDays = Array.from({ length: 28 }, (_, i) => i + 1);

export const RecurringInvestment = () => {
    const { t } = useTranslation();
    const currentStep = 1;

    const {
        frequency: selectedFrequency,
        setFrequency: setSelectedFrequency,
        day: selectedDay,
        setDay: setSelectedDay,
        hour: selectedHour,
        setHour: setSelectedHour,
        startDate: selectedStartDate,
        setStartDate: setSelectedStartDate,
    } = useInvestmentPlanContext();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const maxPastDate = yesterday.toISOString().split("T")[0];

    const hourStepNumber = selectedFrequency === InvestmentFrequency.day ? 2 : 3;

    const isStepFinished = () => {
        const isHourValid = selectedHour !== null && selectedHour >= 0 && selectedHour <= 23;
        const isStartDateValid = !selectedStartDate || selectedStartDate <= maxPastDate;

        if (selectedFrequency === InvestmentFrequency.day) {
            return isHourValid && isStartDateValid;
        } else {
            return isHourValid && selectedDay !== null && isStartDateValid;
        }
    };

    const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFreq = e.target.value as InvestmentFrequency;
        setSelectedFrequency(newFreq);
        setSelectedDay(null);
    };

    return (
        <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
            <h3 style={{ marginBottom: "-15px" }}>{t("Recurring Investment")}</h3>

            <CardContainer color="var(--tertiary-color)" style={{ marginBottom: "5px" }}>
                <div className="d-flex flex-column gap-5">

                    {/* Frequency */}
                    <div className="d-flex align-items-start gap-3">
                        <div className="accent-number" style={{ minWidth: "25px", marginTop: "-3px" }}>1</div>

                        <div className="d-flex flex-column">
                            <span className="gray-3-color-text mb-3">
                                {t("How often do you want to invest in selected portfolio?")}
                            </span>

                            <Form.Select
                                value={selectedFrequency}
                                onChange={handleFrequencyChange}
                                aria-label={t("Select frequency")}
                                className="select-box-outline"
                                style={{ width: "150px" }}
                            >
                                <option value={InvestmentFrequency.day}>{t("Every day")}</option>
                                <option value={InvestmentFrequency.week}>{t("Every week")}</option>
                                <option value={InvestmentFrequency.month}>{t("Every month")}</option>
                            </Form.Select>
                        </div>
                    </div>

                    {/* Day */}
                    {selectedFrequency !== InvestmentFrequency.day && (
                        <div className="d-flex align-items-start gap-3">
                            <div className="accent-number" style={{ minWidth: "25px", marginTop: "-3px" }}>2</div>

                            <div className="d-flex flex-column w-100">
                                <span className="gray-3-color-text mb-3 d-flex align-items-center gap-3">
                                    {selectedFrequency === InvestmentFrequency.week
                                        ? t("Select day of the week:")
                                        : t("Select day of the month:")}
                                    {selectedFrequency === InvestmentFrequency.month && (
                                        <InfoIconTooltip
                                            text={t("On Binance it is possible to trade only during the first 28 days of the month.")}
                                            position="right"
                                            color="#D4AF37"
                                        />
                                    )}
                                </span>

                                {/* Row day select for week */}
                                {selectedFrequency === InvestmentFrequency.week && (
                                    <div className="day-select-row">
                                        {daysOrder.map((dayString) => {
                                            const dayValue = DayEnum[dayString];
                                            const shortLabel = dayString.substring(0, 3);
                                            return (
                                                <div
                                                    key={dayString}
                                                    className={`day-select-row-item ${selectedDay === dayValue ? "selected" : ""}`}
                                                    onClick={() => setSelectedDay(dayValue)}
                                                >
                                                    {t(shortLabel)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Grid day select for month */}
                                {selectedFrequency === InvestmentFrequency.month && (
                                    <div className={"day-select-grid"}>
                                        {monthDays.map((dayNum) => (
                                            <div
                                                key={dayNum}
                                                className={`day-select-grid-item ${selectedDay === dayNum ? "selected" : ""}`}
                                                style={{ textAlign: "center", padding: "10px 0" }}
                                                onClick={() => setSelectedDay(dayNum)}
                                            >
                                                {dayNum}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Hour */}
                    <div className="d-flex align-items-start gap-3">
                        <div className="accent-number" style={{ minWidth: "25px", marginTop: "-3px" }}>
                            {hourStepNumber}
                        </div>

                        <div className="d-flex flex-column w-100">
                            <span className="gray-3-color-text mb-3">
                                {t("Select approximate hour of transaction:")}
                            </span>

                            <div className="d-flex align-items-center gap-2">
                                <div style={{ width: "60px" }}>
                                    <input
                                        type="number"
                                        min={0}
                                        max={23}
                                        className="outline-input"
                                        value={selectedHour ?? ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === "") {
                                                setSelectedHour(0);
                                                return;
                                            }
                                            const num = parseInt(val, 10);
                                            if (!isNaN(num) && num >= 0 && num <= 23) {
                                                setSelectedHour(num);
                                            }
                                        }}
                                        style={{ textAlign: "center", width: "100%" }}
                                    />
                                </div>
                                <span>:00</span>
                            </div>
                        </div>
                    </div>

                    {/* Start date */}
                    <div className="d-flex align-items-start gap-3">
                        <div className="accent-number" style={{ minWidth: "25px", marginTop: "-3px" }}>
                            {hourStepNumber + 1}
                        </div>

                        <div className="d-flex flex-column w-100">
                            <span className="gray-3-color-text mb-3">
                                {t("Choose a past start date to see how much you could have earned by starting your investment then:")}
                            </span>

                            <div style={{ maxWidth: "220px" }}>
                                <input
                                    type="date"
                                    className="outline-input"
                                    value={selectedStartDate ?? ""}
                                    max={maxPastDate}
                                    onChange={(e) => setSelectedStartDate(e.target.value || null)}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContainer>
            <div className={"d-flex justify-content-between"}>
                <NextStepButton currentStep={currentStep} currentStepFinished={isStepFinished()}  link={routes.profile.newInvestmentPlan} variant={"previous"} color={"var(--sandy-color)"} />
                <NextStepButton currentStep={currentStep} currentStepFinished={isStepFinished()} link={routes.profile.newInvestmentPlanInvestedAmount} />
            </div
        ></InvestmentPlanLayout>
    )
}