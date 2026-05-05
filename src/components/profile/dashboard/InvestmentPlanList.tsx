import React, { useEffect, useState } from 'react';
import { OutlineContainer } from '../../reusable/OutlineContainer.tsx';
import { getInvestmentPlansDetails } from '../../../utils/api/investmentPlanService.ts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from '../../../utils/constants';
import { FiClock, FiDollarSign, FiTag } from 'react-icons/fi';
import { LuLayers } from 'react-icons/lu';

export const InvestmentPlanList = () => {
  const { t } = useTranslation();

  const [plans, setPlans] = useState(JSON.parse('[]'));
  const [isLoading, setIsLoading] = useState(true);

  const formatFrequency = (value) => {
    if (value === 'day') return 'Daily';
    if (value === 'week') return 'Weekly';
    if (value === 'month') return 'Monthly';
    if (value === 'year') return 'Yearly';
    return value || '-';
  };

  const formatTargetType = (value) => {
    if (value === 'portfolio') return 'Portfolio';
    if (value === 'index') return 'Index';
    return value || '-';
  };

  const getTargetLink = (plan) => {
    if (plan.target_type === 'portfolio') {
      return plan.user_portfolio_id ? `/profile/my_portfolio_details/${plan.user_portfolio_id}` : null;
    }

    const indexLabel = plan.index_name || plan.target_name;
    return indexLabel ? `/asset_graph/${encodeURIComponent(indexLabel)}` : null;
  };

  const getPlanFields = (plan) => ([
    { Icon: FiClock, label: 'Investment Frequency', value: formatFrequency(plan.frequency) },
    { Icon: FiDollarSign, label: 'Investment Amount', value: `${Number(plan.investment_amount ?? 0).toLocaleString()} ${plan.currency || ''}`.trim() },
    {
      Icon: FiTag,
      label: plan.target_type === 'portfolio' ? 'Portfolio Name' : 'Index Name',
      value: plan.target_name || plan.portfolio_name || plan.index_name || '-',
      link: getTargetLink(plan)
    },
  ]);

  useEffect(() => {
    let mounted = true;

    const loadPlans = async () => {
      try {
        setIsLoading(true);
        const response = await getInvestmentPlansDetails();
        if (!mounted) return;
        setPlans(Array.isArray(response?.data) ? response.data : []);
      } catch {
        if (mounted) setPlans([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadPlans();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="mt-4">Načítavam investičné plány...</div>;
  }

  if (!plans.length) {
    return <div className="mt-4">Žiadne investičné plány sa nenašli.</div>;
  }

  return (
    <OutlineContainer className="dashboard-container ">
      <div className={'card-header'}>
        <p className="mb-3">
          <Link to={routes.profile.myInvestmentPlans} className="text-decoration-none">
            {t('Investment plans')}
          </Link>
        </p>
      </div>
      <div className="d-flex flex-column gap-3 mt-4">
        {plans.map((plan) => (
          <div className="d-flex flex-column gap-2 fs-4" key={plan.id ?? plan.name}>
            <div className="mb-0">
                {plan.name || '-'}
            </div>
            <div className="d-flex gap-3 mb-2 border-bottom">
              {getPlanFields(plan).map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-3 col-4 mb-3">
                  <div className="color-container--gold icon-container">
                    <item.Icon size={20} />
                  </div>
                  <div>
                    <div className="gray-2-color-text" style={{ fontSize: '0.9rem' }}>
                      {t(item.label)}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                      {item.link ? (
                        <Link to={item.link} className="text-decoration-underline">
                          {t(item.value)}
                        </Link>
                      ) : (
                        t(item.value)
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OutlineContainer>
  );
};
