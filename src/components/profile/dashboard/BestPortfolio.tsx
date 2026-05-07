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

type Props = {
  isLoading: boolean;
  myPortfolios: MyPortfolioType[];
}

type BestPerformer = {
  id: number;
  name: string;
  profitPct: number;
};

type PortfolioGraphDetails = {
  asset: Array<{ asset_label: string; allocation: number; status: boolean }>;
};

type PortfolioStats = {
  id: number;
  profitPct: number;
};

export const BestPortfolio = ({isLoading, myPortfolios}: Props) => {
  const { t } = useTranslation();
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats[]>([]);
  const [bestPortfolioDetails, setBestPortfolioDetails] = useState<PortfolioGraphDetails | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.month);
  const [currency, setCurrency] = useState<Currencies>(Currencies.EUR);
  const [currencyPrice, setCurrencyPrice] = useState<string>();
  const [currencyValue, setCurrencyValue] = useState<number>(1);
  const [graphData, setGraphData] = useState<AssetAnalysisGraphData>();
  const [isBestLoading, setIsBestLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyPortfolios = async () => {
      try {
        setIsBestLoading(true);

        const stats: PortfolioStats[] = []
        for (const portfolio of myPortfolios) {
          if (!portfolio.id) continue;

          try {
            const detailsResponse = await getMyPortfolioDetailsGraph(portfolio.id);
            const details = detailsResponse.data;
            const profitPct = details.month_0_profit;
            stats.push({id: portfolio.id, profitPct: profitPct});
          } catch {
          }
        }

        setPortfolioStats(stats);
      } catch {
        setPortfolioStats([]);
      } finally {
        setIsBestLoading(false);
      }
    };

    fetchMyPortfolios();
  }, [myPortfolios]);

  const bestPerformer = useMemo<BestPerformer | null>(() => {

    let best: BestPerformer | null = null;

    for (let i = 0; i < myPortfolios.length; i++) {
      const portfolio = myPortfolios[i];
      if (!portfolio?.id) continue;

      const stats = portfolioStats.find(s => s.id === portfolio.id);
      if (!stats) continue;

      if (!best || stats.profitPct > best.profitPct) {
        best = {
          id: portfolio.id,
          name: portfolio.name,
          profitPct: stats.profitPct
        };
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

  if (isLoading || isBestLoading) {
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
            {t("Top-performing portfolio of the past month")}:{" "}
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

