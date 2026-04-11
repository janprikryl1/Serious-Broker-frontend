import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyPortfolioDetailsGraph } from '../../../utils/api/myPortfolioService.ts';
import { AreaPlot, ChartContainer, ChartsTooltip, LinePlot } from '@mui/x-charts';
import { GraphDataSkeleton } from '../../graphs/asset/GraphDataSkeleton.tsx';
import { getAssetGraphData } from '../../../utils/api/binanceIndexAssets.ts';
import { QuotedCurrenciesPeriod } from '../../../utils/options/QuotedCurrenciesPeriod.ts';
import { useTranslation } from 'react-i18next';
import { FiEdit3 } from 'react-icons/fi';
import { LuTrash } from 'react-icons/lu';
import { SlOptions } from 'react-icons/sl';
import { LuTrendingDown, LuTrendingUp } from 'react-icons/lu';
import { OutlineContainer } from '../../reusable/OutlineContainer.tsx';

export const MyPortfolioCard = ({ data, onDelete, isRemoving = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profitEur, setProfitEur] = useState(Number.NaN);
  const [profitPct, setProfitPct] = useState(Number.NaN);
  const [chartValues, setChartValues] = useState([0]);
  const [hasChartData, setHasChartData] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [assetsCount, setAssetsCount] = useState(0);
  const minVal = Math.min(...chartValues);
  const maxVal = Math.max(...chartValues);
  const padding = (maxVal - minVal) * 0.05;

  useEffect(() => {
    if (!data.id) return;

    const fetchPortfolioCardData = async () => {
      setIsLoading(true);
      try {
        const detailsResponse = await getMyPortfolioDetailsGraph(data.id);
        const details = detailsResponse.data;

        const currencies = details.asset
          .filter((assetDetail) => assetDetail.status)
          .map((assetDetail) => ({
            asset_label: assetDetail.asset_label,
            allocation: assetDetail.allocation
          }));

        const activeAssetsCount = details.asset.filter((assetDetail) => assetDetail.status).length;
        setAssetsCount(activeAssetsCount);

        if (currencies.length === 0) {
          setHasChartData(false);
          setProfitEur(Number.NaN);
          setProfitPct(Number.NaN);
          return;
        }

        const graphResponse = await getAssetGraphData(currencies, QuotedCurrenciesPeriod.month);
        const values = Object.values(graphResponse?.data?.data ?? {})
          .map((value) => Number(value))
          .filter((value) => Number.isFinite(value));

        if (values.length === 0) {
          setHasChartData(false);
          setProfitEur(Number.NaN);
          setProfitPct(Number.NaN);
          return;
        }

        const firstValue = values[0];
        const lastValue = values[values.length - 1];
        const calculatedProfitEur = lastValue - firstValue;
        const calculatedProfitPct = firstValue > 0 ? (calculatedProfitEur / firstValue) * 100 : Number.NaN;

        setProfitEur(calculatedProfitEur);
        setProfitPct(calculatedProfitPct);
        setChartValues(values);
        setHasChartData(true);
      } catch {
        setProfitEur(Number.NaN);
        setProfitPct(Number.NaN);
        setHasChartData(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioCardData();
  }, [data.id]);

  const profitClassName = useMemo(() => {
    if (!Number.isFinite(profitEur)) return 'gray-2-color-text';
    return profitEur >= 0 ? 'green-on-primary-color-text' : 'red-on-primary-color-text';
  }, [profitEur]);

  const isPositiveTrend = useMemo(() => {
    if (chartValues.length < 2) return true;
    return chartValues[chartValues.length - 1] >= chartValues[0];
  }, [chartValues]);

  const strokeColor = isPositiveTrend ? 'var(--green-on-primary-color)' : 'var(--red-on-primary-color)';
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
        <div className={'name'}>{data.name}</div>
        <div style={{ fontSize: '1.0rem' }} className="gray-5-color-text">{assetsCount} {t('Active holdings')}</div>

        <div className="my-portfolio-card__graph-wrapper">
          {isLoading ? (
            <GraphDataSkeleton
              baseColor={'transparent'}
              highlightColor={'var(--secondary-color)'}
              style={{ width: '100%', height: '100%' }}
            />
          ) : hasChartData ? (
            <ChartContainer
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
                  valueFormatter: (value) => value == null ? '' : `${value.toFixed(2)} EUR`
                }
              ]}
              xAxis={[
                {
                  scaleType: 'point',
                  data: chartValues.map((_, index) => index),
                  position: 'none'
                }
              ]}
              yAxis={[
                {
                  position: 'none',
                  min: minVal - padding,
                  max: maxVal + padding
                }
              ]}
              height={96}
              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              sx={{
                width: '100%',
                '& .MuiChartsAxis-root': { display: 'none' },
                '& .MuiLineElement-root': { strokeWidth: 1.8 },
                '& .MuiAreaElement-series-portfolio': {
                  fill: `url(#${gradientId})`,
                  fillOpacity: 1
                }
              }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3}/>
                  <stop offset="100%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <AreaPlot />
              <LinePlot />
              <ChartsTooltip trigger="axis" />
            </ChartContainer>
          ) : (
            <div className="no-data-wrapper">
              <div className="gray-2-color-text">{t('No data')}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4" style={{ minHeight: '60px' }}>
        {Number.isFinite(profitEur) ? (
          <div className="flex flex-column">
            <div style={{ fontSize: '1.1rem' }}>
              {profitPct > 0 ? (
                <LuTrendingUp style={{ marginRight: '10px', color: 'var(--green-on-primary-color)', display: 'inline-block' }}/>
              ) : (
                <LuTrendingDown style={{ marginRight: '10px', color: 'var(--red-on-primary-color)', display: 'inline-block' }}/>
              )}

              <span className={profitClassName} style={{ fontSize: '22px' }}>
                {(profitEur >= 0 ? '+' : '') + profitEur.toFixed(2) + ' EUR'}
              </span>

              {Number.isFinite(profitPct) && (
                <span className="gray-5-color-text" style={{ marginLeft: '5px' }}>
                  {' (' + (profitEur >= 0 ? '+' : '') + profitPct.toFixed(2) + ' %)'}
                </span>
              )}
            </div>
            <div className="small gray-2-color-text">{t('Monthly return')}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </OutlineContainer>
  );
};

MyPortfolioCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isRemoving: PropTypes.bool
};
