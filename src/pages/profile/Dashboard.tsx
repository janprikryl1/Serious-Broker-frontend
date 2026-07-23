import React, {useEffect, useState} from 'react';
import {TitleHeader} from '../../components/about/TitleHeader.tsx';
import {InfoRow} from '../../components/profile/dashboard/InfoRow';
import {BestPortfolio} from '../../components/profile/dashboard/BestPortfolio.tsx';
import { getDashboardDetails } from '../../utils/api/dashboardService.ts';
import {PortfoliosList} from '../../components/profile/dashboard/PortfoliosList.tsx';
import {InvestmentPlanList} from '../../components/profile/dashboard/InvestmentPlanList.tsx';
import {TrafficLightsList} from '../../components/profile/dashboard/TrafficLightsList.tsx';
import {getMyPortfolios} from '../../utils/api/myPortfolioService.ts';
import {MyPortfolioType} from "../../utils/types/myPortfolio/MyPortfolioType.ts";
import {useTranslation} from "react-i18next";

export const Dashboard = () => {
  const {t} = useTranslation();
  const [portfolioSum, setPortfolioSum] = useState(0);
  const [investmentPlanSum, setInvestmentPlanSum] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [buyTrafficLights, setBuyTrafficLights] = useState(0);
  const [sellTrafficLights, setSellTrafficLights] = useState(0);
  const [portfolios, setPortfolios] = useState<MyPortfolioType[]>([]);
  const [arePortfoliosLoading, setArePortfoliosLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await getDashboardDetails();
        if (!mounted) return;
        const data = res?.data;
        setPortfolioSum(Number(data?.portfolio_sum ?? 0));
        setInvestmentPlanSum(Number(data?.investment_plan_sum ?? 0));
        setTotalInvested(Number(data?.total_invested ?? 0));
        setBuyTrafficLights(Number(data?.traffic_light_buy_sum ?? 0));
        setSellTrafficLights(Number(data?.traffic_light_sell_sum ?? 0));
      } catch {
        setPortfolioSum(0);
        setInvestmentPlanSum(0);
        setTotalInvested(0);
        setBuyTrafficLights(0);
        setSellTrafficLights(0);
      }
    })();

    const loadPortfolios = async () => {
      try {
        setArePortfoliosLoading(true);
        const response = await getMyPortfolios();
        if (!mounted) return;
        setPortfolios(Array.isArray(response?.data) ? response.data : []);
      } catch {
        if (mounted) setPortfolios([]);
      } finally {
        if (mounted) setArePortfoliosLoading(false);
      }
    };

    loadPortfolios();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <TitleHeader title="My Dashboard" />
      <div className="container mt-5">
        <h3 className="tw-my-6 tw-pt-8 ">{t("My Dashboard")}</h3>
        <div className="d-flex flex-column gap-4">
          <InfoRow portfolioSum={portfolioSum} totalInvested={totalInvested} investmentPlanSum={investmentPlanSum} buyTrafficLightSum={buyTrafficLights} sellTrafficLightSum={sellTrafficLights}/>
          <div className="row g-4">
            <div className="col-12 col-xl-7">
              <BestPortfolio isLoading={arePortfoliosLoading} myPortfolios={portfolios} />
            </div>
            <div className="col-12 col-xl-5">
              <PortfoliosList isLoading={arePortfoliosLoading} portfolios={portfolios} />
            </div>
          </div>
          <TrafficLightsList />
          <InvestmentPlanList />
        </div>
      </div>
    </>
  );
};
