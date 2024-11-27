export type KlineData = [
    number, // Open time
    string, // Open price
    string, // High price
    string, // Low price
    string, // Close price
    string, // Volume
    number, // Close time
    string, // Quote asset volume
    number, // Number of trades
    string, // Taker buy base asset volume
    string, // Taker buy quote asset volume
    string  // Ignore
];

export type KlineGraphData = [
    openTime: number, // Open time (timestamp)
    open: string, // Open price
    high: string, // High price
    low: string, // Low price
    close: string, // Close price
    volume: string, // Volume
    closeTime: number, // Close time (timestamp)
    quoteAssetVolume: string, // Quote asset volume
    numberOfTrades: number, // Number of trades
    takerBuyBaseVolume: string, // Taker buy base asset volume
    takerBuyQuoteVolume: string, // Taker buy quote asset volume
    ignore: string // Ignore (unused)
];

export type CandlestickData = {
    x: Date;
    y: [number, number, number, number]; // [Open, High, Low, Close]
};