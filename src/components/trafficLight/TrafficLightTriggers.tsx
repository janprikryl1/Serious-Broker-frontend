import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { TriggerType } from "../../utils/types/trafficLight/TriggerType.ts";
import {LuTrash} from "react-icons/lu";

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

  return (
    <div className="d-flex flex-column mb-3 gap-5">
      {triggers.map((trigger, index) => (
        <div key={trigger.id || index} className="d-flex flex-column gap-2">

          {/* HLAVIČKA RIADKA: Gulička a Delete tlačidlo */}
          <div className="d-flex justify-content-between align-items-center px-1">
            <div
              className="flex-shrink-0"
              style={{
                backgroundColor: trigger.color || 'var(--gray-3-color)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: trigger.color ? 'none' : '2px dashed var(--gray-text)',
                boxShadow: trigger.color ? '0 0 10px ' + trigger.color : 'none'
              }}
            ></div>

            {isEditable && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "var(--red-on-primary-color)",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={() => onTriggerDelete?.(index)}
              >
                <LuTrash size={16} color="white" />
              </div>
            )}
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 align-items-stretch">

            {/* Event Container */}
            <div className="traffic-light-trigger-wrapper flex-grow-1 p-3">
              <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between align-items-center w-100 gap-2">
                  <div className="flex-grow-1">
                    {isEditable ? (
                      <Form.Select
                        value={trigger.event}
                        onChange={(e) => onTriggerChange?.(index, "event", e.target.value)}
                        className="select-box-bottom-border w-100"
                        style={{ maxWidth: "200px" }}
                      >
                        {Object.values(Event).map((v) => <option key={v} value={v}>{t(v)}</option>)}
                      </Form.Select>
                    ) : (
                      <div className="fw-bold">{t(trigger.event)}</div>
                    )}
                  </div>
                  <div className="text-end">
                    {isEditable ? (
                      <div className="d-flex align-items-center justify-content-end" style={{width: "70px"}}>
                        <input
                          type="number"
                          className="form-control borderless text-end p-0"
                          value={trigger.eventByPercentage}
                          onChange={(e) => onTriggerChange?.(index, "eventByPercentage", e.target.value)}
                          style={{ color: "var(--gold-color)", width: "45px" }}
                        />
                        <span className="ms-1">%</span>
                      </div>
                    ) : (
                      <div style={{ color: "var(--secondary-color)", fontWeight: "bold", fontSize: "1.4rem" }}>
                        {trigger.eventByPercentage}%
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between w-100 mt-1">
                  <div className="gray-2-color-text small">{t("Event")}</div>
                  <div className="gray-2-color-text small">{t("Up to")}</div>
                </div>
              </div>
            </div>

            {/* Action Container */}
            <div className="traffic-light-trigger-wrapper flex-grow-1 p-3">
              <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between align-items-center w-100 gap-2">
                  <div className="flex-grow-1">
                    {isEditable ? (
                      <Form.Select
                        value={trigger.action}
                        onChange={(e) => onTriggerChange?.(index, "action", e.target.value)}
                        className="select-box-bottom-border w-100"
                        style={{ maxWidth: "200px" }}
                      >
                        {Object.values(Action).map((v) => (
                          <option key={v} value={v}>
                            {v !== Action.none ? t(`${type} ${v}`) : t(`${v} ${type}`)}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <div className="fw-bold">{t(trigger.action)}</div>
                    )}
                  </div>
                  <div className="text-end">
                    {isEditable ? (
                      <div className="d-flex align-items-center justify-content-end" style={{width: "70px"}}>
                        <input
                          type="number"
                          className="form-control borderless text-end p-0"
                          disabled={trigger.action === Action.none}
                          value={trigger.actionByPercentage}
                          onChange={(e) => onTriggerChange?.(index, "actionByPercentage", e.target.value)}
                          style={{ color: "var(--gold-color)", width: "45px" }}
                        />
                        <span className="ms-1">%</span>
                      </div>
                    ) : (
                      <div style={{ color: "var(--secondary-color)", fontWeight: "bold", fontSize: "1.4rem" }}>
                        {trigger.actionByPercentage}%
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between w-100 mt-1">
                  <div className="gray-2-color-text small">{t("Action")}</div>
                  <div className="gray-2-color-text small">{t("By percent")}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};