import {FC} from "react";
import {TrafficLightProvider} from "../../../utils/providers/TrafficLightProvider.tsx";
import {TrafficLightsComponent} from "../../../components/trafficLight/TrafficLightsComponent.tsx";

export const TrafficLights: FC = () => {
    return (
        <div>
            <TrafficLightProvider>
                <TrafficLightsComponent />
            </TrafficLightProvider>
        </div>
    );
}