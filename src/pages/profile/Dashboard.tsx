import React, {useEffect, useState} from 'react';
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {InfoRow} from "../../components/profile/dashboard/InfoRow";
import {BestPortfolio} from "../../components/profile/dashboard/BestPortfolio.tsx";
import { getDashboardDetails } from "../../utils/api/dashboardService.ts";
import {PortfoliosList} from "../../components/profile/dashboard/PortfoliosList.tsx";
import {InvestmentPlanList} from "../../components/profile/dashboard/InvestmentPlanList.tsx";
import {TrafficLightsList} from "../../components/profile/dashboard/TrafficLightsList.tsx";

export const Dashboard = () => {
  const [portfolioSum, setPortfolioSum] = useState(0);
  const [investmentPlanSum, setInvestmentPlanSum] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [buyTrafficLights, setBuyTrafficLights] = useState(0);
  const [sellTrafficLights, setSellTrafficLights] = useState(0);

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

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <TitleHeader title="Dashboard" />
      <div className="container mt-5">
        <div className="d-flex flex-column gap-4">
          <InfoRow portfolioSum={portfolioSum} totalInvested={totalInvested} investmentPlanSum={investmentPlanSum} buyTrafficLightSum={buyTrafficLights} sellTrafficLightSum={sellTrafficLights}/>
          <div className="row g-4">
            <div className="col-lg-8 col-md-5">
              <BestPortfolio />
            </div>
            <div className="col-lg-4 col-md-7">
              <PortfoliosList />
            </div>
          </div>
          <TrafficLightsList />
          <InvestmentPlanList />
        </div>
      </div>
    </>
  );
};
