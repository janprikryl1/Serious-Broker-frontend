import {TriggerType} from "./TriggerType.ts";
import {TrafficLightReference} from "../../enums/TrafficLight.ts";

export type TrafficLightType = {
    id?: number;
    name: string;
    user_id?: number;
    last_updated?: string | Date;
    triggers: TriggerType[];
    type: "buy" | "sell";
    reference: TrafficLightReference;
}