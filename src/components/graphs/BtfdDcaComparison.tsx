import {FC, useEffect, useMemo, useRef, useState} from "react";
import {getAssetSpotKlines} from "../../utils/api/GraphsService.ts";
import {getBinanceAssetATH} from "../../utils/api/ATHService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {useTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CardContainer} from "../reusable/CardContainer.tsx";
import {ATHType} from "../../utils/types/ATH/ATHType.ts";
import {OutlineContainer} from "../reusable/OutlineContainer.tsx";
import {GlassCard} from "../reusable/GlassCard.tsx";
import { createChart, ColorType, LineStyle } from "lightweight-charts";
import {InfoIcon} from "lucide-react";
import {InfoIconTooltip} from "../reusable/InfoIconTooltip.tsx";
import {formatCurrency} from "../../utils/functions/functions.ts";
import {CHART_COLORS} from "../../utils/constants/customColors.ts";

type Props = {
  asset_label: string;
};

enum Month {
  "January" = 1,
  "February" = 2,
  "March" = 3,
  "April" = 4,
  "May" = 5,
  "June" = 6,
  "July" = 7,
  "August" = 8,
  "September" = 9,
  "October" = 10,
  "November" = 11,
  "December" = 12,
}

type ProcessedDataPoint = { datetime: string, closeEur: number };
type ReturnDataPoint = { datetime: string, return: number };
const chartHeight = 600;

export const BtfdDcaComparison: FC<Props> = ({asset_label}) => {
  const {t, i18n} = useTranslation();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
  const [filteredData, setFilteredData] = useState<ProcessedDataPoint[] | undefined>();
  const [selectedNumOfYears, setSelectedNumOfYears] = useState(1);
  const chartMargins = useMemo(
    () => ({left: 0, right: 0, top: 0, bottom: 0}),
    []
  );
  const [baseInvestment, setBaseInvestment] = useState(100);
  const [periodInvestment, setPeriodInvestment] = useState(1);
  const [maxMultiplier, setMaxMultiplier] = useState(3);
  const [maxDecrease, setMaxDecrease] = useState(0.75);
  const [DCAReturn, setDCAReturn] = useState(0);
  const [DCATotalInvested, setDCATotalInvested] = useState(0);
  const [BTFDReturn, setBTFDReturn] = useState(0);
  const [BTFDTotalInvested, setBTFDTotalInvested] = useState(0);
  const [DCAReturnValues, setDCAReturnValues] = useState<number[]>([]);
  const [BTFDReturnValues, setBTFDReturnValues] = useState<number[]>([]);
  const [DCAReturnPoints, setDCAReturnPoints] = useState<ReturnDataPoint[] | undefined>();
  const [BTFDReturnPoints, setBTFDReturnPoints] = useState<ReturnDataPoint[] | undefined>();
  const [ATHs, setATHs] = useState<number[]>([])
  const [assetATH, setAssetATH] = useState<ATHType | null>(null);
  const blue = getComputedStyle(document.documentElement).getPropertyValue('--chart-blue').trim()
  const red = getComputedStyle(document.documentElement).getPropertyValue('--chart-red').trim()
  const green = getComputedStyle(document.documentElement).getPropertyValue('--chart-green').trim()
  const orange = getComputedStyle(document.documentElement).getPropertyValue('--chart-orange').trim()

  const getMonth = (data: String) => {
    return t(Month[parseInt(data.split("-")[1])]);
  }

  const getYear = (data: String) => {
    return data.split("-")[0];
  }

  const MAX = 10;
  const MIN = 1;
  const marks = [
    {
      value: MIN,
      label: '3x',
    },
    {
      value: MAX,
      label: '10x',
    },
  ];

  const formatPercent = (val: number, language: string) => {
    const locale = language.startsWith("cs") || language.startsWith("sk") ? "cs-CZ" : "en-US";

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: "exceptZero",
    }).format(val);
  };

  useEffect(() => {
    if (!asset_label) return;
    const getData = async () => {
      setGraphData(undefined);
      setFilteredData(undefined);
      setAssetATH(null);
      try {
        const [klinesResponse, athResponse] = await Promise.all([
          getAssetSpotKlines(asset_label, selectedNumOfYears),
          getBinanceAssetATH(asset_label),
        ]);

        if (athResponse?.data) {
          const parsedPriceEur = Number(athResponse.data.price_eur);
          const parsedPriceUsd = Number(athResponse.data.price_usd);
          setAssetATH({
            ...athResponse.data,
            price_eur: Number.isFinite(parsedPriceEur) ? parsedPriceEur : 0,
            price_usd: Number.isFinite(parsedPriceUsd) ? parsedPriceUsd : 0,
          });
        }

        if (klinesResponse?.data) {
          const processedData: ProcessedDataPoint[] = klinesResponse.data.map((p: any) => ({
            datetime: p.datetime,
            closeEur: parseFloat(p.close_eur),
          }));
          setGraphData(processedData);

          setFilteredData(processedData.filter((_, index) => index % 70 === 0))

        } else {
          setGraphData([]);
          setFilteredData([]);
        }
      } catch (e) {
        CustomSwal.fire({
          title: t("Error"),
          text: t("Something went wrong"),
          icon: "error",
        });
        setGraphData([]);
        setFilteredData([]);
      }
    };
    getData();
  }, [asset_label, selectedNumOfYears, t]);

  // Compute DCA
  useEffect(() => {

    if (graphData && filteredData) {
      const points = filteredData.map((p) => p)

      let totalInvested = 0;
      let totalAssetUnitsOwned = 0;
      let ret = 0;

      const data: number[] = [];

      for (const p of points) {
        totalInvested += baseInvestment;
        totalAssetUnitsOwned += baseInvestment / p.closeEur;

        const holdingsValue = p.closeEur * totalAssetUnitsOwned;

        const profit = holdingsValue - totalInvested;
        ret = profit / totalInvested;

        data.push(ret * 100);
      }

      setDCAReturn(ret * 100);
      setDCATotalInvested(totalInvested);
      setDCAReturnValues(data);

      const DCAPoints: ReturnDataPoint[] = points.map((p, i) => ({
        datetime: p.datetime,
        return: data[i]
      }));
      setDCAReturnPoints(DCAPoints);
    }
  }, [baseInvestment, periodInvestment, filteredData, graphData]);

  // Compute BTFD
  useEffect(() => {
    if (graphData && filteredData) {

      const points = filteredData.map((p) => p)

      const initialATH = Number(assetATH?.price_eur);
      let currentATH = Number.isFinite(initialATH) && initialATH > 0
        ? initialATH
        : (points[0]?.closeEur ?? 0);

      let totalInvested = 0;
      let totalAssetUnitsOwned = 0;
      let ret = 0;

      const data: number[] = [];

      const aths: number[] = [];

      for (const p of points) {

        if (p.closeEur > currentATH) {
          currentATH = p.closeEur;
        }

        aths.push(currentATH);

        const priceDecrease = currentATH > 0
          ? Math.min((currentATH - p.closeEur) / currentATH, maxDecrease)
          : 0;
        const multiplier = 1 + ((maxMultiplier - 1) / maxDecrease * priceDecrease);

        const actualInvestment = multiplier * baseInvestment;

        totalInvested += actualInvestment;
        totalAssetUnitsOwned += actualInvestment / p.closeEur;

        const holdingsValue = p.closeEur * totalAssetUnitsOwned;
        const profit = holdingsValue - totalInvested;
        ret = profit / totalInvested;

        data.push(ret * 100);
      }

      setBTFDReturn(ret * 100);
      setBTFDTotalInvested(totalInvested);
      setBTFDReturnValues(data);
      setATHs(aths);

      const BTFDPoints: ReturnDataPoint[] = points.map((p, i) => ({
        datetime: p.datetime,
        return: data[i]
      }));
      setBTFDReturnPoints(BTFDPoints);

    }
  }, [baseInvestment, periodInvestment, maxDecrease, maxMultiplier, filteredData, graphData, assetATH]);

  // TradingView Lightweight Charts Initialization
  useEffect(() => {
    if (!chartContainerRef.current || !filteredData || filteredData.length === 0) return;

    const chartContainer = chartContainerRef.current;
    chartContainer.innerHTML = "";

    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth,
      height: chartHeight,
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
    });

    // 1. ATH Series (Ľavá os - Price)
    const athSeries = chart.addLineSeries({
      color: CHART_COLORS.red,
      lineWidth: 1,
      priceScaleId: "left",
      title: t("ATH"),
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toLocaleString('fr-FR', {minimumFractionDigits: 0, maximumFractionDigits: 2})} €`,
      },
    });

    // 2. Price Series (Ľavá os - Price)
    const priceSeries = chart.addLineSeries({
      color: CHART_COLORS.green,
      lineWidth: 2,
      priceScaleId: "left",
      title: t("Price"),
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toLocaleString('fr-FR', {minimumFractionDigits: 0, maximumFractionDigits: 2})} €`,
      },
    });

    // 3. DCA Series (Pravá os - Return)
    const dcaSeries = chart.addLineSeries({
      color: CHART_COLORS.blue,
      lineWidth: 2,
      priceScaleId: "right",
      title: `DCA ${t("return")}`,
      priceFormat: {
        type: "custom",
        formatter: (val: number) => `${val.toFixed(2)} %`,
      },
    });

    // 4. BTFD Series (Pravá os - Return)
    const btfdSeries = chart.addLineSeries({
      color: CHART_COLORS.orange,
      lineWidth: 2,
      priceScaleId: "right",
      title: `BTD ${t("return")}`,
      priceFormat: {
        type: "custom",
        formatter: (val: number) => `${val.toFixed(2)} %`,
      },
    });

    // Príprava dát do formátu pre TradingView: { time: 'YYYY-MM-DD', value: number }
    const formattedAthData: any[] = [];
    const formattedPriceData: any[] = [];
    const formattedDcaData: any[] = [];
    const formattedBtfdData: any[] = [];

    filteredData.forEach((p, i) => {
      // Extrahujeme striktne formát "YYYY-MM-DD" bez časovej zložky
      const dateStr = p.datetime.substring(0, 10);

      if (ATHs[i] !== undefined) {
        formattedAthData.push({ time: dateStr, value: ATHs[i] });
      }
      formattedPriceData.push({ time: dateStr, value: p.closeEur });
      if (DCAReturnValues[i] !== undefined) {
        formattedDcaData.push({ time: dateStr, value: DCAReturnValues[i] });
      }
      if (BTFDReturnValues[i] !== undefined) {
        formattedBtfdData.push({ time: dateStr, value: BTFDReturnValues[i] });
      }
    });

    athSeries.setData(formattedAthData);
    priceSeries.setData(formattedPriceData);
    dcaSeries.setData(formattedDcaData);
    btfdSeries.setData(formattedBtfdData);

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [filteredData, ATHs, DCAReturnValues, BTFDReturnValues, t]);

  return (
    <>
      <div className="investment-comparison tw-mb-16 tw-pb-5">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          {/* DCA Card */}
          <GlassCard className="tw-p-6 tw-flex tw-flex-col tw-justify-between" bgColor="var(--secondary-color)" opacity={0.2}>
            <div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-9">
                <h6 className="tw-pb-0">
                  {t("DCA - Dollar Cost Averaging")}
                </h6>
                <span className="tw-px-2.5 tw-py-1 tw-text-sm  color-container--white">
                  {t("Passive Strategy")}
                </span>
              </div>

              <p className="tw-mb-6">
                {t("A simple but effective strategy focused on long-term growth and consistency without market timing.")}
              </p>

              <ul className="tw-space-y-3 tw-list-disc tw-pl-5">
                <li>
                  <strong>{t("Core Principle:")}</strong> {t("Periodically investing a fixed amount regardless of asset price.")}
                </li>
                <li>
                  <strong>{t("How it works:")}</strong> {t("Fixed time interval + fixed cash amount.")}
                </li>
                <li>
                  <strong>{t("Best for:")}</strong> {t("Stress-free, long-term automated investing.")}
                </li>
              </ul>
            </div>
          </GlassCard>

          {/* BTFD Card */}
          <GlassCard className="tw-p-6 tw-flex tw-flex-col tw-justify-between" bgColor="var(--secondary-color)" opacity={0.2}>
            <div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-9">
                <h6 className="tw-pb-0">
                  {t("BTD - Buy the Dip")}
                </h6>
                <span className=" tw-px-2.5 tw-py-1 tw-text-sm color-container--white">
                  {t("Dynamic Strategy")}
                </span>
              </div>

              <p className="tw-mb-6">
                {t("A dynamic strategy where the investment amount automatically increases as the price drops.")}
              </p>

              <ul className="tw-space-y-3 tw-list-disc tw-pl-5">
                <li>
                  <strong>{t("Core Principle:")}</strong> {t("The lower the price drops, the more capital you invest.")}
                </li>
                <li>
                  <strong>{t("How it works:")}</strong> {t("Calculates a multiplier based on price decline relative to ATH (All-Time High), which scales the base investment.")}
                </li>
                <li>
                  <strong>{t("Best for:")}</strong> {t("Maximizing returns during market corrections.")}
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </div>


      <h5>{t("Simulation Parameters")}</h5>

      {/* Form */}
      <div >
        <GlassCard className="tw-mb-8">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-8 tw-text-sm font-weight-bold">
            {/*<span className="tw-text-gray-2">{t("Platí pre:")}</span>*/}
            <span className="color-container--chart-blue">DCA</span>
            <span className="color-container--chart-orange">BTD</span>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 align-items-end">
            <div className="d-flex flex-column gap-2">
              <Form.Label className="mb-2 fw-medium">
                {t("Regular daily investment for a period of:")}
              </Form.Label>
              <Form.Select
                className="select-box-outline w-100"
                value={selectedNumOfYears}
                onChange={(e) => setSelectedNumOfYears(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? t("year") : t("years")}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="d-flex flex-column gap-2">
              <Form.Label className="mb-2 fw-medium">
                {t("Base investment amount (EUR):")}
              </Form.Label>
              <Form.Control
                className="outline-input w-100"
                type="number"
                value={baseInvestment}
                onChange={(e) => setBaseInvestment(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="tw-mb-16">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-14 tw-text-sm">
            {/*<span className="tw-text-gray-2">{t("Platí pre:")}</span>*/}
            <div className="color-container--chart-orange">BTD </div>
          </div>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "8rem",
            alignItems: isMobile ? "flex-start" : "center"
          }}>
            <div style={{display: "flex", gap: "10px", width: isMobile ? "100%" : "auto"}}>
              <Form.Label className="form-label">
                {t("Maximal investment multiplier:")}
              </Form.Label>
              <InfoIconTooltip placement={"bottom"} text={t("athMultiplierDescription")} />
            </div>


            <Slider
              className="form-control-slider"
              marks={marks}
              value={maxMultiplier}
              onChange={(event, value) => setMaxMultiplier(value as number)}
              min={MIN}
              max={MAX}
              step={0.1}
              valueLabelDisplay="on"
              color={"#C5A657" as any}
              sx={{
                width: isMobile ? "100%" : 300,
                color: "#C5A657",
                "& .MuiSlider-mark": {
                  height: 0,
                  width: 0,
                },
                "& .MuiSlider-markLabel": {
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                },
                "& .MuiSlider-thumb": {
                  width: 15,
                  height: 15,
                },
              }}
            />
          </div>
        </GlassCard>
      </div>

      <h5>{t("Simulation Results")}</h5>

      <div className="justify-content-center text-center align-items-center" style={{display: "flex"}}>
        <OutlineContainer bgColor={"var(--quaternary-color-transparent-50)"} className="w-100 tw-p-6" style={{ maxWidth: "900px" }}>
          <div className="row text-center justify-content-center align-items-stretch g-4">

            {/* ĽAVÝ STŔPEC (DCA) - border na pravej strane */}
            <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-between tw-gap-5 tw-pb-6 md:tw-pb-0 md:tw-pr-6"
                 style={{
                   borderRight: isMobile ? "none" : "1px solid var(--gray-4-color)",
                   borderBottom: isMobile ? "1px solid var(--gray-4-color)" : "none"
                 }}
            >
              <div className="color-container--chart-blue">
                DCA {t("strategy")}
              </div>
              <div>
                <div className="fw-bold fs-2 tw--mb-1">
                  {formatPercent(DCAReturn, i18n.language)} %
                </div>
                <div className="tw-text-base tw-text-gray-2">{t("Return")}</div>
              </div>
              <div className="row w-100 g-2 pt-2 tw-border-t tw-border-white/10">
                <div className="col-6">
                  <div className="fs-5 tw--mb-1">
                    {formatCurrency(baseInvestment, i18n.language)}
                  </div>
                  <div className="tw-text-sm tw-text-gray-2">{t("Daily investment")}</div>
                </div>
                <div className="col-6">
                  <div className="fs-5 tw--mb-1">
                    {formatCurrency(DCATotalInvested, i18n.language)}
                  </div>
                  <div className="tw-text-sm tw-text-gray-2">{t("Total invested")}</div>
                </div>
              </div>
            </div>

            {/* PRAVÝ STŔPEC (BTD) */}
            <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-between tw-gap-5 md:tw-pl-6">
              <div className="color-container--chart-orange">
                BTD {t("strategy")}
              </div>
              <div>
                <div className="fw-bold fs-2 tw--mb-1">
                  {formatPercent(BTFDReturn, i18n.language)} %
                </div>
                <div className="tw-text-base tw-text-gray-2">{t("Return")}</div>
              </div>
              <div className="row w-100 g-2 pt-2 tw-border-t tw-border-white/10">
                <div className="col-6">
                  <div className="fs-5 tw--mb-1 tw-whitespace-nowrap">
                    {formatCurrency(baseInvestment, i18n.language)} – {formatCurrency(baseInvestment * maxMultiplier, i18n.language)}
                  </div>
                  <div className="tw-text-sm tw-text-gray-2">{t("Daily investment range")}</div>
                </div>
                <div className="col-6">
                  <div className="fs-5 tw--mb-1">
                    {formatCurrency(BTFDTotalInvested, i18n.language)}
                  </div>
                  <div className="tw-text-sm tw-text-gray-2">{t("Total invested")}</div>
                </div>
              </div>
            </div>

          </div>
        </OutlineContainer>
      </div>

      <div className="col-sm tw-pb-4 tw-mt-4 tw-mb-[150px]">
        <div
          style={{
            width: "100%",
            overflowX: isMobile ? "auto" : "visible",
            overflowY: "visible",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {graphData && graphData.length > 0 ? (
            <div
              ref={chartContainerRef}
              style={{
                width: "100%",
                height: `${chartHeight}px`,
                position: "relative",

              }}
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                height: `${chartHeight}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4>
                {t(graphData === undefined ? "Loading chart data..." : "No data available for chart.")}
              </h4>
            </div>
          )}
        </div>
      </div>
      {/*{asset_label && <BtfdDcaReturnsComparison asset_label={asset_label} BTFDReturnPoints={BTFDReturnPoints} DCAReturnPoints={DCAReturnPoints}/>}*/}
    </>
  )
}