import eur from "../icons/fiatCoins/eur.webp";
import usd from "../icons/fiatCoins/usd.webp";
import usdt from "../icons/fiatCoins/usdt.webp";
import unknown_coin from "../icons/fiatCoins/unknown_coin.webp";

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
