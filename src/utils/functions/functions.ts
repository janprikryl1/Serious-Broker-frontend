export const calculateProfit = (profit: number | null): number | null =>
    profit !== null ? (profit - 1) * 100 : null;

export const toPercentTwoDecimal = (profit: number) => {
    return Math.round((profit * 100) * 100)/100;
}

export const formatLargeCurrency = (number: number | string, multiplier = 1) => {
    const scaledNumber = Number(number) * multiplier;
    return `$${scaledNumber.toLocaleString('en-US')}`;
}