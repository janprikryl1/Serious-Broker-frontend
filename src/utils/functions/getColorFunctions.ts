const colors = [
    "#aa0000",
    "#2E7D32"
];

export const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export const generateColor = (index: number) => {
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
};
