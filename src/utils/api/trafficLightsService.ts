import { api } from "./axiosInstance.ts";
import {TrafficLightType} from "../types/trafficLight/TrafficLightType.ts";

export const getTrafficLights = async () => {
    return await api.get<TrafficLightType[]>(`traffic_light/get_traffic_lights.php`);
}

export const getTrafficLight = async (id: number) => {
    return await api.get<TrafficLightType>(`traffic_light/traffic_light.php?id=${id}`);
}

export const saveTrafficLight = async (data: TrafficLightType) => {
    return await api.post(`traffic_light/traffic_light.php`, data);
}

export const deleteTrafficLight = async (id: number) => {
    return await api.delete(`traffic_light/traffic_light.php?id=${id}`);
}