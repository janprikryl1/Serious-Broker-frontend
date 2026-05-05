import { FC } from "react";
import { Form } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { TrafficLightTriggers } from "./TrafficLightTriggers.tsx";
import { CustomTooltip } from "../reusable/CustomTooltip.tsx";
import { Button } from "../reusable/Button.tsx";
import { TriggerType } from "../../utils/types/trafficLight/TriggerType.ts";
import { TrafficLightReference } from "../../utils/enums/TrafficLight.ts";

type TrafficLightProps = {
  triggers: TriggerType[];
  variant: 'edit' | 'details' | 'basic';
  type: 'buy' | 'sell';
  name: string;
  reference: TrafficLightReference;
  onTriggerChange?: (index: number, field: keyof TriggerType, value: any) => void;
  onTriggerDelete?: (index: number) => void;
  onTriggerAdd?: () => void;
  onReferenceChange?: (newReference: TrafficLightReference) => void;
  onTrafficLightCreate?: () => void;
  onNameChange?: (newName: string) => void;
  basePrice?: number;
  currency?: string;
};

export const TrafficLightWrapper: FC<TrafficLightProps> = (props) => {
  const { t } = useTranslation();
  const isEditable = props.variant === 'edit';

  return (
    <>
      {/* Header: Name and Label */}
      <div className="d-flex align-items-center">
        {isEditable ? (
          <>
            <input
              type="text"
              className="form-control borderless"
              value={props.name}
              onChange={(e) => props.onNameChange?.(e.target.value)}
              style={{ fontSize: "24px", width: "70%", color: "var(--secondary-color)" }}
            />
            <FiEdit3 style={{ marginLeft: "15px" }} size={25} color={"var(--secondary-color)"} />
          </>
        ) : (
          <div>
            <h3>{t("Traffic Light Summary")}</h3>
            <div className={"static-name"}>{props.name}</div>
          </div>
        )}
      </div>
      <div className={"gray-2-color-text"}>{t("Name")}</div>

      {/* Reference Section */}
      <div className={"d-flex flex-column flex-sm-row align-items-sm-center mt-4 mb-5 gap-2 gap-sm-5"}>
        <span className={"white-color-text"} style={{ fontSize: "20px", whiteSpace: "nowrap" }}>
          {t("Watch over")}
        </span>
        {isEditable ? (
          <Form.Select
            value={props.reference}
            onChange={(e) => props.onReferenceChange?.(e.target.value as TrafficLightReference)}
            className="select-box-outline"
            style={{ width: "100%", maxWidth: "230px" }} // Na mobile zaberie plnú šírku (max 230px)
          >
            {Object.values(TrafficLightReference).map((v) => (
              <option key={v} value={v}>{t(v)}</option>
            ))}
          </Form.Select>
        ) : (
          <div className={"static-text"}>{t(props.reference)}</div>
        )}
      </div>

      {/* Base Price Info (Details only) */}
      {props.variant === 'details' && props.basePrice && (
        <div className={"d-flex flex-column flex-sm-row align-items-sm-center mt-2 gap-2 gap-sm-5"}>
          <span className={"white-color-text"} style={{ fontSize: "20px" }}>
            {t("Base investment amount for this investment plan")}
          </span>
          <div className={"static-text"}>{props.basePrice} {props.currency}</div>
        </div>
      )}

      {/* --- THE INTERNAL TRIGGERS COMPONENT --- */}
      <TrafficLightTriggers
        triggers={props.triggers}
        variant={props.variant}
        type={props.type}
        basePrice={props.basePrice}
        currency={props.currency}
        onTriggerChange={props.onTriggerChange}
        onTriggerDelete={props.onTriggerDelete}
      />

      {/* Edit Actions: Add and Save */}
      {isEditable && (
        <>
          <div className="mt-3">
            <CustomTooltip title={props.triggers.length >= 9 ? t("Maximum number of triggers reached") : ""}>
              <button
                className={`d-flex align-items-center justify-content-center gap-2 btn-raw ${props.triggers.length >= 9 ? "disabled" : ""}`}
                onClick={() => props.onTriggerAdd?.()}
                disabled={props.triggers.length >= 9}
              >
                <IoIosAddCircleOutline size={20}/>
                {t("Add trigger")}
              </button>
            </CustomTooltip>
          </div>

          <div className={"d-flex align-items-center justify-content-center mt-4"}>
            <Button onClick={() => props.onTrafficLightCreate?.()}>
              {t("Save settings")}
            </Button>
          </div>
        </>
      )}
    </>
  );
};