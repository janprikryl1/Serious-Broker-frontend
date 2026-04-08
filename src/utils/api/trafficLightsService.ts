import axios from "axios";
import {backendUrl} from "../../env.ts";
import {TrafficLightType} from "../types/trafficLight/TrafficLightType.ts";

export const getTrafficLights = async () => {
    const token = localStorage.getItem('token');
    return await axios.get<TrafficLightType[]>(`${backendUrl}/traffic_light/get_traffic_lights.php`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getTrafficLight = async (id: number) => {
    const token = localStorage.getItem('token');
    return await axios.get<TrafficLightType>(`${backendUrl}/traffic_light/traffic_light.php?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const saveTrafficLight = async (data: TrafficLightType) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${backendUrl}/traffic_light/traffic_light.php`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteTrafficLight = async (id: number) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${backendUrl}/traffic_light/traffic_light.php?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}