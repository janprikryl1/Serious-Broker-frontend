import React, {useEffect} from "react";
import {InvestmentPlanLayout} from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import {useTranslation} from "react-i18next";
import {CardContainer} from "../../../components/reusable/CardContainer.tsx";
import {Form} from "react-bootstrap";
import {NextStepButton} from "../../../components/reusable/NextStepButton.tsx";
import {routes} from "../../../utils/constants";
import {DayEnum} from "../../../utils/enums/DayEnum.ts";
import {useInvestmentPlanContext} from "../../../utils/providers/InvestmentPlanProvider.tsx";
import {InfoIconTooltip} from "../../../components/reusable/InfoIconTooltip.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";

export enum InvestmentFrequency {
  day = "day",
  week = "week",
  month = "month"
}

const daysOrder: (keyof typeof DayEnum)[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const monthDays = Array.from({length: 28}, (_, i) => i + 1);

export const RecurringInvestment = () => {
  const {t} = useTranslation();
  const currentStep = 1;
  const isMobile = useMediaQuery('(max-width: 576px)');

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

  const renderContent = () => (
    <div className={`d-flex flex-column ${isMobile ? "gap-4" : "gap-5"}`}>
      {/* Frequency */}
      <div className="d-flex align-items-start gap-3">
        <div className="accent-number" style={{minWidth: "25px", marginTop: "-3px"}}>1</div>
        <div className="d-flex flex-column w-100">
                    <span className="gray-3-color-text mb-2 mb-sm-3">
                        {t("How often do you want to invest in selected portfolio?")}
                    </span>
          <Form.Select
            value={selectedFrequency}
            onChange={handleFrequencyChange}
            className="select-box-outline w-100 w-sm-auto"
            style={{maxWidth: isMobile ? "100%" : "150px"}}
          >
            <option value={InvestmentFrequency.day}>{t("Every day")}</option>
            <option value={InvestmentFrequency.week}>{t("Every week")}</option>
            <option value={InvestmentFrequency.month}>{t("Every month")}</option>
          </Form.Select>
        </div>
      </div>

      {/* Day Select */}
      {selectedFrequency !== InvestmentFrequency.day && (
        <div className="d-flex align-items-start gap-3">
          <div className="accent-number" style={{minWidth: "25px", marginTop: "-3px"}}>2</div>
          <div className="d-flex flex-column w-100">
                        <span className="gray-3-color-text mb-3 d-flex align-items-center flex-wrap gap-2">
                            {selectedFrequency === InvestmentFrequency.week
                              ? t("Select day of the week:")
                              : t("Select day of the month:")}
                          {selectedFrequency === InvestmentFrequency.month && (
                            <InfoIconTooltip
                              text={t("On Binance it is possible to trade only during the first 28 days of the month.")}
                              position={isMobile ? "top" : "right"}
                              color="#D4AF37"
                            />
                          )}
                        </span>

            {selectedFrequency === InvestmentFrequency.week && (
              <div className="day-select-wrapper">
                <div className="day-select-flex">
                  {daysOrder.map((dayString) => {
                    const dayValue = DayEnum[dayString];
                    const shortLabel = dayString.substring(0, 3);
                    return (
                      <div
                        key={dayString}
                        className={`day-select-item ${selectedDay === dayValue ? "selected" : ""}`}
                        onClick={() => setSelectedDay(dayValue)}
                      >
                        {t(shortLabel)}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedFrequency === InvestmentFrequency.month && (
              <div className="day-select-grid">
                {monthDays.map((dayNum) => (
                  <div
                    key={dayNum}
                    className={`day-select-grid-item ${selectedDay === dayNum ? "selected" : ""}`}
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
        <div className="accent-number" style={{minWidth: "25px", marginTop: "-3px"}}>
          {hourStepNumber}
        </div>
        <div className="d-flex flex-column w-100">
                    <span className="gray-3-color-text mb-3">
                        {t("Select approximate hour of transaction:")}
                    </span>
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              min={0} max={23}
              className="outline-input text-center"
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
              style={{width: "70px"}}
            />
            <span className="fw-bold">:00</span>
          </div>
        </div>
      </div>

      {/* Start date */}
      <div className="d-flex align-items-start gap-3">
        <div className="accent-number" style={{minWidth: "25px", marginTop: "-3px"}}>
          {hourStepNumber + 1}
        </div>
        <div className="d-flex flex-column w-100">
                    <span className="gray-3-color-text mb-3">
                        {t("Choose a past start date to see how much you could have earned by starting your investment then:")}
                    </span>
          <input
            type="date"
            className="outline-input w-100"
            value={selectedStartDate ?? ""}
            max={maxPastDate}
            onChange={(e) => setSelectedStartDate(e.target.value || null)}
            style={{maxWidth: "250px"}}
          />
        </div>
      </div>
    </div>
  );

  return (
    <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={isStepFinished()}>
      <h3 style={{marginBottom: isMobile ? "20px" : "-15px"}}>{t("Recurring Investment")}</h3>

      {isMobile ? (
        <div style={{marginBottom: "30px", marginTop: "10px"}}>
          {renderContent()}
        </div>
      ) : (
        <CardContainer color="var(--tertiary-color)" style={{marginBottom: "5px"}}>
          {renderContent()}
        </CardContainer>
      )}

      <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-4">
        <NextStepButton currentStep={currentStep} currentStepFinished={isStepFinished()}
                        link={routes.profile.newInvestmentPlan} variant="previous" color="var(--sandy-color)"/>
        <NextStepButton currentStep={currentStep} currentStepFinished={isStepFinished()}
                        link={routes.profile.newInvestmentPlanInvestedAmount}/>
      </div>
    </InvestmentPlanLayout>
  );
}