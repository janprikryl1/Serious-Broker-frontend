export type MyThreeAssetsDataType = {
    id: number;
    name: string;
    description: string;
    monthlyChartData: {
        price: number;
        data: Record<string, number>;
    },
}