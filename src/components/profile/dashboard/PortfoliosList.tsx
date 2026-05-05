import React, { useEffect, useState } from 'react';
import { OutlineContainer } from '../../reusable/OutlineContainer.tsx';
import { getMyPortfolios } from '../../../utils/api/myPortfolioService.ts';
import { useTranslation } from 'react-i18next';
import {routes} from "../../../utils/constants";
import {Link} from "react-router-dom";

export const PortfoliosList = () => {
  const { t } = useTranslation();

  const [portfolios, setPortfolios] = useState(JSON.parse('[]'));
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    let mounted = true;

    const loadPortfolios = async () => {
      try {
        setIsLoading(true);
        const response = await getMyPortfolios();
        if (!mounted) return;
        setPortfolios(Array.isArray(response?.data) ? response.data : []);
      } catch {
        if (mounted) setPortfolios([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadPortfolios();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="mt-4">Načítavam portfóliá...</div>;
  }

  if (!portfolios.length) {
    return <div className="mt-4">Žiadne portfóliá sa nenašli.</div>;
  }

  return (
    <OutlineContainer className="dashboard-container ">
      <div className={'card-header'}>
        <Link to={routes.profile.myPortfolio} className="text-decoration-none">
          <p className="mb-3">{t('Portfolios')}</p>
        </Link>
      </div>
      <div className="d-flex flex-column gap-3 mt-4">
        {portfolios.map((portfolio) => {
          const assets = parseAssets(portfolio.asset)
            .map((asset) => asset?.['asset_label'])
            .filter(Boolean);
          const assetsPreview = assets.slice(0, 3);
          const hasMoreAssets = assets.length > 3;

          return (
            <div className="d-flex gap-2 align-items-start" key={portfolio.id ?? portfolio.name}>
              <div className="col-3 mb-0">
                <Link to={`/profile/my_portfolio_details/${portfolio.id}`} className="text-decoration-none">
                  {portfolio.name}
                </Link>
              </div>
              <div className='gray-2-color-text'>
                {assetsPreview.length > 0
                  ? `${assetsPreview.join(', ')}${hasMoreAssets ? ', ...' : ''}`
                  : <div className='gray-2-color-text'>{t('No assets')}</div>
                }
              </div>
            </div>
          );
        })}
      </div>
    </OutlineContainer>

  );
};

