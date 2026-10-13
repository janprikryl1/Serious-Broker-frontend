import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {deleteInvestmentPlan, getInvestmentPlansDetails} from "../../utils/api/investmentPlanService.ts";
import {InvestmentPlanType, InvestmentPlanTypeDetails} from "../../utils/types/investmentPlan/InvestmentPlanType.ts";
import {CardContainer} from "../../components/reusable/CardContainer.tsx";
import {Button} from "../../components/reusable/Button.tsx";
import {CustomTooltip} from "../../components/reusable/CustomTooltip.tsx";
import {routes} from "../../utils/constants";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {getAssetSpotKlines} from "../../utils/api/GraphsService.ts";
import {GraphDataSkeleton} from "../../components/graphs/asset/GraphDataSkeleton.tsx";
import {GoPlus} from "react-icons/go";
import {IoOpenOutline, IoWalletOutline} from "react-icons/io5";
import {FiDollarSign, FiEdit3} from "react-icons/fi";
import {LuClock, LuTrendingUp, LuTrendingDown, LuTrash, LuPencil} from "react-icons/lu";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {TbMoneybag} from "react-icons/tb";
import {MdNumbers} from "react-icons/md";
import {SlOptions} from "react-icons/sl";
import {Link} from "react-router-dom";
import {SpinnerLoader} from "../../components/reusable/SpinnerLoader.tsx";
import {ColorType, createChart, IChartApi} from "lightweight-charts";
import {transparentChartTheme} from "../../utils/options/chartThemes.ts";
import {CHART_COLORS} from "../../utils/constants/customColors.ts";
import {InfoIconTooltip} from "../../components/reusable/InfoIconTooltip.tsx";
import {useMediaQuery} from "@mui/material";

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
  investmentCount?: number;
  error?: string;
};

type WeightedAsset = {
  assetLabel: string;
  allocation: number;
};

type AssetSeries = {
  label: string;
  prices: Map<string, number>;
  allocation: number;
};

class SimulationDataError extends Error {
  failedCoins: string[];

  constructor(failedCoins: string[]) {
    super("Simulation data load failed");
    this.name = "SimulationDataError";
    this.failedCoins = failedCoins;
  }
}

const chartHeight = 350;

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

const ALLOCATION_TOLERANCE = 0.0001;

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

const normalizeAssetKlines = (rows: any[]): KlinePoint[] => {
  const points = rows
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

  const seen = new Set<string>();
  return points.filter((p) => {
    if (seen.has(p.datetime)) return false;
    seen.add(p.datetime);
    return true;
  });
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

const simulatePortfolioDca = (
  timeline: string[],
  series: { label: string; prices: Map<string, number>; allocation: number }[],
  plan: InvestmentPlanType
): { points: ProfitPoint[]; investmentCount: number } => {

  const amount = toValidNumber(plan.investment_amount);
  if (amount <= 0) return {points: [], investmentCount: 0};

  const units: Record<string, number> = {};
  series.forEach(s => units[s.label] = 0);

  // Parse start_date if provided
  const start = plan.start_date ? new Date(plan.start_date) : null;
  const hasValidStart = !!start && Number.isFinite(start.getTime());

  // Cache parsed datetime to avoid repeated Date parsing
  const timelineParsed = timeline.map(dt => {
    const d = parseDatetime(dt);
    return {
      datetime: dt,
      date: d,
      dayOfWeek: d.getDay() === 0 ? 7 : d.getDay(),
      hour: d.getHours()
    };
  }).filter(p => Number.isFinite(p.date.getTime()));

  let totalInvested = 0;
  let investmentCount = 0;
  const result: ProfitPoint[] = [];

  for (const point of timelineParsed) {
    // Skip timeline points before start_date
    if (hasValidStart && point.date < start) continue;

    const {datetime, dayOfWeek, hour} = point;

    const fakePoint: KlinePoint = {
      datetime,
      closeEur: 0,
      dayOfWeek,
      hour
    };

    if (shouldInvestOnPoint(fakePoint, plan)) {
      let investedThisRound = 0;

      for (const asset of series) {
        const price = asset.prices.get(datetime);

        if (!price || price <= 0) continue;
        // Amount of this coin
        const investPart = amount * asset.allocation;
        // Buy the amount for the price
        units[asset.label] += investPart / price;
        // Add to sum
        investedThisRound += investPart;
      }

      if (investedThisRound > 0) {
        investmentCount++;
      }
      totalInvested += investedThisRound;
    }

    let portfolioValue = 0;

    for (const asset of series) {
      const price = asset.prices.get(datetime);
      if (!price) continue;

      portfolioValue += units[asset.label] * price;
    }

    if (totalInvested > 0) {
      result.push({
        datetime,
        invested: totalInvested,
        value: portfolioValue,
        returnPct: ((portfolioValue - totalInvested) / totalInvested) * 100
      });
    }
  }

  return {points: result, investmentCount};
};

const MiniProfitChart: FC<{ points: ProfitPoint[] }> = ({ points }) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage || i18n.language || undefined;
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Legend and description
  const legendItems = [
    {
      label: t("Portfolio value"),
      color: CHART_COLORS.gray,
      axis: "EUR",
      description: t("Current total value of assets in the portfolio"),
    },
    {
      label: t("Total invested"),
      color: CHART_COLORS.blue,
      axis: "EUR",
      description: t("Cumulative amount of money invested over time"),
    },
    {
      label: t("Return"),
      color: CHART_COLORS.gold,
      axis: "%",
      description: t("Percentage return of investment (Right axis)"),
    },
  ];

  // Filter out invalid points and sort by time
  const validPoints = useMemo(() => {
    const sorted = (points ?? [])
      .filter(
        (p) =>
          p &&
          p.datetime &&
          Number.isFinite(p.invested) &&
          Number.isFinite(p.value) &&
          Number.isFinite(p.returnPct)
      )
      .map((p) => ({
        ...p,
        time: Math.floor(parseDatetime(p.datetime).getTime() / 1000),
      }))
      .sort((a, b) => a.time - b.time);

    // Remove duplicates
    const uniquePoints: typeof sorted = [];
    let lastTime = -Infinity;

    for (const pt of sorted) {
      if (pt.time > lastTime) {
        uniquePoints.push(pt);
        lastTime = pt.time;
      } else if (uniquePoints.length > 0) {
        // Ak má rovnaký timestamp, prepíšeme ho najnovšou hodnotou
        uniquePoints[uniquePoints.length - 1] = pt;
      }
    }

    return uniquePoints;
  }, [points]);

  useEffect(() => {
    if (!chartContainerRef.current || validPoints.length < 2) return;

    const container = chartContainerRef.current;
    container.innerHTML = "";

    const chart: IChartApi = createChart(container, {
      ...transparentChartTheme,
      width: container.clientWidth,
      height: chartHeight,
    });

    const valueSeries = chart.addLineSeries({
      color: CHART_COLORS.gray,
      lineWidth: 2,
      priceScaleId: "left",
      title: t("Value"),
      priceFormat: {
        type: "custom",
        formatter: (val: number) =>
          `${Math.round(val).toLocaleString(currentLocale)} EUR`,
      },
    });

    const investedSeries = chart.addLineSeries({
      color: CHART_COLORS.blue,
      lineWidth: 2,
      priceScaleId: "left",
      title: t("Invested"),
      priceFormat: {
        type: "custom",
        formatter: (val: number) =>
          `${Math.round(val).toLocaleString(currentLocale)} EUR`,
      },
    });

    const returnSeries = chart.addLineSeries({
      color: CHART_COLORS.gold,
      lineWidth: 2,
      priceScaleId: "right",
      title: t("Return"),
      priceFormat: {
        type: "custom",
        formatter: (val: number) =>
          `${val.toLocaleString(currentLocale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })} %`,
      },
    });

    const valueData: any[] = [];
    const investedData: any[] = [];
    const returnData: any[] = [];

    validPoints.forEach((p) => {
      valueData.push({ time: p.time, value: p.value });
      investedData.push({ time: p.time, value: p.invested });
      returnData.push({ time: p.time, value: p.returnPct });
    });

    valueSeries.setData(valueData);
    investedSeries.setData(investedData);
    returnSeries.setData(returnData);

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
  }, [validPoints, t]);

  if (validPoints.length < 2) {
    return (
      <div className="gray-2-color-text py-4 text-center">
        {t("No simulation data for selected schedule.")}
      </div>
    );
  }

  return (
    <div
      className="col-sm tw-bg-stone-500 tw-bg-opacity-25 tw-rounded-lg tw-my-6 tw-py-3"
    >
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: `${chartHeight}px`, position: "relative" }}
      />
      <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-4 tw-mt-4 tw-pt-3 tw-border-t tw-border-stone-500/25">
        {legendItems.map((item, idx) => (
          <CustomTooltip key={idx} title={item.description} placement="top">
            <div className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-text-sm tw-select-none hover:tw-opacity-80 tw-transition-opacity">
              <span
                className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="tw-font-medium tw-text-stone-200">
                {item.label}
              </span>
              <span className="tw-text-xs tw-text-stone-400">
                ({item.axis})
              </span>
            </div>
          </CustomTooltip>
        ))}
      </div>
    </div>
  );
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

  const fetchInvestmentPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getInvestmentPlansDetails();
      setInvestmentPlans(response.data);
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

  const buildAssetSeries = async (
    assets: WeightedAsset[],
    startDate: string | null
  ): Promise<{ timeline: string[]; series: AssetSeries[] }> => {

    const validAssets = assets.filter(a => a.assetLabel && a.allocation > 0);
    if (validAssets.length === 0) {
      throw new Error("No allocation provided");
    }

    const totalAllocation = validAssets.reduce((sum, asset) => sum + asset.allocation, 0);
    if (Math.abs(totalAllocation - 1) > ALLOCATION_TOLERANCE) {
      throw new Error("Invalid allocation sum");
    }

    const klinesByAsset = await Promise.all(
      validAssets.map(async (asset) => {
        try {
          const res = await getAssetSpotKlines(asset.assetLabel, undefined, startDate ?? undefined);
          const points = normalizeAssetKlines(res.data ?? []);

          if (points.length === 0) {
            return {label: asset.assetLabel, failed: true, allocation: asset.allocation, prices: new Map(), timeline: []};
          }

          return {
            label: asset.assetLabel,
            failed: false,
            allocation: asset.allocation,
            prices: new Map(points.map(p => [p.datetime, p.closeEur])),
            timeline: points.map(p => p.datetime)
          };
        } catch {
          return {label: asset.assetLabel, failed: true, allocation: asset.allocation, prices: new Map(), timeline: []};
        }
      })
    );

    const failedCoins = klinesByAsset.filter(k => k.failed).map(k => k.label);
    if (failedCoins.length > 0) {
      throw new SimulationDataError(failedCoins);
    }

    const successfulKlines = klinesByAsset.filter(k => !k.failed);
    if (successfulKlines.length === 0) {
      throw new Error("No klines data available");
    }

    const timeline = successfulKlines[0]?.timeline ?? [];

    return {
      timeline,
      series: successfulKlines.map(r => ({
        label: r.label,
        prices: r.prices,
        allocation: r.allocation
      }))
    };
  };

  const loadSimulation = useCallback(async (plan: InvestmentPlanTypeDetails, planKey: number) => {
    setSimulations((prev) => ({
      ...prev,
      [planKey]: {loading: true, points: [], investmentCount: 0},
    }));

    try {
      const weightedAssets = getWeightedAssetsFromPlan(plan);
      const { timeline, series } = await buildAssetSeries(weightedAssets, plan.start_date);
      const {points, investmentCount} = simulatePortfolioDca(timeline, series, plan);

      setSimulations((prev) => ({
        ...prev,
        [planKey]: {loading: false, points, investmentCount},
      }));
    } catch (error) {
      const failedCoins = error instanceof SimulationDataError ? error.failedCoins : [];
      const errorMessage = failedCoins.length > 0
        ? `Unable to load simulation data. No longer traded coins: ${failedCoins.join(", ")}`
        : t("Unable to load simulation data");

      setSimulations((prev) => ({
        ...prev,
        [planKey]: {loading: false, points: [], investmentCount: 0, error: errorMessage},
      }));
    }
  }, [buildAssetSeries, t]);

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
    const targetCoins = Array.isArray(plan.target_coins) ? plan.target_coins : [];
    if (targetCoins.length === 0) return [];

    return targetCoins
      .map((coin) => ({
        assetLabel: normalizeAssetLabel(coin.asset_label),
        allocation: toValidNumber(coin.allocation),
      }))
      .filter((asset) => !!asset.assetLabel);
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

        <p className="tw-text-sm tw-leading-relaxed sm:tw-text-base">
          {t("Investment plan defines your trading personality. Whether you are a cautious newbie or aggressive professional.")}
        </p>

        <Button className="d-inline-flex align-items-center gap-2 mb-5 tw-p-2 tw-text-sm sm:tw-text-base" type="link"
                to={routes.profile.newInvestmentPlanIntro}>
          <GoPlus size={25} />
          <span className="tw-mr-1">{t("New investment plan")}</span>
        </Button>

        <div>
          {isLoading ? (
            <SpinnerLoader />
          ) : investmentPlans.length === 0 ? (
            <div className="text-center mt-5">
              <h4 className="tw-text-lg sm:tw-text-xl">{t("You have no investment plans created yet.")}</h4>
              <p className="tw-text-sm sm:tw-text-base">{t("Click the button above to create your first plan.")}</p>
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
                const assetName = plan.portfolio_name || plan.index_name || sourceName || "-";
                const assetDetailPath = plan.target_type === "index"
                  ? (assetName !== "-" ? `/asset_graph/${encodeURIComponent(assetName)}` : null)
                  : (plan.user_portfolio_id ? `/profile/my_portfolio_details/${plan.user_portfolio_id}` : null);
                const totalProfit = getTotalProfit(simulation?.points ?? []);
                const trend = totalProfit ? {
                  isPositive: totalProfit.amount >= 0,
                  containerClass: `color-container--${totalProfit.amount >= 0 ? 'green' : 'red'}`,
                  textClass: totalProfit.amount >= 0 ? "green-color-text" : "red-color-text",
                  iconColor: totalProfit.amount >= 0 ? 'var(--green-color)' : 'var(--red-color)',
                  Icon: totalProfit.amount >= 0 ? LuTrendingUp : LuTrendingDown,
                } : null;

                const planDetails = [
                  {
                    label: t("Asset name"),
                    value: assetDetailPath ? (
                      <Link to={assetDetailPath} className="text-decoration-underline gap-1">
                        {assetName}
                        <IoOpenOutline size={14} aria-hidden="true" style={{marginLeft: "5px"}}/>
                      </Link>
                    ) : assetName,
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
                    value: simulation?.investmentCount ?? 0,
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
                    color: 'var(--green-color)',
                  },
                  {
                    label: t("Sell Traffic Light"),
                    name: plan.sell_traffic_light_name,
                    color: 'var(--red-color)',
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
                    >
                      {/* Three dots menu */}
                      <div
                        className="my-portfolio-card__actions plan-card__actions"
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
                            <Link
                              to={planId ? routes.profile.editInvestmentPlan.replace(":id", String(planId)) : "#"}
                              className="my-portfolio-card__actions-item"
                              onClick={() => setOpenActionsMenuPlanKey(null)}
                            >
                              <FiEdit3 />
                              <span>{t('Edit')}</span>
                            </Link>
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

                      <div className="mb-4">
                        <div className="plan-card__header">
                          <div className="plan-card__title-group">
                            <div className="name tw-mb-0 tw-text-lg sm:tw-text-xl">{plan.name}</div>
                              <div className={`color-container--gold gold-color-text tw-text-xs`}>
                                {plan.is_custom_portfolio ? (t("Custom Portfolio")) : (t("Binance Portfolio"))}
                              </div>
                          </div>

                            {/* Change value */}
                            <div className="plan-card__profit">
                              <div  className="plan-card__profit-row">
                                {totalProfit && (
                                  <CustomTooltip
                                    title={`${t("Holdings value")}: ${totalProfit.value.toFixed(2)} ${plan.currency}`}
                                    placement={"top"}
                                  >
                                    <div className="tw-flex tw-cursor-pointer tw-items-center tw-gap-2">
                                      <div className="tw-text-lg md:tw-text-2xl tw-font-semibold">
                                        {`${formatNumber(Math.round(totalProfit.value * 100) / 100)} ${plan.currency}`}
                                      </div>
                                    </div>
                                  </CustomTooltip>
                                )}
                                {trend && (
                                  <CustomTooltip
                                    title={`${totalProfit ? (totalProfit?.amount >= 0 ? t('Profit') + ': ' : t('Loss') + ': ') : ""}${totalProfit?.amount.toFixed(2)} ${plan.currency}`}
                                    placement={"top"}
                                  >
                                    <div className={`${trend.containerClass} d-flex align-items-center gap-2`}>
                                      <trend.Icon size={16} style={{color: trend.iconColor}}/>
                                      <span className={trend.textClass}>
                                        <div className="tw-text-base md:tw-text-lg">
                                            {`${trend.isPositive ? '+' : ''}${formatNumber(Math.round((totalProfit?.amount ?? 0) * 100) / 100)} ${plan.currency}`}
                                        </div>
                                      </span>
                                    </div>
                                  </CustomTooltip>
                                )}
                              </div>
                            </div>
                        </div>
                      </div>

                      {/* Info Cards Row */}
                      <div className={" plan-card__info-grid mb-4"}>
                        {planDetails.map((item, index) => (

                          <div key={index} className={"d-flex align-items-center gap-3"}>
                            <div className="color-container--gold icon-container">
                              <item.Icon size={20}/>
                            </div>
                            <div>
                              <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">
                                {item.label}
                              </div>
                              <div className="tw-text-sm tw-font-medium sm:tw-text-base lg:tw-text-[1.05rem]">
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
                              <div className="plan-card__details-grid">

                                {/* Schedule Details Section */}
                                <div className="plan-card__detail-section">
                                  <h5 className="tw-text-base sm:tw-text-lg">{t("Schedule Details")}</h5>
                                  <div className="plan-card__detail-list tw-max-w-[200px]">
                                    {scheduleDetails.map((item, index) => (
                                      <div key={index} className="plan-card__detail-row">
                                        <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">
                                          {item.label}
                                        </div>
                                        <div className="plan-card__detail-value">
                                          {item.value}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Traffic Lights Section */}
                                <div className="plan-card__detail-section">
                                  <h5 className="mb-3 tw-text-base sm:tw-text-lg">{t("Traffic Lights")}</h5>
                                  <div className="plan-card__detail-list plan-card__detail-list tw-max-w-sm ">
                                    {trafficLights.map((signal, sIndex) => (
                                      <div key={sIndex} className="plan-card__detail-row">
                                        <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">
                                          {signal.label}
                                        </div>

                                        <div className="plan-card__detail-value plan-card__detail-value--traffic">
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

                              {/* Chart Section */}
                              <div className="plan-card__chart">
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
                            </div>
                          </>
                        )}

                        <button
                          onClick={() => setExpandedPlanId(expandedPlanId === planKey ? null : planKey)}
                          className="plan-card__toggle-btn"
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
