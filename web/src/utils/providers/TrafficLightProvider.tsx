import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {TriggerType} from "../types/trafficLight/TriggerType.ts";
import {useNavigate, useParams} from "react-router-dom";
import {getTrafficLight, saveTrafficLight} from "../api/trafficLightsService.ts";
import {TrafficLightType} from "../types/trafficLight/TrafficLightType.ts";
import {TrafficLightReference} from "../enums/TrafficLight.ts";
import {showToast} from "../../components/toast/toastHelper.tsx";

type Props = {
    children: ReactNode;
};

type TrafficLightProps = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    triggers: TriggerType[];
    setTriggers: Dispatch<SetStateAction<TriggerType[]>>;
    reference: TrafficLightReference;
    setReference: Dispatch<SetStateAction<TrafficLightReference>>;
    saveChanges: () => Promise<void>;
    isLoading: boolean;
    type: "buy" | "sell",
    setType: (value: "buy" | "sell") => void;
    id?: number;
    setId: Dispatch<SetStateAction<number | undefined>>;
}

const TrafficLightContext = createContext<TrafficLightProps | undefined>(undefined);
export const TrafficLightProvider = ({ children }: Props) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState<string>("General Traffic Light");
    const [triggers, setTriggers] = useState<TriggerType[]>([]);
    const [type, setType] = useState<"buy" | "sell">("buy");
    const [reference, setReference] = useState<TrafficLightReference>(TrafficLightReference.ATH);
    const [idState, setIdState] = useState<number | undefined>(id ? parseInt(id) : undefined);

    useEffect(() => {
        if (!idState) return;

        const fetchTrafficLight = async () => {
            try {
                setIsLoading(true);
                const response = await getTrafficLight(idState);
                const trafficLight = response.data;

                setName(trafficLight.name);
                setTriggers(trafficLight.triggers);
                setType(trafficLight.type);
                setReference(trafficLight.reference)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrafficLight();
    }, [idState, t, navigate]);

    const saveChanges = async () => {
        if (!name.trim()) {
            showToast.error(t('Traffic light name is required'));
            return;
        }

        if (!triggers.length) {
            showToast.error(t('Please add at least one trigger'));
            return;
        }

        showToast.info(t("Saving traffic light..."));

        try {
            setIsLoading(true);

            const trafficLightData: TrafficLightType = {
                id: idState,
                name: name.trim(),
                triggers: triggers,
                reference: reference,
                type: type
            };

            await saveTrafficLight(trafficLightData);

            showToast.success(t('Traffic light saved successfully!'));

        } catch (e) {
            console.error('Error while saving traffic light', e);
            showToast.error(t('Error while saving. Please try again.'), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const value: TrafficLightProps = {
        name,
        setName,
        triggers,
        setTriggers,
        reference,
        setReference,
        saveChanges,
        isLoading,
        type,
        setType,
        id: idState,
        setId: setIdState
    };

    return (
        <TrafficLightContext.Provider value={value}>{children}</TrafficLightContext.Provider>
    );
}

export const useTrafficLightContext = () => {
    const context = useContext(TrafficLightContext);
    if (context === undefined) {
        throw new Error("useTrafficLightContext() must be used within a TrafficLightProvider");
    }
    return context;
};