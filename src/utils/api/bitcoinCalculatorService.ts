import axios from "axios";
import {backendUrl} from "../../env.ts";
//api.serious.broker/binance/bitcoin_calculator.php?investment_amount=1&currency=USD&purchase_date=2020-01-01
export const bitcoinProfitCalculate = async (amount: number, currency: string, purchaseDate: string) => {
    return await axios.get(`${backendUrl}/binance/bitcoin_calculator.php`, {
        params: {
            investment_amount: amount,
            currency: currency,
            purchase_date: purchaseDate
        }
    })
}