import eur from "../icons/fiatCoins/eur.png";
import usd from "../icons/fiatCoins/usd.png";
import usdt from "../icons/fiatCoins/usd.png";
import unknown_coin from "../icons/fiatCoins/unknown_coin.png";

const fiatCoins: Record<string, string> = {
    USDT: usdt,
    EUR: eur,
    USD: usd,
    USDC: usdt,
};

export const getFiatCoin = (coin: string): string => {
    for (const fiat of Object.keys(fiatCoins)) {
        if (coin.includes(fiat)) {
            return fiatCoins[fiat];
        }
    }
    return unknown_coin;
};
