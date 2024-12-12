const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4D4D', '#4D80FF', '#4DD0E1', '#80FF80', '#80C4FF', '#C4A0FF', '#FFA0A0', '#FF8080', '#A04D80', '#8080FF', '#80FFFF', '#FFFF80', '#00FF80', '#008000', '#0000FF'];
export const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export const toCzechDateFormat = (dateRaw: string): string => {
    const date = new Date(dateRaw);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Měsíce jsou 0-indexované
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}. ${month}. ${year} ${hours}:${minutes}`;
}

export const toCzechDate = (dateRaw: string): string => {
    const date = new Date(dateRaw);
    return `${date.getDate()}. ${date.getMonth()+1}. ${date.getFullYear()}`;
}

export const getDayName = (dayNumber: number) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNumber ? daysOfWeek[dayNumber] : 'Unknown day';
}

export const convertUTCToLocalTime = (utcHour: number) => {
    const utcDate = new Date(Date.UTC(2024, 0, 1, utcHour));
    const localTime = utcDate.toLocaleString(navigator.language, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return localTime;
}

export const getYear = (yearNumber: number) => {
    return 2024 - yearNumber;
}

export const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
}

export const calculateProfit = (profit: number | null): number | null =>
    profit !== null ? (profit - 1) * 100 : null;

export const filterGraphData = (graphData: string): number[] => {
    const parsedData = JSON.parse(graphData);
    return parsedData.filter((_: number, index: number) => index % 10 === 0);
};