export const calculateProfit = (profit: number | null): number | null =>
    profit !== null ? (profit - 1) * 100 : null;

export const toPercentTwoDecimal = (profit: number) => {
    return Math.round((profit * 100) * 100)/100;
}

export const formatLargeCurrency = (number: number | string, multiplier = 1) => {
    const scaledNumber = Number(number) * multiplier;
    return `$${scaledNumber.toLocaleString('en-US')}`;
}

/*export const formatCurrency = (number: number | string) => {
    const price = Number(number);
    return price.toFixed(2);
}*/

export const formatCurrency = (number: number | string, language: string = "en", currency: string = "EUR") => {
    const price = Number(number);
    const validPrice = Number.isFinite(price) ? price : 0;
    const locale = language.startsWith("cs") ? "cs-CZ" : "en-US";
    const formattedNumber = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(validPrice);

    const currencySymbol = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).formatToParts(validPrice).find((part) => part.type === "currency")?.value ?? currency;

    return locale.startsWith("cs") ? `${formattedNumber} ${currencySymbol}` : `${currencySymbol}${formattedNumber}`;
};

export const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
