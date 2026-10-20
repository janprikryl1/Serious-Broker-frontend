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