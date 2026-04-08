import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { TriggerType } from "../../utils/types/trafficLight/TriggerType.ts";
import {LuTrash} from "react-icons/lu";

// Enumy pre interné potreby komponentu
enum Event { priceRise = "Price rise", priceDrop = "Price drop" }
enum Action { less = "less", more = "more", normal = "normally", none = "Don't" }

type TriggersProps = {
  triggers: TriggerType[];
  variant: 'edit' | 'details' | 'basic';
  type: 'buy' | 'sell';
  basePrice?: number;
  currency?: string;
  onTriggerChange?: (index: number, field: keyof TriggerType, value: any) => void;
  onTriggerDelete?: (index: number) => void;
};

export const TrafficLightTriggers: FC<TriggersProps> = ({
                                                          triggers, variant, type, basePrice, currency, onTriggerChange, onTriggerDelete
                                                        }) => {
  const { t } = useTranslation();
  const isEditable = variant === 'edit';
  const computeNewInvestment = (trigger: TriggerType) => {
    if (!basePrice || !trigger.actionByPercentage) return null;
    const percentage = Number(trigger.actionByPercentage);
    switch (trigger.action) {
      case Action.less: return (((100 - percentage) / 100) * basePrice).toFixed(2);
      case Action.more: return (((100 + percentage) / 100) * basePrice).toFixed(2);
      case Action.normal: return basePrice;
      default: return null;
    }
  };

  return (
    <div className={"d-flex flex-column mt-5 mb-3 gap-4"}>
      {triggers.map((trigger, index) => (
        <div key={trigger.id || index} className={"d-flex align-items-center gap-4"}>
          <div className={"traffic-light-circle-big"} style={{ backgroundColor: trigger.color }}></div>

          <div className="d-flex gap-3 flex-grow-1 align-items-center">
            {/* Prvý kontajner - Event */}
            <div className={"traffic-light-trigger-wrapper flex-grow-1 p-3"}>
              <div className={"d-flex flex-column w-100"}>
                {/* Horný riadok: Text/Select vľavo, Číslo/Input vpravo */}
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className={"traffic-light-trigger-element m-0"}>
                    {isEditable ? (
                      <Form.Select
                        value={trigger.event}
                        onChange={(e) => onTriggerChange?.(index, "event", e.target.value)}
                        className="select-box-bottom-border"
                        style={{ width: "230px" }}
                      >
                        {Object.values(Event).map((v) => <option key={v} value={v}>{t(v)}</option>)}
                      </Form.Select>
                    ) : (
                      <div>{t(trigger.event)}</div>
                    )}
                  </div>

                  <div className={"traffic-light-trigger-element m-0 text-end"}>
                    {isEditable ? (
                      <div style={{width: "80px"}} className={"d-flex"}>
                      <input
                          type="text"
                          className="form-control borderless text-end p-0"
                          value={trigger.eventByPercentage}
                          onChange={(e) => onTriggerChange?.(index, "eventByPercentage", e.target.value)}
                          style={{ color: "var(--gold-color)" }}
                        />
                        %
                      </div>
                    ) : (
                      <div style={{ color: "var(--secondary-color)", fontWeight: "bold", fontSize: "1.7rem", lineHeight: 1.3 }}>
                        {trigger.eventByPercentage} %
                      </div>
                    )}
                  </div>
                </div>

                {/* Spodný riadok: Label vľavo, "By percent" vpravo */}
                <div className="d-flex justify-content-between w-100 mt-1">
                  <div className={"label gray-2-color-text small"}>{t("Event")}</div>
                  <div className={"label gray-2-color-text small"}>{t("Up to")}</div>
                </div>
              </div>
            </div>

            {/* Druhý kontajner - Action */}
            <div className={"traffic-light-trigger-wrapper flex-grow-1 p-3"}>
              <div className={"d-flex flex-column w-100"}>
                {/* Horný riadok */}
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className={"traffic-light-trigger-element m-0"}>
                    {isEditable ? (
                      <Form.Select
                        value={trigger.action}
                        onChange={(e) => onTriggerChange?.(index, "action", e.target.value)}
                        className="select-box-bottom-border"
                        style={{ width: "230px" }}
                      >
                        {Object.values(Action).map((v) => (
                          <option key={v} value={v}>
                            {v !== Action.none ? t(`${type} ${v}`) : t(`${v} ${type}`)}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <div>{t(trigger.action)}</div>
                    )}
                  </div>

                  <div className={"traffic-light-trigger-element m-0 text-end"}>
                    {isEditable ? (
                      <div style={{width: "80px"}} className={"d-flex"}>
                        <input
                          type="text"
                          className="form-control borderless text-end p-0"
                          disabled={trigger.action === Action.none}
                          value={trigger.actionByPercentage}
                          onChange={(e) => onTriggerChange?.(index, "actionByPercentage", e.target.value)}
                          style={{ width: "60px", color: "var(--gold-color)" }}
                        />
                        %
                      </div>
                    ) : (
                      <div style={{ color: "var(--secondary-color)", fontWeight: "bold", fontSize: "1.7rem", lineHeight: 1.3 }}>
                        {trigger.actionByPercentage} %
                      </div>
                    )}
                  </div>
                </div>

                {/* Spodný riadok */}
                <div className="d-flex justify-content-between w-100 mt-1">
                  <div className={"label gray-2-color-text small"}>{t("Action")}</div>
                  <div className={"label gray-2-color-text small"}>{t("By percent")}</div>
                </div>
              </div>
            </div>

            {isEditable && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "var(--red-on-tertiary-color)", // Tvoja nová červená
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  flexShrink: 0 // Zabezpečí, aby krúžok ostal okrúhly aj pri nedostatku miesta
                }}
                onClick={() => onTriggerDelete?.(index)}
              >
                <LuTrash
                  size={18} // Trochu menšia veľkosť, aby mala v krúžku "vzduch"
                  color="white"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};