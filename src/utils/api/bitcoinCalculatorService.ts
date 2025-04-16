import axios from "axios";
import {backendUrl} from "../../env.ts";
import {BitcoinCalculatorResponseType} from "../types/BitcoinCalculatorResponseType.ts";

export const bitcoinProfitCalculate = async (amount: number, currency: string, purchaseDate: string) => {
    return await axios.get<BitcoinCalculatorResponseType>(`${backendUrl}/binance/bitcoin_calculator.php`, {
        params: {
            investment_amount: amount,
            currency: currency,
            purchase_date: purchaseDate
        }
    })
}