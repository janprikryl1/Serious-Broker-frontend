import { api } from "@/utils/api/axiosInstance.ts"
import type { QRCodeType } from "@/utils/types/qrCode.ts"

export const getQR = async (): Promise<QRCodeType> => {
  const res = await api.get<QRCodeType>("qr_codes/get_qr_code.php")
  return res.data
}

export const saveQRCode = async (
  formData: Partial<QRCodeType>,
  image: File | null
) => {
  const formImageData = new FormData()
  formImageData.append("description", formData.description || "")
  formImageData.append("network", formData.network || "")
  formImageData.append("address_of_deposit", formData.address_of_deposit || "")
  if (image) {
    formImageData.append("image", image)
  }

  const res = await api.post("qr_codes/update_qr_code.php", formImageData)
  return res.data
}
