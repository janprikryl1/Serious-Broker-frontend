import React, { useEffect, useState } from 'react';
import { getInvestmentPlansDetails } from '../../../utils/api/investmentPlanService.ts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from '../../../utils/constants';
import { FiClock, FiDollarSign, FiTag } from 'react-icons/fi';

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
    return <div className="tw-mt-3 sm:tw-mt-4 tw-text-xs sm:tw-text-sm">Načítavam investičné plány...</div>;
  }

  if (!plans.length) {
    return <div className="tw-mt-3 sm:tw-mt-4 tw-text-xs sm:tw-text-sm">Žiadne investičné plány sa nenašli.</div>;
  }

  return (
    <div className="tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl tw-p-3 sm:tw-p-4 lg:tw-p-6 tw-min-w-0" >
      <div className="card-header">
        <Link to={routes.profile.myInvestmentPlans} className="text-decoration-none">
          <h6 className="tw-mb-0 tw-text-sm sm:tw-text-base">{t('Investment plans')}</h6>
        </Link>
      </div>
      <div className="d-flex flex-column gap-3 tw-mt-3 sm:tw-mt-4">
        {plans.map((plan) => (
          <div className="d-flex flex-column gap-2 tw-text-xs sm:tw-text-sm lg:tw-text-base" key={plan.id ?? plan.name}>
            <div className="tw-mb-0 tw-break-words tw-font-medium">
                {plan.name || '-'}
            </div>
            <div className="row tw-mb-2 tw-border-b tw-border-stone-400 tw-border-opacity-20">
              {getPlanFields(plan).map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-2 sm:gap-3 col-12 col-lg-4 tw-mb-2 sm:tw-mb-3 tw-min-w-0">

                  {/* Icon */}
                  <div className="color-container--gold icon-container">
                    <item.Icon size={20} />
                  </div>

                  {/* Label + Value */}
                  <div className="tw-min-w-0">
                    <div className="gray-2-color-text tw-text-[11px] sm:tw-text-xs tw-leading-tight">
                      {t(item.label)}
                    </div>
                    <div className="tw-text-xs sm:tw-text-sm lg:tw-text-base tw-font-medium tw-leading-snug tw-break-words">
                      {item.link ? (
                        <Link to={item.link} className="text-decoration-underline tw-break-words">
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
    </div>
  );
};
