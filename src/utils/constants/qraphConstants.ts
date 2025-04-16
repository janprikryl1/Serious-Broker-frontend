const graphColor = {
    color: '#000',
    backgroundColor: '#ffca2d',
}

export const graphColors = {
    day: {
        sx: {
            '&.Mui-selected': graphColor,
            '&.Mui-selected:focus': graphColor,
            '&.Mui-selected.Mui-focusVisible': graphColor,
        },
    },
}

export const MAX_RANGES = {
    "1m": 2 * 24 * 60 * 60 * 1000, // 2 days
    "3m": 2 * 24 * 60 * 60 * 1000,
    "5m": 7 * 24 * 60 * 60 * 1000, // 7 days
    "15m": 7 * 24 * 60 * 60 * 1000,
    "30m": 7 * 24 * 60 * 60 * 1000,
    "1h": 2 * 365 * 24 * 60 * 60 * 1000, // 2 years
    "2h": 2 * 365 * 24 * 60 * 60 * 1000,
    "4h": 2 * 365 * 24 * 60 * 60 * 1000,
    "6h": 2 * 365 * 24 * 60 * 60 * 1000,
    "8h": 2 * 365 * 24 * 60 * 60 * 1000,
    "12h": 2 * 365 * 24 * 60 * 60 * 1000,
    "1d": 2 * 365 * 24 * 60 * 60 * 1000,
    "3d": 2 * 365 * 24 * 60 * 60 * 1000,
    "1w": 2 * 365 * 24 * 60 * 60 * 1000,
    "1M": NaN
};