import { FC } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TrafficLightWrapper } from "./TrafficLightWrapper.tsx";

export const TrafficLightFormModal: FC<any> = ({
  show,
  onHide,
  title,
  variant,
  triggers,
  type,
  name,
  reference,
  onTriggerChange,
  onTriggerDelete,
  onTriggerAdd,
  onNameChange,
  onReferenceChange,
  onSave,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size={"xl"}
      contentClassName="custom-modal"
    >
      <Modal.Body>
        <div>
          <h3>{title}</h3>
          <div className={"mb-4"}>
            {t(
              "Within a traffic light you can define a trigger, which will ensure that buy action will occur when certain requirements are fulfilled."
            )}
          </div>

          {/* Triggers */}
          <TrafficLightWrapper
            triggers={triggers}
            variant={variant === "create" ? "edit" : "edit"}
            type={type}
            name={name}
            reference={reference}
            onTriggerChange={onTriggerChange}
            onTriggerDelete={onTriggerDelete}
            onTriggerAdd={onTriggerAdd}
            onNameChange={onNameChange}
            onReferenceChange={onReferenceChange}
            onTrafficLightCreate={onSave}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};



