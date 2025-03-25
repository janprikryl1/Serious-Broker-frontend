import axios from "axios";
import {backendUrl} from "../../env.ts";
import {QRCodeType} from "../types/QRCodeType.ts";

export const getQR = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = axios.get(backendUrl + "qr_codes/get_qr_code.php", {
        headers: {
            Authorization: "Bearer " + token 
        }
    });
    return await response;
}

export const saveQRCode = async (formData: Partial<QRCodeType>, image: File | null) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const formImageData = new FormData();
    formImageData.append("description", formData.description || "");
    formImageData.append("network", formData.network || "");
    formImageData.append("address_of_deposit", formData.address_of_deposit || "");
    if (image) {
        formImageData.append("image", image);
    }

    const response = axios.post(backendUrl + "qr_codes/update_qr_code.php", formImageData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response;
};