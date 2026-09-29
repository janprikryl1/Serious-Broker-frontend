import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaPlot, ChartsTooltip, LinePlot, ResponsiveChartContainer } from '@mui/x-charts';
import { GraphDataSkeleton } from '../../graphs/asset/GraphDataSkeleton.tsx';
import { useTranslation } from 'react-i18next';
import { FiEdit3 } from 'react-icons/fi';
import { LuTrash } from 'react-icons/lu';
import { SlOptions } from 'react-icons/sl';
import { LuTrendingDown, LuTrendingUp } from 'react-icons/lu';
import { OutlineContainer } from '../../reusable/OutlineContainer.tsx';
import { MyPortfolioType } from "../../../utils/types/myPortfolio/MyPortfolioType.ts";
import { PortfolioGraphData } from "../../../utils/types/asset/MyPortfolioType.ts";
import { Assets } from "../../../utils/types/asset/AssetDetailType.ts";
import { CHART_COLORS } from "../../../utils/constants/customColors.ts";

type Props = {
  data: MyPortfolioType;
  onDelete: (id: number) => void;
  isRemoving?: boolean;
  isLoading: boolean;
  graphData?: PortfolioGraphData;
};

export const MyPortfolioCard = ({ data, onDelete, isRemoving = false, isLoading, graphData }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [assetsCount, setAssetsCount] = useState(0);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  // Use graph data from props
  const profitEur = graphData?.profitEur ?? Number.NaN;
  const profitPct = graphData?.profitPct ?? Number.NaN;
  const chartValues = graphData?.chartValues ?? [0];
  const hasChartData = !isLoading && !!graphData?.chartValues && graphData.chartValues.length > 0;

  const minVal = Math.min(...chartValues);
  const maxVal = Math.max(...chartValues);
  const padding = (maxVal - minVal) * 0.05;

  useEffect(() => {
    let assetsArray: Assets[] = [];

    if (data.asset) {
      if (Array.isArray(data.asset)) {
        assetsArray = data.asset;
      } else if (typeof data.asset === 'string') {
        try {
          const parsed = JSON.parse(data.asset);
          assetsArray = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error("Error parsing assets:", e);
          assetsArray = [];
        }
      }
    }

    const activeAssetsCount = assetsArray.filter((assetDetail) => assetDetail.status).length;
    setAssetsCount(activeAssetsCount);
  }, [data.asset]);

  const profitClassName = useMemo(() => {
    if (!Number.isFinite(profitEur)) return 'gray-2-color-text';
    return profitEur >= 0 ? 'green-color-text' : 'red-color-text';
  }, [profitEur]);

  const isPositiveTrend = useMemo(() => {
    if (chartValues.length < 2) return true;
    return chartValues[chartValues.length - 1] >= chartValues[0];
  }, [chartValues]);

  const strokeColor = isPositiveTrend ? CHART_COLORS.green : CHART_COLORS.red;
  const gradientId = useMemo(() => `portfolio-area-gradient-${data.id ?? 'new'}`, [data.id]);

  return (
    <OutlineContainer
      className={`my-portfolio-card ${isRemoving ? 'my-portfolio-card--removing' : ''}`}
      onClick={() => navigate(`/profile/my_portfolio_details/${data.id}`)}
      style={{ overflow: 'visible' }}
    >
      <div
        className="my-portfolio-card__actions"
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsActionsMenuOpen(false);
          }
        }}
      >
        <button
          type="button"
          className="my-portfolio-card__actions-trigger"
          aria-label={t('Options')}
          onClick={() => setIsActionsMenuOpen((prev) => !prev)}
        >
          <SlOptions color={'var(--gray-2-color)'} />
        </button>

        {isActionsMenuOpen && (
          <div className="my-portfolio-card__actions-menu">
            <button
              type="button"
              className="my-portfolio-card__actions-item"
              onClick={() => {
                setIsActionsMenuOpen(false);
                navigate(`/profile/edit_my_portfolio/${data.id}`);
              }}
            >
              <FiEdit3 />
              <span>{t('Edit')}</span>
            </button>
            <button
              type="button"
              className="my-portfolio-card__actions-item my-portfolio-card__actions-item--danger"
              onClick={() => {
                if (!data.id || isRemoving) return;
                setIsActionsMenuOpen(false);
                void onDelete(data.id);
              }}
            >
              <LuTrash />
              <span>{t('Delete')}</span>
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-font-bold">{data.name}</div>
        <div className="gray-5-color-text tw-text-xs sm:tw-text-sm">{assetsCount} {t('Active holdings')}</div>

        <div className="my-portfolio-card__graph-wrapper">
          {isLoading ? (
            <GraphDataSkeleton
              baseColor={'transparent'}
              highlightColor={'var(--secondary-color)'}
              style={{ width: '100%', height: '100%' }}
            />
          ) : hasChartData ? (
            <ResponsiveChartContainer
              series={[
                {
                  id: 'portfolio',
                  type: 'line',
                  data: chartValues,
                  color: strokeColor,
                  area: true,
                  baseline: minVal - padding,
                  showMark: false,
                  curve: 'monotoneX',
                  valueFormatter: (value) => (value == null ? '' : `${value.toFixed(2)} EUR`),
                },
              ]}
              xAxis={[
                {
                  scaleType: 'point',
                  data: chartValues.map((_, index) => index),
                  disableLine: true,
                  disableTicks: true,
                },
              ]}
              yAxis={[
                {
                  min: minVal - padding,
                  max: maxVal + padding,
                  disableLine: true,
                  disableTicks: true,
                },
              ]}
              height={96}
              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              sx={{
                width: '100%',
                height: '100%',
                '& .MuiChartsAxis-root': { display: 'none' },
                '& .MuiLineElement-root': { strokeWidth: 1.8 },
                '& .MuiAreaElement-series-portfolio': {
                  fill: `url(#${gradientId})`,
                  fillOpacity: 1,
                },
              }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <AreaPlot />
              <LinePlot />
              <ChartsTooltip trigger="axis" />
            </ResponsiveChartContainer>
          ) : (
            <div className="no-data-wrapper">
              <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t('No data')}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4" style={{ minHeight: '52px' }}>
        {Number.isFinite(profitEur) ? (
          <div className="flex flex-column">
            <div className="tw-text-sm sm:tw-text-base d-flex align-items-center flex-wrap">
              {profitPct > 0 ? (
                <LuTrendingUp style={{ marginRight: '8px', color: 'var(--green-color)', display: 'inline-block' }} />
              ) : (
                <LuTrendingDown style={{ marginRight: '8px', color: 'var(--red-color)', display: 'inline-block' }} />
              )}

              <span className={`${profitClassName} tw-text-base sm:tw-text-lg md:tw-text-xl tw-font-semibold`}>
                {(profitEur >= 0 ? '+' : '') + profitEur.toFixed(2) + ' EUR'}
              </span>

              {Number.isFinite(profitPct) && (
                <span className="gray-5-color-text tw-text-xs sm:tw-text-sm" style={{ marginLeft: '5px' }}>
                  {' (' + (profitEur >= 0 ? '+' : '') + profitPct.toFixed(2) + ' %)'}
                </span>
              )}
            </div>
            <div className="gray-2-color-text tw-text-xs sm:tw-text-sm mt-1">{t('Monthly return')}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </OutlineContainer>
  );
};
