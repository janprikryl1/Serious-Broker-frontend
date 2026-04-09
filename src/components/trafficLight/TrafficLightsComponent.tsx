import React, {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {InvestmentPlanLayout} from "../profile/myPortfolio/InvestmentPlanLayout.tsx";
import {CardContainer} from "../reusable/CardContainer.tsx";
import {Form, Modal, OverlayTrigger} from "react-bootstrap";
import {NextStepButton} from "../reusable/NextStepButton.tsx";
import {routes} from "../../utils/constants";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import BuyCryptoImg from "../../assets/buy-crypto.svg";
import SellCryptoImg from "../../assets/sell-crypto.svg";
import {TriggerType} from "../../utils/types/trafficLight/TriggerType.ts";
import {getTrafficLights, saveTrafficLight} from "../../utils/api/trafficLightsService.ts";
import {TrafficLightType} from "../../utils/types/trafficLight/TrafficLightType.ts";
import {useTrafficLightContext} from "../../utils/providers/TrafficLightProvider.tsx";
import {TrafficLightReference} from "../../utils/enums/TrafficLight.ts";
import {useInvestmentPlanContext} from "../../utils/providers/InvestmentPlanProvider.tsx";
import {FaCheck} from "react-icons/fa6";
import {TrafficLightWrapper} from "./TrafficLightWrapper.tsx";

enum Currency {
    CZK = "CZK",
    EUR = "EUR",
    USD = "USD"
}

/*enum TrafficLightReference {
    ATH = "ATH - All Time High Price"
}*/

enum Event {
    priceRise = "Price rise",
    priceDrop = "Price drop",
}

enum Action {
    less = `less`,
    more = "more",
    normal = "normally",
    none = "Don't"
}

const getColorVar = (index: number): string =>
    index < 5
        ? `var(--traffic-light-danger${index}-light-color)`
        : (index === 5
            ? "var(--traffic-light-neutral-light-color)"
            : `var(--traffic-light-safe${index - 5}-light-color)`);

const COLOR_DISTRIBUTION: Record<number, number[]> = {
    1: [1],
    2: [1, 9],
    3: [1, 4, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 6, 8, 9],
    6: [1, 2, 4, 6, 8, 9],
    7: [1, 2, 3, 4, 6, 8, 9],
    8: [1, 2, 3, 4, 6, 7, 8, 9],
    9: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

export const TrafficLightsComponent = () => {
    const { t } = useTranslation();
    const currentStep = 3;
    const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.EUR);
    const [showCreateTrafficLightModal, setShowCreateTrafficLightModal] = useState(false);
    const [showReviewTrafficLightModal, setShowReviewTrafficLightModal] = useState(false);
    // const [reference, setReference] = useState<TrafficLightReference>(TrafficLightReference.ATH);
    const [maxTriggersReached, setMaxTriggersReached] = useState(false);
    const [typeCamelCase, setTypeCamelCase ] = useState<string>("");
    const [userBuyTrafficLights, setUserBuyTrafficLights] = useState<TrafficLightType[]>([])
    const [userSellTrafficLights, setUserSellTrafficLights] = useState<TrafficLightType[]>([])
    const [trafficLightClicked, setTrafficLightClicked] = useState<TrafficLightType | null>(null);

    const {
        name,
        setName: setContextName,
        triggers,
        reference,
        setReference: setContextReference,
        setTriggers: setContextTriggers,
        saveChanges,
        isLoading: isSaving,
        type,
        setType: setContextType
    } = useTrafficLightContext();

    const {
        buyTrafficLightId, setBuyTrafficLightId,
        sellTrafficLightId, setSellTrafficLightId,
        saveChanges: saveCompletePlan,
        currency,
        isLoading: isSavingPlan
    } = useInvestmentPlanContext();

    const initialTriggers: TriggerType[] = [
        {
            id: crypto.randomUUID(),
            event: Event.priceRise,
            eventByPercentage: 5,
            action: Action.less,
            actionByPercentage: 5,
            color: ""
        },
        {
            id: crypto.randomUUID(),
            event: Event.priceDrop,
            eventByPercentage: 5,
            action: Action.more,
            actionByPercentage: 10,
            color: ""
        },
        {
            id: crypto.randomUUID(),
            event: Event.priceDrop,
            eventByPercentage: 10,
            action: Action.more,
            actionByPercentage: 20,
            color: ""
        }
    ];

    useEffect(() => {
        const sorted = sortTriggers(initialTriggers);
        reassignColors(sorted);

        const fetchTrafficLights = async () => {
            try {
                const response = await getTrafficLights();
                console.log(response);

                if (response) {
                    setUserBuyTrafficLights((
                        response.data
                            .filter(trafficLight => (trafficLight.type === "buy")
                            ).map(filtered => ({
                            ...filtered,
                            triggers: typeof filtered.triggers === "string" ? JSON.parse(filtered.triggers) : filtered.triggers
                        })))
                    )
                    setUserSellTrafficLights((
                        response.data
                            .filter(trafficLight => (trafficLight.type === "sell")
                            ).map(filtered => ({
                            ...filtered,
                            triggers: typeof filtered.triggers === "string" ? JSON.parse(filtered.triggers) : filtered.triggers
                        })))
                    )
                }
            } catch (error) {
                console.error("Failed to fetch traffic lights", error);
            }
        }

        fetchTrafficLights();
    }, []);

    useEffect(() => {
        const sorted = sortTriggers(initialTriggers);
        reassignColors(sorted);
        setContextName("General Traffic Light");
    }, [showCreateTrafficLightModal]);

    useEffect(() => {
        setTypeCamelCase(type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
    }, [type])

    const handleShowCreateTrafficLightModal = () => {setShowCreateTrafficLightModal(true)};
    const handleCloseCreateTrafficLightModal = () => {
        setShowCreateTrafficLightModal(false)
    };

    const confirmSelection = () => {
        if (!trafficLightClicked) return;

        if (trafficLightClicked.type === "buy") {
            setBuyTrafficLightId(buyTrafficLightId === trafficLightClicked.id ? null : (trafficLightClicked.id ?? null));
        } else {
            setSellTrafficLightId(sellTrafficLightId === trafficLightClicked.id ? null : (trafficLightClicked.id ?? null));
        }

        setShowReviewTrafficLightModal(false);
    };

    const handleFinishSetup = async () => {
        try {
            await saveCompletePlan();
        } catch (error) {
            console.error("Error saving investment plan:", error);
        }
    };

    const handleRowClick = (trafficLight: TrafficLightType) => {
        setTrafficLightClicked(trafficLight);
        setShowReviewTrafficLightModal(true);
    }

    const handleCloseReviewTrafficLightModal = () => {
        setShowReviewTrafficLightModal(false);
    }

    const newBuyTrafficLight = () => {
        setContextType("buy");
        handleShowCreateTrafficLightModal();
    }

    const newSellTrafficLight = () => {
        setContextType("sell");
        handleShowCreateTrafficLightModal();
    }

    const assignColorsToTriggers = (currentTriggers: TriggerType[]): TriggerType[] => {
        const count = currentTriggers.length;
        if (count === 0) return [];

        const colorIndices = COLOR_DISTRIBUTION[count] || COLOR_DISTRIBUTION[9];

        return currentTriggers.map((trigger, index) => (
            trigger.action === Action.none ? trigger :
                {
                    ...trigger,
                    color: getColorVar(colorIndices[index])
                }
        ));
    };

    const addTrigger = () => {
        if (triggers.length >= 9) {
            setMaxTriggersReached(true);
            return;
        }

        const newTrigger: TriggerType = {
            id: crypto.randomUUID(),
            event: Event.priceDrop,
            eventByPercentage: 5,
            action: Action.more,
            actionByPercentage: 5,
            color: "",
        };

        const newTriggersList = [...triggers, newTrigger];
        const sortedTriggers = sortTriggers(newTriggersList);
        reassignColors(sortedTriggers);
    }

    const deleteTrigger = (index: number) => {
        const newTriggers = triggers.filter(((trigger, i) => i !== index));
        const sortedTriggers = sortTriggers(newTriggers);
        reassignColors(sortedTriggers);
    }

    const reassignColors = (currentTriggers: TriggerType[]) => {
        const coloredTriggers = assignColorsToTriggers(currentTriggers);
        setContextTriggers(coloredTriggers);
    }

    const sortTriggers = (currentTriggers: TriggerType[]) => {
        return [...currentTriggers].sort((a, b) => {
            const getPriority = (t: TriggerType) => {
                if (t.action === Action.none) {
                    console.log(t)
                    return 2;
                }
                else if (t.event === Event.priceRise) return 1;
                else if (t.event === Event.priceDrop) return 3;
                return 4;
            }

            const priorityA = getPriority(a);
            const priorityB = getPriority(b);

            /* Different events */
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            /* Event 'Price rise' */
            if (priorityA === 1) {
                return b.eventByPercentage - a.eventByPercentage;
            }

            /* Event 'Price drop' */
            if (priorityA === 3) {
                return a.eventByPercentage - b.eventByPercentage;
            }

            return 0;
        })
    }

    const handleTriggerChange = (index: number, field: keyof TriggerType, value: any) => {
        const updatedTriggers = triggers.map((trigger, i) => {
            if (i !== index) return trigger;

            const updatedTrigger = { ...trigger, [field]: value };

            if (field === "action" && value === Action.none) {
                updatedTrigger.color = "var(--traffic-light-neutral-light-color)";
            }

            return updatedTrigger;
        });

        const sorted = sortTriggers(updatedTriggers);
        reassignColors(sorted);
    };

    const handleReferenceChange = (value: TrafficLightReference) => {
        setContextReference(value);
    }

    const handleNameChange = (newName: string) => {
        setContextName(newName);
    }

    const createTrafficLight = async () => {
        const triggersForContext = triggers.map(item => ({
            id: crypto.randomUUID(),
            event: item.event,
            eventByPercentage: item.eventByPercentage,
            action: item.action,
            actionByPercentage: item.actionByPercentage,
            color: item.color
        }));

        setContextTriggers(triggersForContext);
        setShowCreateTrafficLightModal(false);
        await saveChanges();
    }

    useEffect(() => {
        console.log(currency)
    }, [currency]);

    return (
        <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
            <h3>{t("Market Traffic Lights")}</h3>
            <div className="gray-3-color-text mb-5">
                {t("You can set triggers to dynamically adapt your base investment price to the current market trend. With this tool you can invest more or less money based on certain events. You can also keep your assets protected from unwanted losses due to market drop.")}
            </div>

            <div className={"d-flex justify-content-between gap-4 w-100"}>

                {/* LEFT COLUMN - Buy Traffic Lights */}
                <div className={"d-flex flex-column"} style={{ width: "50%" }}>
                    <div className={"white-color-text"}
                         style={{ fontSize: "1.4rem", fontFamily: "PT Sans Caption" }}>
                        {t("Select from Your")}{" "}
                        <span style={{ color: "var(--secondary-color)" }}>{t("Buy")}</span>{" "}
                        {t("Traffic Lights")}
                    </div>

                    <CardContainer color="var(--secondary-color)" style={{ marginBottom: "5px", marginLeft: 0, borderRadius: "10px", overflow: "hidden", width: "100%", paddingLeft: 0, paddingRight: 0 }}>
                        <div className={"blur-bg-image-container"}>
                            <img src={BuyCryptoImg} className={"blur-bg-image"} alt={""} />

                            <div className={"content"}>
                                {userBuyTrafficLights.length < 1 ? (
                                  <div className="p-4 text-center">
                                      <div className={"gray-4-color-text mb-4"}>{t("You have no buy traffic lights defined")}</div>
                                      <Button color={ButtonColor.lightBrown} shadow={true}
                                              style={{ marginBottom: 0, fontWeight: "normal" }}
                                              onClick={newBuyTrafficLight}>{t("Define buy traffic light")}</Button>
                                  </div>
                                ) : (
                                  <div className="w-100">
                                      {userBuyTrafficLights.map(trafficLight => {
                                          const isSelected = buyTrafficLightId === trafficLight.id;
                                          return (
                                            <div className={`traffic-light-compact mt-2 ${isSelected ? "selected-traffic-light" : ""}`} key={trafficLight.id} onClick={() => handleRowClick(trafficLight)}>
                                                <div className="content">
                                                    {trafficLight.name}
                                                    {isSelected && (
                                                      <div className="selection-checkmark">
                                                          <FaCheck size={20} />
                                                      </div>
                                                    )}
                                                    <div className={"traffic-light-triggers-preview"}>
                                                        {trafficLight.triggers.map((trigger, idx) => (
                                                          <div key={idx} style={{ backgroundColor: trigger.color }} className={"traffic-light-circle-small"}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                          )
                                      })}
                                  </div>
                                )}
                            </div>
                        </div>
                    </CardContainer>
                </div>

                {/* RIGHT COLUMN - Sell Traffic Lights */}
                <div className={"d-flex flex-column"} style={{ width: "50%" }}>
                    <div className={"white-color-text"}
                         style={{ fontSize: "1.4rem", fontFamily: "PT Sans Caption" }}>
                        {t("Select from Your")}{" "}
                        <span style={{ color: "var(--secondary-color)" }}>{t("Sell")}</span>{" "}
                        {t("Traffic Lights")}
                    </div>

                    <CardContainer color="var(--secondary-color)" style={{borderRadius: "10px", overflow: "hidden", width: "100%", paddingLeft: 0, paddingRight: 0 }}>
                        <div className={"blur-bg-image-container"}>
                            <img src={SellCryptoImg} className={"blur-bg-image"} alt={""} />

                            <div className={"content"}>
                                {userSellTrafficLights.length < 1 ? (
                                  <div className="p-4 text-center">
                                      <div className={"gray-4-color-text mb-4"}>{t("You have no sell traffic lights defined")}</div>
                                      <Button color={ButtonColor.lightBrown} shadow={true}
                                              style={{ marginBottom: 0, fontWeight: "normal" }}
                                              onClick={newSellTrafficLight}>{t("Define sell traffic light")}</Button>
                                  </div>
                                ) : (
                                  <div className="w-100">
                                      {userSellTrafficLights.map(trafficLight => {
                                          const isSelected = sellTrafficLightId === trafficLight.id;
                                          return (
                                            <div className={`traffic-light-compact mt-2 ${isSelected ? "selected-traffic-light" : ""}`} key={trafficLight.id} onClick={() => handleRowClick(trafficLight)}>
                                                <div className="content">
                                                    {trafficLight.name}
                                                    {isSelected && (
                                                      <div className="selection-checkmark">
                                                          <FaCheck size={20} />
                                                      </div>
                                                    )}
                                                    <div className={"traffic-light-triggers-preview"}>
                                                        {trafficLight.triggers.map((trigger, idx) => (
                                                          <div key={idx} style={{ backgroundColor: trigger.color }} className={"traffic-light-circle-small"}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                          )
                                      })}
                                  </div>
                                )}
                            </div>
                        </div>
                    </CardContainer>
                </div>

            </div>

            <div className={"d-flex justify-content-between"}>
                <NextStepButton currentStep={currentStep} currentStepFinished={selectedAmount != null && selectedAmount > 0}  link={routes.profile.newInvestmentPlanInvestedAmount} variant={"previous"} color={"var(--sandy-color)"} />
                <NextStepButton currentStep={currentStep}
                                currentStepFinished={selectedAmount != null && selectedAmount > 0}
                                buttonLabel={t("Finish Setup")}
                                buttonDescription={t("You can always set traffic lights later")}
                                onClick={handleFinishSetup}
                />
            </div>

            {/* New traffic light modal */}
            <Modal
                show={showCreateTrafficLightModal}
                onHide={handleCloseCreateTrafficLightModal}
                centered
                size={"xl"}
                contentClassName="custom-modal"
            >
                <Modal.Body>
                    <div>
                        <h3>{t(`Define ${typeCamelCase} Traffic Light`)}</h3>
                        <div className={"mb-4"}>
                            {t("Within a traffic light you can define a trigger, which will ensure that buy action will occur when certain requirements are fulfilled.")}
                        </div>

                        {/* Triggers */}
                        <TrafficLightWrapper
                            triggers={triggers}
                            variant={"edit"}
                            type={type}
                            name={name}
                            reference={reference}
                            onTriggerChange={handleTriggerChange}
                            onTriggerDelete={deleteTrigger}
                            onTriggerAdd={addTrigger}
                            onReferenceChange={handleReferenceChange}
                            onNameChange={handleNameChange}
                            onTrafficLightCreate={createTrafficLight}
                        />
                    </div>
                </Modal.Body>
            </Modal>

            {/* Review traffic light modal */}
            <Modal
                show={showReviewTrafficLightModal}
                onHide={handleCloseReviewTrafficLightModal}
                centered
                size={"xl"}
                contentClassName="custom-modal"
            >
                <Modal.Body>
                    <TrafficLightWrapper
                        triggers={triggers}
                        variant={"details"}
                        type={type}
                        name={name}
                        reference={reference}
                        basePrice={100}
                        currency={currency}
                    />
                    <Button color={ButtonColor.gold} onClick={confirmSelection}>
                        {buyTrafficLightId === trafficLightClicked?.id || sellTrafficLightId === trafficLightClicked?.id
                            ? t("Deselect this Traffic Light")
                            : t("Select this Traffic Light")}
                    </Button>
                </Modal.Body>
            </Modal>

        </InvestmentPlanLayout>
    )
}