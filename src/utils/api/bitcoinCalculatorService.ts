import { api } from "./axiosInstance.ts";
import {BitcoinCalculatorResponseType} from "../types/BitcoinCalculatorResponseType.ts";

export const bitcoinProfitCalculate = async (amount: number, currency: string, purchaseDate: string) => {
    return await api.get<BitcoinCalculatorResponseType>(`binance/bitcoin_calculator.php`, {
        params: {
            investment_amount: amount,
            currency: currency,
            purchase_date: purchaseDate
        }
    })
}