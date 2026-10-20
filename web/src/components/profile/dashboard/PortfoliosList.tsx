import React from 'react';
import { useTranslation } from 'react-i18next';
import {routes} from '../../../utils/constants';
import {Link} from 'react-router-dom';
import {MyPortfolioType} from "../../../utils/types/myPortfolio/MyPortfolioType.ts";

type Props = {
  isLoading: boolean;
  portfolios: MyPortfolioType[];
}

export const PortfoliosList = ({isLoading, portfolios}: Props) => {
  const { t } = useTranslation();

  const parseAssets = (assetValue) => {
    if (Array.isArray(assetValue)) return assetValue;

    if (typeof assetValue === 'string') {
      try {
        const parsed = JSON.parse(assetValue);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    return [];
  };

  if (isLoading) {
    return <div className="tw-mt-3 sm:tw-mt-4 tw-text-xs sm:tw-text-sm">{t('Loading portfolios...')}</div>;
  }

  if (!portfolios.length) {
    return <div className="tw-mt-3 sm:tw-mt-4 tw-text-xs sm:tw-text-sm">{t('No portfolios found.')}</div>;
  }

  return (
    <div className="tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl tw-p-3 sm:tw-p-4 lg:tw-p-6 tw-min-w-0" >
      <div className="card-header">
        <Link to={routes.profile.myPortfolio} className="text-decoration-none">
          <h6 className="tw-mb-0 tw-text-sm sm:tw-text-base">{t('Portfolios')}</h6>
        </Link>
      </div>
      <div className="d-flex flex-column gap-3 tw-mt-3 sm:tw-mt-4">
        {portfolios.map((portfolio) => {
          const assets = parseAssets(portfolio.asset)
            .map((asset) => asset?.['asset_label'])
            .filter(Boolean);
          const assetsPreview = assets.slice(0, 3);
          const hasMoreAssets = assets.length > 3;

          return (
            <div className="d-flex flex-wrap gap-2 align-items-start sm:align-items-center justify-content-between tw-pb-2 tw-border-b tw-border-stone-400 tw-border-opacity-20 tw-text-xs sm:tw-text-sm" key={portfolio.id ?? portfolio.name}>
              <div className="tw-mb-0 tw-min-w-0 tw-max-w-full">
                <Link to={`/profile/my_portfolio_details/${portfolio.id}`} className="text-decoration-none tw-break-words">
                  {portfolio.name}
                </Link>
              </div>
              <div className="gray-2-color-text text-start flex-grow-1 tw-min-w-0 tw-break-words tw-text-xs sm:tw-text-sm">
                {assetsPreview.length > 0
                  ? `${assetsPreview.join(', ')}${hasMoreAssets ? ', ...' : ''}`
                  : <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t('No assets')}</div>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
};
