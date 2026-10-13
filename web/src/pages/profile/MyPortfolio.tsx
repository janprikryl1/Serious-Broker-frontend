import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteMyPortfolio, getMyPortfolios, getMyPortfolioDetailsGraph } from "../../utils/api/myPortfolioService.ts";
import { getAssetGraphData } from "../../utils/api/binanceIndexAssets.ts";
import { QuotedCurrenciesPeriod } from "../../utils/options/QuotedCurrenciesPeriod.ts";
import { MyPortfolioCard } from "../../components/profile/myPortfolio/MyPortfolioCard.tsx";
import { Button } from "../../components/reusable/Button.tsx";
import { routes } from "../../utils/constants";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { MyPortfolioType } from "../../utils/types/myPortfolio/MyPortfolioType.ts";
import { GoPlus } from "react-icons/go";
import { PortfolioGraphData } from "../../utils/types/asset/MyPortfolioType.ts";
import { SpinnerLoader } from "../../components/reusable/SpinnerLoader.tsx";
import Skeleton from "react-loading-skeleton";

export const MyPortfolio = () => {
  const { t } = useTranslation();
  const [myPortfolios, setMyPortfolios] = useState<MyPortfolioType[]>([]);
  const [removingPortfolioIds, setRemovingPortfolioIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [portfolioGraphData, setPortfolioGraphData] = useState<Map<number, PortfolioGraphData>>(new Map());

  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const previousRectsRef = useRef<Map<number, DOMRect>>(new Map());

  const fetchMyPortfolios = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getMyPortfolios();
      const portfolios = Array.isArray(response.data) ? response.data : [];
      setMyPortfolios(portfolios);

      const graphData = new Map();

      for (const portfolio of portfolios) {
        try {
          const detailsResponse = await getMyPortfolioDetailsGraph(portfolio.id!);
          const details = detailsResponse.data;

          const currencies = details.asset
            .filter((assetDetail) => assetDetail.status)
            .map((assetDetail) => ({
              asset_label: assetDetail.asset_label,
              allocation: assetDetail.allocation
            }));

          if (currencies.length > 0) {
            try {
              const graphResponse = await getAssetGraphData(currencies, QuotedCurrenciesPeriod.month);
              const values = Object.values(graphResponse?.data?.data ?? {})
                .map((value) => Number(value))
                .filter((value) => Number.isFinite(value));

              if (values.length > 0) {
                const firstValue = values[0];
                const lastValue = values[values.length - 1];

                const calculatedProfitEur = lastValue - firstValue;

                const calculatedProfitPct = firstValue !== 0
                  ? (calculatedProfitEur / firstValue) * 100
                  : 0;

                graphData.set(portfolio.id!, {
                  chartValues: values,
                  profitEur: calculatedProfitEur,
                  profitPct: calculatedProfitPct
                });
              }
            } catch (error) {
              console.error(`Failed to fetch graph data for portfolio ${portfolio.id}:`, error);
            }
          }
        } catch (error) {
          console.error(`Failed to fetch details for portfolio ${portfolio.id}:`, error);
        }
      }

      setPortfolioGraphData(graphData);
      setIsLoading(false);
    } catch {
      setMyPortfolios([]);
      setPortfolioGraphData(new Map());
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPortfolios();
  }, [fetchMyPortfolios]);

  const handleDeletePortfolio = useCallback(async (id) => {
    setRemovingPortfolioIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

    // Let shrink animation finish before removing item from grid
    await new Promise((resolve) => setTimeout(resolve, 180));

    try {
      await deleteMyPortfolio(id);
      setMyPortfolios((prev) => prev.filter((portfolio) => portfolio.id !== id));
      setPortfolioGraphData((prev) => {
        const newGraphData = new Map(prev);
        newGraphData.delete(id);
        return newGraphData;
      });
    } catch {
      await fetchMyPortfolios();
    } finally {
      setRemovingPortfolioIds((prev) => prev.filter((portfolioId) => portfolioId !== id));
    }
  }, [fetchMyPortfolios]);

  useLayoutEffect(() => {
    const nextRects = new Map();

    itemRefs.current.forEach((node, id) => {
      if (!node) return;
      nextRects.set(id, node.getBoundingClientRect());
    });

    itemRefs.current.forEach((node, id) => {
      if (!node) return;

      const previousRect = previousRectsRef.current.get(id);
      const nextRect = nextRects.get(id);
      if (!previousRect || !nextRect) return;

      const deltaX = previousRect.left - nextRect.left;
      const deltaY = previousRect.top - nextRect.top;
      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;

      node.style.transition = "none";
      node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      requestAnimationFrame(() => {
        node.style.transition = "transform 300ms ease-out";
        node.style.transform = "translate(0, 0)";
      });
    });

    previousRectsRef.current = nextRects;
  }, [myPortfolios]);

  return (
    <>
      <TitleHeader title={t("My Portfolios")} />
      <div className="container mt-1">
        <p className="tw-text-xs sm:tw-text-sm md:tw-text-base">
          {t("Pick your favorite coins to create a custom portfolio and track your potential profits in one place.")}
        </p>

        <Button className="d-inline-flex align-items-center gap-2 mb-5 tw-p-2 tw-text-sm sm:tw-text-base" type="link"
                to={routes.profile.newMyPortfolio}>
          <GoPlus size={25} />
          <span className="tw-mr-1">{t("New portfolio")}</span>
        </Button>

        {/* My Portfolios Section */}
        <div className="my-portfolios-section">
          {isLoading ? (
            <div className="row g-4 align-items-stretch">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="col-12 col-sm-6 col-lg-4" key={index}>
                  <Skeleton
                    height={290}
                    borderRadius={16}
                    className="tw-w-full"
                  />
                </div>
              ))}
            </div>
          ) : myPortfolios.length === 0 ? (
            <div className="text-center mt-5">
              <h4 className="tw-text-base sm:tw-text-lg">{t("You have no portfolios created yet.")}</h4>
              <p className="tw-text-xs sm:tw-text-sm text-muted">{t("Click the button above to create your first portfolio.")}</p>
            </div>
          ) : (
            <div className="row g-4 align-items-stretch">
              {myPortfolios.map((portfolio) => (
                <div
                  className={`col-12 col-sm-6 col-lg-4 my-portfolio-grid-item ${removingPortfolioIds.includes(portfolio.id!) ? "my-portfolio-grid-item--removing" : ""}`}
                  key={portfolio.id}
                  ref={(node) => {
                    if (!node) {
                      itemRefs.current.delete(portfolio.id!);
                      return;
                    }
                    itemRefs.current.set(portfolio.id!, node);
                  }}
                >
                  <MyPortfolioCard
                    data={portfolio}
                    isRemoving={removingPortfolioIds.includes(portfolio.id!)}
                    isLoading={isLoading}
                    onDelete={handleDeletePortfolio}
                    graphData={portfolioGraphData.get(portfolio.id!)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
