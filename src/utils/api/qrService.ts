import { api } from "./axiosInstance.ts";
import {QRCodeType} from "../types/admin/QRCodeType.ts";

export const getQR = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.get("qr_codes/get_qr_code.php");
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

    return await api.post("qr_codes/update_qr_code.php", formImageData);
};