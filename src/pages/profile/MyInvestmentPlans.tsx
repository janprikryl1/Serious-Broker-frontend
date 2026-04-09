import React, {FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {deleteInvestmentPlan, getInvestmentPlansDetails} from "../../utils/api/investmentPlanService.ts";
import {InvestmentPlanType, InvestmentPlanTypeDetails} from "../../utils/types/investmentPlan/InvestmentPlanType.ts";
import {CardContainer} from "../../components/reusable/CardContainer.tsx";
import {Button} from "../../components/reusable/Button.tsx";
import {CustomTooltip} from "../../components/reusable/CustomTooltip.tsx";
import {routes} from "../../utils/constants";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {ChartContainer, ChartsGrid, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
import {getAssetSpotKlines} from "../../utils/api/GraphsService.ts";
import {GraphDataSkeleton} from "../../components/graphs/asset/GraphDataSkeleton.tsx";
import {GoPlus} from "react-icons/go";
import {IoWalletOutline} from "react-icons/io5";
import {FiDollarSign} from "react-icons/fi";
import {LuClock, LuTrendingUp, LuTrendingDown, LuTrash} from "react-icons/lu";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {TbMoneybag} from "react-icons/tb";
import {MdNumbers} from "react-icons/md";
import {SlOptions} from "react-icons/sl";

type KlinePoint = {
  datetime: string;
  closeEur: number;
  dayOfWeek: number;
  hour: number;
};

type ProfitPoint = {
  datetime: string;
  invested: number;
  value: number;
  returnPct: number;
};

type SimulationState = {
  loading: boolean;
  points: ProfitPoint[];
  error?: string;
};

type WeightedAsset = {
  assetLabel: string;
  allocation: number;
};

type PortfolioAssetLike = {
  asset_label?: unknown;
  assetLabel?: unknown;
  label?: unknown;
  symbol?: unknown;
  name?: unknown;
  allocation?: unknown;
  weight?: unknown;
  percentage?: unknown;
  share?: unknown;
};

class SimulationDataError extends Error {
  failedCoins: string[];

  constructor(failedCoins: string[]) {
    super("Simulation data load failed");
    this.name = "SimulationDataError";
    this.failedCoins = failedCoins;
  }
}

const chartHeight = 260;

const parseDatetime = (datetime: string) => {
  const normalized = datetime.includes("T") ? datetime : datetime.replace(" ", "T");
  return new Date(normalized);
};

const getDateOnly = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.includes("T")) return trimmed.split("T")[0] ?? "";
  if (trimmed.includes(" ")) return trimmed.split(" ")[0] ?? "";
  return trimmed;
};

const getMonthDayFromDatetime = (datetime: string) => {
  const datePart = datetime.split(" ")[0] ?? datetime;
  const pieces = datePart.split("-");
  if (pieces.length < 3) return null;
  const day = Number(pieces[2]);
  return Number.isFinite(day) ? day : null;
};

const toValidNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const normalizeAssetLabel = (value: unknown) => {
  const raw = String(value ?? "").trim().toUpperCase();
  if (!raw) return "";
  if (raw.endsWith("USDT")) return raw.slice(0, -4);
  if (raw.endsWith("EUR")) return raw.slice(0, -3);
  return raw;
};

const toArray = (value: unknown): any[] => (Array.isArray(value) ? value : []);

const parseCoinsField = (value: unknown): PortfolioAssetLike[] => {
  if (Array.isArray(value)) return value as PortfolioAssetLike[];
  if (typeof value !== "string" || !value.trim()) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed as PortfolioAssetLike[];
    if (parsed && typeof parsed === "object") {
      return Object.values(parsed as Record<string, unknown>) as PortfolioAssetLike[];
    }
  } catch {
    return [];
  }

  return [];
};

const extractPortfolioAssets = (payload: any): PortfolioAssetLike[] => {
  const directCandidates = [
    payload?.asset,
    payload?.assets,
    payload?.target_coins,
    payload?.data?.asset,
    payload?.data?.assets,
    payload?.data?.target_coins,
    payload?.portfolio?.asset,
    payload?.portfolio?.assets,
  ];

  for (const candidate of directCandidates) {
    const arr = toArray(candidate);
    if (arr.length > 0) return arr;
  }

  const parsedCandidates = [
    parseCoinsField(payload?.COINS),
    parseCoinsField(payload?.coins),
    parseCoinsField(payload?.data?.COINS),
    parseCoinsField(payload?.data?.coins),
  ];

  for (const candidate of parsedCandidates) {
    if (candidate.length > 0) return candidate;
  }

  return [];
};

const mapPortfolioAssetToWeighted = (asset: PortfolioAssetLike): WeightedAsset => ({
  assetLabel: normalizeAssetLabel(
    asset.asset_label ?? asset.assetLabel ?? asset.label ?? asset.symbol ?? asset.name
  ),
  allocation: toValidNumber(asset.allocation ?? asset.weight ?? asset.percentage ?? asset.share),
});

const normalizeAssetKlines = (rows: any[]): KlinePoint[] => {
  return rows
    .map((row) => {
      const datetime = String(row.datetime ?? "");
      const parsedDate = parseDatetime(datetime);
      const closeEur = toValidNumber(row.close_eur);
      const jsDay = parsedDate.getDay();

      return {
        datetime,
        closeEur,
        dayOfWeek: jsDay === 0 ? 7 : jsDay,
        hour: parsedDate.getHours(),
      };
    })
    .filter((p) => p.datetime && p.closeEur > 0)
    .sort((a, b) => parseDatetime(a.datetime).getTime() - parseDatetime(b.datetime).getTime());
};


const shouldInvestOnPoint = (point: KlinePoint, plan: InvestmentPlanType) => {
  const hour = toValidNumber(plan.investment_hour, -1);
  if (point.hour !== hour) return false;

  if (plan.frequency === "day") return true;

  if (plan.frequency === "week") {
    const day = toValidNumber(plan.day_of_period, -1);
    return point.dayOfWeek === day;
  }

  if (plan.frequency === "month") {
    const monthDay = getMonthDayFromDatetime(point.datetime);
    const day = toValidNumber(plan.day_of_period, -1);
    return monthDay !== null && monthDay === day;
  }

  return false;
};

const simulateDca = (points: KlinePoint[], plan: InvestmentPlanType): ProfitPoint[] => {
  const amount = toValidNumber(plan.investment_amount);
  if (amount <= 0) return [];

  const start = plan.start_date ? new Date(plan.start_date) : null;
  const hasValidStart = !!start && Number.isFinite(start.getTime());

  let totalInvested = 0;
  let totalUnits = 0;
  const profitSeries: ProfitPoint[] = [];

  for (const point of points) {
    const pointDate = parseDatetime(point.datetime);
    if (!Number.isFinite(pointDate.getTime())) continue;
    if (hasValidStart && pointDate < (start as Date)) continue;
    if (!shouldInvestOnPoint(point, plan)) continue;

    totalInvested += amount;
    totalUnits += amount / point.closeEur;

    const value = totalUnits * point.closeEur;
    const returnPct = totalInvested > 0 ? ((value - totalInvested) / totalInvested) * 100 : 0;

    profitSeries.push({
      datetime: point.datetime,
      invested: totalInvested,
      value,
      returnPct,
    });
  }

  return profitSeries;
};

const MiniProfitChart: FC<{ points: ProfitPoint[] }> = ({points}) => {
  const {t} = useTranslation();
  const xValues = points.map((p) => p.datetime);
  const invested = points.map((p) => p.invested);
  const values = points.map((p) => p.value);
  const returns = points.map((p) => p.returnPct);

  const chartMargins = useMemo(() => ({left: 0, right: 0, top: 0, bottom: 0}), []);
  const minPrice = invested.length > 0 ? Math.min(...invested, ...values) * 0.9 : 0;
  const maxPrice = invested.length > 0 ? Math.max(...invested, ...values) * 1.1 : 1;

  if (points.length === 0) {
    return <div className="gray-2-color-text">{t("No simulation data for selected schedule.")}</div>;
  }

  return (
    <div
      className="col-sm service-details__content"
      style={{
        position: "relative",
        border: "0.5px solid #3e3a32",
        borderRadius: "5px",
        padding: "20px",
        backgroundColor: "var(--cream-color)",
      }}
    >
      <div style={{width: "100%", height: `${chartHeight}px`, position: "relative"}}>
        <ChartContainer
          height={chartHeight}
          margin={chartMargins}
          series={[
            {
              id: "value",
              yAxisId: "amount",
              type: "line",
              label: "Portfolio value",
              data: values,
              color: "#4C4033",
            },
            {
              id: "invested",
              yAxisId: "amount",
              type: "line",
              label: "Total invested",
              data: invested,
              color: "#76B4FF",
            },
            {
              id: "returnPct",
              yAxisId: "return",
              type: "line",
              label: "Return %",
              data: returns,
              color: "#B1974E",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: xValues,
              valueFormatter: (value, context) => {
                if (context.location === "tooltip") {
                  const weekIndex = xValues.indexOf(value);
                  return `week ${weekIndex + 1}`;
                }
                return String(value).slice(0, 10);
              },
              tickLabelStyle: {
                fontSize: 10,
                fontFamily: "PT Sans, sans-serif",
                fill: "#444",
              },
            },
          ]}
          yAxis={[
            {
              id: "amount",
              min: minPrice,
              max: maxPrice,
              position: "left",
              tickNumber: 5,
              valueFormatter: (value: number | null) => (value !== null ? `${value.toFixed(0)} EUR` : ""),
              tickLabelStyle: {
                fontSize: 10,
                fontFamily: "PT Sans, sans-serif",
                fill: "#444",
              },
            },
            {
              id: "return",
              position: "right",
              tickNumber: 5,
              valueFormatter: (value: number | null) => (value !== null ? `${value.toFixed(2)} %` : ""),
              tickLabelStyle: {
                fontSize: 10,
                fontFamily: "PT Sans, sans-serif",
                fill: "#444",
              },
            },
          ]}
          sx={{
            backgroundColor: "transparent",
            "& .MuiChartsAxis-line": {stroke: "#888"},
            "& .MuiLineElement-series-value": {strokeWidth: 1.5},
            "& .MuiLineElement-series-invested": {strokeWidth: 1.5},
            "& .MuiLineElement-series-returnPct": {strokeWidth: 1.5},
          }}
        >
          <ChartsGrid vertical/>
          <ChartsTooltip trigger="axis"/>
          <LinePlot/>
          <ChartsXAxis/>
          <ChartsYAxis axisId="amount"/>
          <ChartsYAxis axisId="return"/>
        </ChartContainer>
      </div>
    </div>
  );
};

const normalizeInvestmentPlansPayload = (payload: unknown): InvestmentPlanTypeDetails[] => {
  if (Array.isArray(payload)) return payload as InvestmentPlanTypeDetails[];

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const nestedCandidates = [record.data, record.plans, record.items];

    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) {
        return candidate as InvestmentPlanTypeDetails[];
      }
    }

    const objectValues = Object.values(record);
    if (objectValues.length > 0 && objectValues.every((value) => value && typeof value === "object" && !Array.isArray(value))) {
      return objectValues as InvestmentPlanTypeDetails[];
    }
  }

  return [];
};

export const MyInvestmentPlans: FC = () => {
  const {t} = useTranslation();
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlanTypeDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [simulations, setSimulations] = useState<Record<number, SimulationState>>({});
  const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);
  const [openActionsMenuPlanKey, setOpenActionsMenuPlanKey] = useState<number | null>(null);
  const [removingPlanIds, setRemovingPlanIds] = useState<number[]>([]);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const previousRectsRef = useRef<Map<number, DOMRect>>(new Map());

  const fetchInvestmentPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getInvestmentPlansDetails();
      setInvestmentPlans(normalizeInvestmentPlansPayload(response.data));
    } catch {
      setInvestmentPlans([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvestmentPlans();
  }, [fetchInvestmentPlans]);

  const getPlanKey = (plan: InvestmentPlanTypeDetails, index: number) => plan.id ?? -(index + 1);

  const handleDeleteInvestmentPlan = useCallback(async (id: number) => {
    setRemovingPlanIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

    // Keep this delay aligned with card shrink animation.
    await new Promise((resolve) => setTimeout(resolve, 180));

    try {
      await deleteInvestmentPlan(id);
      setInvestmentPlans((prev) => prev.filter((plan) => plan.id !== id));
      setSimulations((prev) => {
        const next = {...prev};
        delete next[id];
        return next;
      });
      setExpandedPlanId((prev) => (prev === id ? null : prev));
    } catch {
      await fetchInvestmentPlans();
    } finally {
      setRemovingPlanIds((prev) => prev.filter((planId) => planId !== id));
    }
  }, [fetchInvestmentPlans]);

  const buildWeightedSeries = useCallback(async (assets: WeightedAsset[], startDate: string | null) => {
    const validAssets = assets.filter((a) => !!a.assetLabel && a.allocation > 0);
    if (validAssets.length === 0) return [];

    const totalAllocation = validAssets.reduce((sum, asset) => sum + asset.allocation, 0);
    if (totalAllocation <= 0) return [];

    const normalizedWeights = new Map(validAssets.map((asset) => [asset.assetLabel, asset.allocation / totalAllocation]));
    const start = startDate ?? undefined;

    const klinesByAsset = await Promise.all(
      validAssets.map(async (asset) => {
        try {
          const response = await getAssetSpotKlines(asset.assetLabel, undefined, start);
          const points = normalizeAssetKlines(Array.isArray(response.data) ? response.data : []);

          if (points.length === 0) {
            return {label: asset.assetLabel, failed: true as const};
          }

          const map = new Map(points.map((p) => [p.datetime, p.closeEur]));
          return {label: asset.assetLabel, map, points, failed: false as const};
        } catch {
          return {label: asset.assetLabel, failed: true as const};
        }
      })
    );

    const failedCoins = klinesByAsset.filter((asset) => asset.failed).map((asset) => asset.label);
    if (failedCoins.length > 0) {
      throw new SimulationDataError(failedCoins);
    }

    const successfulKlines = klinesByAsset.filter((asset) => !asset.failed);

    if (successfulKlines.length === 0 || successfulKlines[0].points.length === 0) return [];

    const baseTimeline = successfulKlines[0].points;
    const portfolioSeries: KlinePoint[] = [];

    for (const basePoint of baseTimeline) {
      let weightedClose = 0;
      let hasMissingValue = false;

      for (const assetKlines of successfulKlines) {
        const price = assetKlines.map.get(basePoint.datetime);
        if (!Number.isFinite(price)) {
          hasMissingValue = true;
          break;
        }
        const weight = normalizedWeights.get(assetKlines.label) ?? 0;
        weightedClose += (price as number) * weight;
      }

      if (!hasMissingValue && weightedClose > 0) {
        portfolioSeries.push({
          datetime: basePoint.datetime,
          closeEur: weightedClose,
          dayOfWeek: basePoint.dayOfWeek,
          hour: basePoint.hour,
        });
      }
    }

    return portfolioSeries;
  }, []);

  const buildPlanSeries = useCallback(async (plan: InvestmentPlanTypeDetails) => {
    const weightedAssets = getWeightedAssetsFromPlan(plan);

    if (weightedAssets.length === 0) return [];

    return await buildWeightedSeries(weightedAssets, plan.start_date);
  }, [buildWeightedSeries]);

  const loadSimulation = useCallback(async (plan: InvestmentPlanTypeDetails, planKey: number) => {
    setSimulations((prev) => ({
      ...prev,
      [planKey]: {loading: true, points: []},
    }));

    try {
      const series = await buildPlanSeries(plan);
      const points = simulateDca(series, plan);

      setSimulations((prev) => ({
        ...prev,
        [planKey]: {loading: false, points},
      }));
    } catch (error) {
      const failedCoins = error instanceof SimulationDataError ? error.failedCoins : [];
      const errorMessage = failedCoins.length > 0
        ? `Unalble to load simulation data. No longer traded coins: ${failedCoins.join(", ")}`
        : t("Unable to load simulation data");

      setSimulations((prev) => ({
        ...prev,
        [planKey]: {loading: false, points: [], error: errorMessage},
      }));
    }
  }, [buildPlanSeries, t]);

  useEffect(() => {
    investmentPlans.forEach((plan, index) => {
      const planKey = getPlanKey(plan, index);
      if (!simulations[planKey]) {
        loadSimulation(plan, planKey);
      }
    });
  }, [investmentPlans, loadSimulation, simulations]);

  const getFrequencyLabel = (frequency: string) => {
    if (frequency === "day") return t("Daily");
    if (frequency === "week") return t("Weekly");
    if (frequency === "month") return t("Monthly");
    return frequency;
  };

  const getWeightedAssetsFromPlan = (plan: InvestmentPlanTypeDetails): WeightedAsset[] => {
    const fromPayload = extractPortfolioAssets(plan)
      .map(mapPortfolioAssetToWeighted)
      .filter((asset) => !!asset.assetLabel && asset.allocation > 0);

    if (fromPayload.length > 0) {
      return fromPayload;
    }

    const targetCoins = Array.isArray(plan.target_coins) ? plan.target_coins : [];
    if (targetCoins.length === 0) return [];

    // Fallback to equal weighting when backend does not provide allocation for target coins.
    const equalAllocation = 1 / targetCoins.length;
    return targetCoins
      .map((coin) => ({
        assetLabel: normalizeAssetLabel(coin.asset_label),
        allocation: equalAllocation,
      }))
      .filter((asset) => !!asset.assetLabel && asset.allocation > 0);
  };

  const getTotalProfit = (points: ProfitPoint[]) => {
    if (points.length === 0) return null;
    const last = points[points.length - 1];
    return {
      amount: last.value - last.invested,
      returnPct: last.returnPct,
      invested: last.invested,
      value: last.value,
    };
  };

  return (
    <>
      <TitleHeader title={t("My Investment Plans")}/>
      <div className="container mt-1">

        <p>{t("Investment plan defines your trading personality. Whether you are a cautious newbie or aggressive professional.")}</p>

        <Button className="d-inline-flex align-items-center gap-2 mb-5" type="link"
                to={routes.profile.newInvestmentPlanIntro}>
          <GoPlus size={25} style={{margin: "2px"}}/>
          {t("New investment plan")}
        </Button>

        <div>
          {isLoading ? (
            <div className="text-center mt-5">
              <p>{t("Loading...")}</p>
            </div>
          ) : investmentPlans.length === 0 ? (
            <div className="text-center mt-5">
              <h4>{t("You have no investment plans created yet.")}</h4>
              <p>{t("Click the button above to create your first plan.")}</p>
            </div>
          ) : (
            <div className="row g-4">
              {investmentPlans.map((plan, index) => {
                const planKey = getPlanKey(plan, index);
                const canDelete = Number.isFinite(plan.id);
                const planId = canDelete ? Number(plan.id) : null;
                const isRemoving = planId !== null && removingPlanIds.includes(planId);
                const simulation = simulations[planKey];
                const simulatedStartDate = simulation?.points?.[0]?.datetime
                  ? getDateOnly(simulation.points[0].datetime)
                  : "";
                const displayStartDate = plan.start_date || simulatedStartDate || "-";
                const sourceName = plan.target_name || String(plan.user_portfolio_id ?? plan.binance_asset_id ?? "-");
                const totalProfit = getTotalProfit(simulation?.points ?? []);
                const trend = totalProfit ? {
                  isPositive: totalProfit.amount >= 0,
                  containerClass: `color-container--${totalProfit.amount >= 0 ? 'green' : 'red'}`,
                  textClass: totalProfit.amount >= 0 ? "green-on-primary-color-text" : "red-on-primary-color-text",
                  iconColor: totalProfit.amount >= 0 ? 'var(--green-on-primary-color)' : 'var(--red-on-primary-color)',
                  Icon: totalProfit.amount >= 0 ? LuTrendingUp : LuTrendingDown,
                } : null;

                const planDetails = [
                  {
                    label: t("Asset name"),
                    value: plan.portfolio_name || plan.index_name || sourceName || "-",
                    Icon: IoWalletOutline,
                  },
                  {
                    label: t("Investment amount"),
                    value: `${formatNumber(Number(plan.investment_amount))} ${plan.currency}`,
                    Icon: FiDollarSign,
                  },
                  {
                    label: t("Total invested"),
                    value: totalProfit?.invested ? `${formatNumber(Math.round(totalProfit.invested * 100) / 100)} ${plan.currency}` : "-",
                    Icon: TbMoneybag,
                  },
                  {
                    label: t("Total investments"),
                    value: simulation?.points.length ?? 0,
                    Icon: MdNumbers,
                  },
                  {
                    label: t("Start date"),
                    value: displayStartDate,
                    Icon: LuClock,
                  },
                ];

                const trafficLights = [
                  {
                    label: t("Buy Traffic Light"),
                    name: plan.buy_traffic_light_name,
                    color: 'var(--green-on-primary-color)',
                  },
                  {
                    label: t("Sell Traffic Light"),
                    name: plan.sell_traffic_light_name,
                    color: 'var(--red-on-primary-color)',
                  }
                ];

                const scheduleDetails = [
                  {
                    label: t("Frequency"),
                    value: getFrequencyLabel(plan.frequency)
                  },
                  {
                    label: t("Day"),
                    value: plan.day_of_period ?
                      (plan.frequency === 'week' ?
                        [t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday'), t('Friday'), t('Saturday'), t('Sunday')][plan.day_of_period - 1]
                        : plan.day_of_period)
                      : "-"
                  },
                  {
                    label: t("Hour"),
                    value: plan.investment_hour !== null ? `${String(plan.investment_hour).padStart(2, '0')}:00` : "-"
                  }
                ];

                return (
                  // Three dots menu
                  <div
                    key={planKey}
                    className={`col-12 my-portfolio-grid-item ${isRemoving ? "my-portfolio-grid-item--removing" : ""}`}
                    ref={(node) => {
                      if (!node) {
                        itemRefs.current.delete(planKey);
                        return;
                      }
                      itemRefs.current.set(planKey, node);
                    }}
                  >
                    <CardContainer
                      className={`my-portfolio-card my-investment-plan-card ${isRemoving ? "my-portfolio-card--removing" : ""}`}
                      color="var(--tertiary-color)"
                      animate={false}
                      style={{padding: "25px", margin: "5px 0"}}
                    >
                      <div className="mb-4">
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '20px'
                        }}>

                          <div className={"d-flex align-items-center gap-3 flex-grow-1"}>
                            <div className={"name"} style={{marginBottom: 0}}>{plan.name}</div>
                              <div className={`color-container--gold gold-color-text`}
                                   style={{padding: '4px 12px', fontSize: '0.85rem', whiteSpace: 'nowrap'}}>
                                {plan.is_custom_portfolio ? (t("Custom Portfolio")) : (t("Binance Portfolio"))}
                              </div>

                          </div>

                          <div className="d-flex align-items-center gap-3">

                            {/* Change value */}
                            <div style={{textAlign: 'right'}}>
                              <div style={{
                                fontSize: "1.35rem",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '8px',
                                flexDirection: 'row'
                              }}>
                                {totalProfit && (
                                  <CustomTooltip
                                    title={`${t("Holdings value")}: ${totalProfit.value.toFixed(2)} ${plan.currency}`}
                                    placement={"top"}
                                  >
                                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                      <strong style={{fontSize: '1.7rem'}}>
                                        {`${formatNumber(Math.round(totalProfit.value * 100) / 100)} ${plan.currency}`}
                                      </strong>
                                    </div>
                                  </CustomTooltip>
                                )}
                                {trend && (
                                  <CustomTooltip
                                    title={`${totalProfit ? (totalProfit?.amount >= 0 ? t('Profit') + ': ' : t('Loss') + ': ') : ""}${totalProfit?.amount.toFixed(2)} ${plan.currency}`}
                                    placement={"top"}
                                  >
                                    <div className={`${trend.containerClass} d-flex align-items-center gap-3`}
                                         style={{padding: '4px 12px'}}>
                                      <trend.Icon size={20} style={{color: trend.iconColor}}/>
                                      <span className={trend.textClass}>
                                        <strong>
                                            {`${trend.isPositive ? '+' : ''}${formatNumber(Math.round((totalProfit?.amount ?? 0) * 100) / 100)} ${plan.currency}`}
                                        </strong>
                                      </span>
                                    </div>
                                  </CustomTooltip>
                                )}
                              </div>
                            </div>

                            <div
                              className="my-portfolio-card__actions"
                              style={{
                                position: 'relative',
                                top: 'auto',
                                right: 'auto'
                              }} // Prebíjame pôvodné absolute poziciovanie
                              onClick={(e) => e.stopPropagation()}
                              onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) {
                                  setOpenActionsMenuPlanKey(null);
                                }
                              }}
                            >
                              <button
                                type="button"
                                className="my-portfolio-card__actions-trigger"
                                aria-label={t('Options')}
                                onClick={() => setOpenActionsMenuPlanKey((prev) => (prev === planKey ? null : planKey))}
                                style={{background: 'transparent', border: 'none', padding: '5px'}}
                              >
                                <SlOptions color={'var(--gray-2-color)'} size={15}/>
                              </button>

                              {openActionsMenuPlanKey === planKey && (
                                <div className="my-portfolio-card__actions-menu" style={{right: 0, top: '100%'}}>
                                  <button
                                    type="button"
                                    className="my-portfolio-card__actions-item my-portfolio-card__actions-item--danger"
                                    disabled={!canDelete || isRemoving}
                                    onClick={() => {
                                      if (!planId || isRemoving) return;
                                      setOpenActionsMenuPlanKey(null);
                                      void handleDeleteInvestmentPlan(planId);
                                    }}
                                  >
                                    <LuTrash/>
                                    <span>{t('Delete')}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info Cards Row */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                      }} className={"mb-4"}>
                        {planDetails.map((item, index) => (


                          <div key={index} className={"d-flex align-items-center gap-3"}>
                            <div className="color-container--gold icon-container">
                              <item.Icon size={20}/>
                            </div>
                            <div>
                              <div className="gray-2-color-text" style={{fontSize: '0.9rem'}}>
                                {item.label}
                              </div>
                              <div style={{fontSize: "1.1rem", fontWeight: 500}}>
                                {item.value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Section with Show more/less button */}
                      <div>
                        {expandedPlanId === planKey && (
                          <>
                            <hr/>
                            <div className={"mt-4 mb-4"}>
                              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>

                                {/* Schedule Details Section */}
                                <div>
                                  <h5>{t("Schedule Details")}</h5>
                                  <div className={"d-flex flex-column gap-3"} style={{maxWidth: "200px"}}>
                                    {scheduleDetails.map((item, index) => (
                                      <div key={index} className={"d-flex justify-content-between align-items-center"}>
                                        <div className="gray-2-color-text" style={{fontSize: '0.9rem'}}>
                                          {item.label}
                                        </div>
                                        <div style={{fontSize: '1rem', fontWeight: 500}}>
                                          {item.value}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Traffic Lights Section - TERAZ IDENTICKÁ ŠTRUKTÚRA */}
                                <div>
                                  <h5 className="mb-3">{t("Traffic Lights")}</h5>
                                  <div className={"d-flex flex-column gap-3"} style={{maxWidth: "300px"}}>
                                    {trafficLights.map((signal, sIndex) => (
                                      <div key={sIndex} className={"d-flex justify-content-between align-items-center"}>
                                        <div className="gray-2-color-text" style={{fontSize: '0.9rem'}}>
                                          {signal.label}
                                        </div>

                                        <div className={"d-flex align-items-center gap-3"}
                                             style={{fontSize: '1rem', fontWeight: 500}}>
                                          {signal.name ? (
                                            <>
                                              <span style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: signal.color,
                                                display: 'inline-block'
                                              }}></span>
                                              {signal.name}
                                            </>
                                          ) : "-"}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              </div>
                            </div>
                          </>
                        )}

                        <button
                          onClick={() => setExpandedPlanId(expandedPlanId === planKey ? null : planKey)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid rgba(200, 180, 160, 0.3)',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            color: 'var(--secondary-color)',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginBottom: '20px',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--secondary-color)';
                            e.currentTarget.style.backgroundColor = 'rgba(177, 151, 78, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(200, 180, 160, 0.3)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {expandedPlanId === planKey ? t("Show less") : t("Show more")} {expandedPlanId === planKey ?
                          <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </button>
                      </div>

                      {/* Chart */}
                      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '20px'}}>
                        {simulation?.loading && (
                          <GraphDataSkeleton
                            baseColor={"var(--cream-color)"}
                            highlightColor={"var(--secondary-color)"}
                            style={{width: "100%", height: "220px"}}
                          />
                        )}
                        {simulation?.error && <div className="gray-2-color-text">{simulation.error}</div>}
                        {!simulation?.loading && !simulation?.error && (
                          <MiniProfitChart points={simulation?.points ?? []}/>
                        )}
                      </div>
                    </CardContainer>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

