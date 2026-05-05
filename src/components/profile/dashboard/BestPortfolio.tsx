import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AssetAnalysisGraph } from "../../graphs/asset/AssetAnalysisGraph.tsx";
import { getAssetGraphData } from "../../../utils/api/binanceIndexAssets.ts";
import { getMyPortfolioDetailsGraph, getMyPortfolios } from "../../../utils/api/myPortfolioService.ts";
import { Currencies } from "../../../utils/enums/CurrenciesEnum.ts";
import { formatCurrency } from "../../../utils/functions/functions.ts";
import { QuotedCurrenciesPeriod } from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import { AssetAnalysisGraphData } from "../../../utils/types/graphs/AssetAnalysisGraphData.ts";
import { QuotedCurrency } from "../../../utils/types/graphs/QuotedCurrency.ts";
import { MyPortfolioType } from "../../../utils/types/myPortfolio/MyPortfolioType.ts";
import {CardContainer} from "../../reusable/CardContainer.tsx";
import {OutlineContainer} from "../../reusable/OutlineContainer.tsx";

type PortfolioStats = {
  current_value: number;
  invested_amount: number;
  profit: number;
  profitPct: number;
};

type BestPerformer = {
  id: number;
  name: string;
  profitPct: number;
};

type PortfolioGraphDetails = {
  asset: Array<{ asset_label: string; allocation: number; status: boolean }>;
};

export const BestPortfolio = () => {
  const { t } = useTranslation();
  const [myPortfolios, setMyPortfolios] = useState<MyPortfolioType[]>([]);
  const [portfolioStats, setPortfolioStats] = useState<Map<number, PortfolioStats>>(new Map());
  const [bestPortfolioDetails, setBestPortfolioDetails] = useState<PortfolioGraphDetails | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.month);
  const [currency, setCurrency] = useState<Currencies>(Currencies.EUR);
  const [currencyPrice, setCurrencyPrice] = useState<string>();
  const [currencyValue, setCurrencyValue] = useState<number>(1);
  const [graphData, setGraphData] = useState<AssetAnalysisGraphData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyPortfolios = async () => {
      try {
        setIsLoading(true);
        const response = await getMyPortfolios();
        const portfolios = Array.isArray(response.data) ? response.data : [];
        setMyPortfolios(portfolios);

        const stats = new Map<number, PortfolioStats>();
        for (const portfolio of portfolios) {
          if (!portfolio.id) continue;

          try {
            const detailsResponse = await getMyPortfolioDetailsGraph(portfolio.id);
            const details = detailsResponse.data;
            const investedAmount = Number(details.invested_amount);
            const currentValue = Number(details.current_value);
            const profit = currentValue - investedAmount;
            const profitPct = investedAmount > 0 ? (profit / investedAmount) * 100 : 0;
            stats.set(portfolio.id, {
              current_value: currentValue,
              invested_amount: investedAmount,
              profit,
              profitPct,
            });
          } catch {
            // Keep module resilient; one failed portfolio should not break whole widget.
          }
        }

        setPortfolioStats(stats);
      } catch {
        setMyPortfolios([]);
        setPortfolioStats(new Map());
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPortfolios();
  }, []);

  // Same best performer selection logic as in MyPortfolio.tsx, extended with id for follow-up graph loading.
  const bestPerformer = useMemo<BestPerformer | null>(() => {
    let best: BestPerformer | null = null;

    for (let i = 0; i < myPortfolios.length; i++) {
      const portfolio = myPortfolios[i];
      if (!portfolio?.id) continue;

      const stats = portfolioStats.get(portfolio.id);
      if (!stats) continue;

      if (!best || stats.profitPct > best.profitPct) {
        best = { id: portfolio.id, name: portfolio.name, profitPct: stats.profitPct };
      }
    }

    return best;
  }, [myPortfolios, portfolioStats]);

  useEffect(() => {
    if (!bestPerformer?.id) {
      setBestPortfolioDetails(null);
      return;
    }

    const fetchBestPortfolioDetails = async () => {
      try {
        const response = await getMyPortfolioDetailsGraph(bestPerformer.id);
        setBestPortfolioDetails(response.data as PortfolioGraphDetails);
      } catch {
        setBestPortfolioDetails(null);
      }
    };

    fetchBestPortfolioDetails();
  }, [bestPerformer]);

  useEffect(() => {
    if (!bestPortfolioDetails) {
      setGraphData(undefined);
      return;
    }

    const fetchGraphData = async () => {
      try {
        setGraphData(undefined);

        const currencies = bestPortfolioDetails.asset
          .filter((assetDetail) => assetDetail.status)
          .map((assetDetail) => ({
            asset_label: assetDetail.asset_label,
            allocation: assetDetail.allocation,
          })) as QuotedCurrency[];

        const response = await getAssetGraphData(currencies, selectedPeriod);
        if (!response) return;

        setGraphData(response.data);
        setCurrencyPrice(formatCurrency(response.data.price));
        setCurrency(Currencies.EUR);
        setCurrencyValue(1);
      } catch {
        setGraphData(undefined);
      }
    };

    fetchGraphData();
  }, [bestPortfolioDetails, selectedPeriod]);

  if (isLoading) {
    return (
      <OutlineContainer className="dashboard-container mt-4">
        <p className="mb-0">{t("Loading best portfolio...")}</p>
      </OutlineContainer>
    );
  }

  if (!bestPerformer) {
    return (
      <OutlineContainer className="dashboard-container mt-4">
        <p className="mb-0">{t("No portfolio data available.")}</p>
      </OutlineContainer>
    );
  }

  return (
    <OutlineContainer className="dashboard-container mt-5">
    <div className="mt-1">
        <div className={'card-header mb-3'}>
          <p className="mb-3">
            {t("Most profitable portfolio")}:{" "}
            <Link to={`/profile/my_portfolio_details/${bestPerformer.id}`} className="text-decoration-underline gold-color-text fs-4">
              {bestPerformer.name}
            </Link>
          </p>
        </div>

      <AssetAnalysisGraph
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        graphData={graphData}
        currency={currency}
        setCurrency={setCurrency}
        currencyPrice={currencyPrice}
        setCurrencyPrice={setCurrencyPrice}
        currencyValue={currencyValue}
        setCurrencyValue={setCurrencyValue}
      />
    </div>
    </OutlineContainer>
  );
};

