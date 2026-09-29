import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time } from "lightweight-charts";
import { KlineData } from "../../utils/types/asset/KlineData.ts";
import {CHART_COLORS} from "../../utils/constants/customColors.ts";

type Props = {
  klinesData: KlineData[]; // Pole sviečkových dát
  isKlinesLoading: boolean;
  assetLabel?: string;
};

// Price tab
export const CryptoDetailsTab3: FC<Props> = ({ klinesData, isKlinesLoading, assetLabel }) => {
  const { t } = useTranslation();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 450,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#D9D9D9",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.08)" },
        horzLines: { color: "rgba(255, 255, 255, 0.08)" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: CHART_COLORS.green,
      downColor: CHART_COLORS.red,
      borderVisible: false,
      wickUpColor: CHART_COLORS.green,
      wickDownColor: CHART_COLORS.red,
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !klinesData || klinesData.length === 0) return;

    const formattedData: CandlestickData<Time>[] = klinesData.map((item: any) => ({
      time: (item[0] / 1000) as Time,
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
    }));

    formattedData.sort((a, b) => (a.time as number) - (b.time as number));

    candlestickSeriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
  }, [klinesData]);

  return (
    <div className="tw-pt-6 tw-w-full">
      <div className="tw-relative tw-w-full tw-min-h-[450px]">
        {klinesData.length === 0 && (
          <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-neutral-900/50 tw-z-10 tw-rounded-lg">
            <span className="tw-text-white">{t("Loading data...")}</span>
          </div>
        )}
        <div ref={chartContainerRef} className="tw-w-full tw-rounded-lg tw-overflow-hidden" />
      </div>
    </div>
  );
};