import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Collapse} from "react-bootstrap";
import {deleteTrafficLight, getTrafficLights} from "../../utils/api/trafficLightsService.ts";
import {TrafficLightType} from "../../utils/types/trafficLight/TrafficLightType.ts";
import {IoIosArrowDown} from "react-icons/io";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {OutlineContainer} from "../../components/reusable/OutlineContainer.tsx";
import {TrafficLightTriggers} from "../../components/trafficLight/TrafficLightTriggers.tsx";
import {TrafficLightProvider, useTrafficLightContext} from "../../utils/providers/TrafficLightProvider.tsx";
import {InvestmentPlanType} from "../../utils/types/investmentPlan/InvestmentPlanType.ts";
import {getInvestmentPlans} from "../../utils/api/investmentPlanService.ts";
import {Button} from "../../components/reusable/Button.tsx";
import {useToast, ToastColor} from "../../utils/providers/ToastProvider.tsx";
import {EditDeleteButtons} from "../../components/reusable/EditDeleteButtons.tsx";
import {GoPlus} from "react-icons/go";
import {useTrafficLightForm} from "../../utils/hooks/useTrafficLightForm.ts";
import {TrafficLightFormModal} from "../../components/trafficLight/TrafficLightFormModal.tsx";
import {AccordionToggleIcon} from "../../components/reusable/AccordionToggleIcon.tsx";

const MyTrafficLightsContent: FC = () => {
  const [loading, setLoading] = useState(true);
  const [trafficLights, setTrafficLights] = useState<TrafficLightType[]>([]);
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlanType[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    setName, setTriggers: setContextTriggers, setReference, setType, saveChanges,
    name, triggers: contextTriggers, reference, type, setId
  } = useTrafficLightContext();

  const { showToast } = useToast();
  const {t} = useTranslation();

  const initialTriggers = [
    {
      id: crypto.randomUUID(),
      event: "Price rise" as any,
      eventByPercentage: 5,
      action: "less" as any,
      actionByPercentage: 5,
      color: ""
    },
    {
      id: crypto.randomUUID(),
      event: "Price drop" as any,
      eventByPercentage: 5,
      action: "more" as any,
      actionByPercentage: 10,
      color: ""
    },
    {
      id: crypto.randomUUID(),
      event: "Price drop" as any,
      eventByPercentage: 10,
      action: "more" as any,
      actionByPercentage: 20,
      color: ""
    }
  ];

  const {
    triggers: formTriggers,
    addTrigger,
    deleteTrigger,
    handleTriggerChange,
    reassignColors,
    sortTriggers,
  } = useTrafficLightForm(initialTriggers);

  // Sync formTriggers to context when create modal opens
  useEffect(() => {
    if (showCreateModal) {
      setContextTriggers(formTriggers);
    }
  }, [formTriggers, showCreateModal, setContextTriggers]);

  const fetchData = async () => {
    try {
      const [tlRes, plansRes] = await Promise.all([getTrafficLights(), getInvestmentPlans()]);
      const sanitized = tlRes.data.map(tl => ({
        ...tl,
        triggers: typeof tl.triggers === "string" ? JSON.parse(tl.triggers) : tl.triggers
      }));
      setTrafficLights(sanitized);
      setInvestmentPlans(plansRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenEdit = (light: TrafficLightType, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setId(light.id);
    setName(light.name);
    setContextTriggers(light.triggers);
    setReference(light.reference);
    setType(light.type);

    setShowEditModal(true);
  };

  const handleSave = async () => {
    await saveChanges();
    setShowEditModal(false);
    fetchData();
  };

  const handleDelete = async (light: TrafficLightType, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const usage = getUsageCount(light.id);

    if (usage > 0) {
      showToast(t("Cannot delete: This traffic light is active in investment plans"), ToastColor.red);
      return;
    }

    if (window.confirm(t("Are you sure you want to delete this traffic light?"))) {
      try {
        await deleteTrafficLight(light.id!);
        showToast(t("Traffic light deleted successfully"), ToastColor.green);
        fetchData();
      } catch (err) {
        showToast(t("Error while deleting. Please try again."), ToastColor.red);
        console.error(err);
      }
    }
  };

  const getUsageCount = (id?: number) => {
    if (!id) return 0;
    return investmentPlans.filter(p => p.buy_traffic_light_id === id || p.sell_traffic_light_id === id).length;
  };

  const createTrafficLight = async () => {
    setShowCreateModal(false);
    await saveChanges();
    fetchData();
  };

  const TrafficLightAccordionItem: FC<{ tl: TrafficLightType }> = ({ tl }) => {
    const [open, setOpen] = useState(false);
    const usageCount = getUsageCount(tl.id);

    return (
      <OutlineContainer
        bgColor="var(--quaternary-color-transparent-50)"
        style={{ padding: "0", cursor: "pointer", margin: 0, marginBottom: "15px", borderRadius: "10px" }}
        onClick={() => setOpen(!open)}
      >
        <div className="d-flex justify-content-between align-items-center" style={{ padding: "20px 25px" }}>
          <div style={{ fontSize: "1.4rem" }}>{tl.name}</div>
          <div className="d-flex align-items-center">
            <div className="traffic-light-triggers-preview" style={{ position: 'static', transform: 'none', opacity: 1, display: 'flex', gap: '8px', marginRight: '15px' }}>
              {tl.triggers.map((trigger, idx) => (
                <div key={idx} style={{ backgroundColor: trigger.color }} className="traffic-light-circle-small"></div>
              ))}
            </div>
            <AccordionToggleIcon isOpen={open} size={24} />
          </div>
        </div>

        <Collapse in={open}>
          <div style={{ padding: "20px 25px" }}>
            <TrafficLightTriggers triggers={tl.triggers} variant="basic" type={tl.type} />
            <div
              className="mt-4 pt-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
              style={{ borderTop: "1px solid var(--gray-4-color)" }}
            >
              <div>
                <span className="gray-3-color-text">{t("Used in ")}</span>
                <span className="gold-color-text"><strong>{usageCount}</strong></span>
                <span className="gray-3-color-text">{t(" investment plans")}</span>
              </div>
              <div className="d-flex align-self-stretch align-self-md-auto justify-content-start justify-content-md-end">
                <EditDeleteButtons
                  onDelete={() => handleDelete(tl)}
                  onEdit={() => handleOpenEdit(tl)}
                  deleteLabel={t("Delete")}
                  editLabel={t("Edit Settings")}
                />
              </div>
            </div>
          </div>
        </Collapse>
      </OutlineContainer>
    );
  };

  if (loading) return <div>{t("Loading...")}</div>;

  return (
    <>
      <TitleHeader title={t("Market Traffic Lights")}/>
      <div className={"container"}>
        <Button className="d-inline-flex align-items-center gap-2 mb-5" 
                onClick={() => {
                  setName("General Traffic Light");
                  setShowCreateModal(true);
                }}>
          <GoPlus size={25} style={{margin: "2px"}}/>
          {t("New Market Traffic Light")}
        </Button>

          <div className="row">
            <div className="col-12 custom-col mb-4">
              <h3 className="mb-4">{t("Buy Traffic Lights")}</h3>
              {trafficLights.filter(l => l.type === "buy").length > 0 ? (
                trafficLights.filter(l => l.type === "buy").map((tl, i) => (
                  <TrafficLightAccordionItem key={tl.id || i} tl={tl} />
                ))
              ) : (
                <div className="text-center gray-3-color-text p-4">
                  {t("No buy market traffic lights defined. Click the button above to add your first market traffic light.")}
                </div>
              )}
            </div>
            <div className="col-12 custom-col">
              <h3 className="mb-4">{t("Sell Traffic Lights")}</h3>
              {trafficLights.filter(l => l.type === "sell").length > 0 ? (
                trafficLights.filter(l => l.type === "sell").map((tl, i) => (
                  <TrafficLightAccordionItem key={tl.id || i} tl={tl} />
                ))
              ) : (
                <div className="text-center gray-3-color-text p-4">
                  {t("No sell market traffic lights defined. Click the button above to add your first market traffic light.")}
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Create traffic light modal */}
      <TrafficLightFormModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        title={t('defineTrafficLight', { type: t(type === "buy" ? "BuyTL" : "SellTL") })}
        variant="create"
        triggers={formTriggers}
        type={type}
        name={name}
        reference={reference}
        onTriggerChange={handleTriggerChange}
        onTriggerDelete={deleteTrigger}
        onTriggerAdd={addTrigger}
        onNameChange={setName}
        onReferenceChange={setReference}
        onSave={createTrafficLight}
      />

      {/* Edit traffic light modal */}
      <TrafficLightFormModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        title={t("Edit Traffic Light")}
        variant="edit"
        triggers={contextTriggers}
        type={type}
        name={name}
        reference={reference}
        onTriggerChange={(idx, field, val) => {
          const newTriggers = [...contextTriggers];
          newTriggers[idx] = { ...newTriggers[idx], [field]: val };
          setContextTriggers(newTriggers);
        }}
        onTriggerDelete={(idx) => setContextTriggers(contextTriggers.filter((_, i) => i !== idx))}
        onTriggerAdd={() => setContextTriggers([...contextTriggers, { id: crypto.randomUUID(), event: "Price drop" as any, eventByPercentage: 5, action: "more" as any, actionByPercentage: 5, color: "gray" }])}
        onNameChange={setName}
        onReferenceChange={setReference}
        onSave={handleSave}
      />
    </>
  );
};

export const MyTrafficLights: FC = () => {
  return (
    <TrafficLightProvider>
      <MyTrafficLightsContent />
    </TrafficLightProvider>
  );
};