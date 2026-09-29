import { ColorType, ChartOptions, DeepPartial } from "lightweight-charts";

// Theme
export const transparentChartTheme: DeepPartial<ChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: "transparent" },
    textColor: "#D9D9D9",
  },
  grid: {
    vertLines: { color: "rgba(255, 255, 255, 0.08)" },
    horzLines: { color: "rgba(255, 255, 255, 0.08)" },
  },
  leftPriceScale: {
    visible: true,
    borderVisible: true,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  rightPriceScale: {
    visible: true,
    borderVisible: true,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  timeScale: {
    borderVisible: true,
    borderColor: "rgba(255, 255, 255, 0.2)",
    timeVisible: true,
  },
};

export const getBaseChartOptions = (
  containerWidth: number,
  height: number,
  overrides?: DeepPartial<ChartOptions>
): DeepPartial<ChartOptions> => {
  return {
    width: containerWidth,
    height: height,
    ...transparentChartTheme,
    ...overrides,
    layout: {
      ...transparentChartTheme.layout,
      ...overrides?.layout,
    },
    grid: {
      ...transparentChartTheme.grid,
      ...overrides?.grid,
    },
    timeScale: {
      ...transparentChartTheme.timeScale,
      ...overrides?.timeScale,
    },
    crosshair: {
      ...transparentChartTheme.crosshair,
      ...overrides?.crosshair,
    },
  };
};