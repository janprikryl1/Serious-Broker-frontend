import {useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {deleteMyPortfolio, getMyPortfolios, getMyPortfolioDetailsGraph} from "../../utils/api/myPortfolioService.ts";
import {MyPortfolioCard} from "../../components/profile/myPortfolio/MyPortfolioCard.tsx";
import {Button} from "../../components/reusable/Button.tsx";
import {routes} from "../../utils/constants";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {MyPortfolioType} from "../../utils/types/myPortfolio/MyPortfolioType.ts";
import {CardContainer} from "../../components/reusable/CardContainer.tsx";
import {GoPlus} from "react-icons/go";

export const MyPortfolio = () => {
  const {t} = useTranslation();
  const [myPortfolios, setMyPortfolios] = useState<MyPortfolioType[]>([]);
  const [removingPortfolioIds, setRemovingPortfolioIds] = useState<number[]>([]);
  const [portfolioStats, setPortfolioStats] = useState<Map<number, {current_value: number; invested_amount: number; profit: number; profitPct: number}>>(new Map());
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const previousRectsRef = useRef<Map<number, DOMRect>>(new Map())

  const fetchMyPortfolios = useCallback(async () => {
    try {
      const response = await getMyPortfolios();
      const portfolios = Array.isArray(response.data) ? response.data : [];
      setMyPortfolios(portfolios);

      // Fetch details for statistics
      const stats = new Map();
      for (const portfolio of portfolios) {
        try {
          const detailsResponse = await getMyPortfolioDetailsGraph(portfolio.id!);
          const details = detailsResponse.data;
          const investedAmount = Number(details.invested_amount);
          const currentValue = Number(details.current_value);
          const profit = currentValue - investedAmount;
          const profitPct = investedAmount > 0 ? (profit / investedAmount) * 100 : 0;
          stats.set(portfolio.id!, {current_value: currentValue, invested_amount: investedAmount, profit, profitPct});
        } catch (error) {
          console.error(`Failed to fetch details for portfolio ${portfolio.id}:`, error);
        }
      }
      setPortfolioStats(stats);
    } catch {
      setMyPortfolios([]);
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
      setPortfolioStats((prev) => {
        const newStats = new Map(prev);
        newStats.delete(id);
        return newStats;
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

  // Calculate statistics
  const totalPortfolioValue = useMemo(() => {
    let total = 0;
    portfolioStats.forEach((stat) => {
      total += stat.current_value;
    });
    return total;
  }, [portfolioStats]);

  const totalProfit = useMemo(() => {
    let total = 0;
    portfolioStats.forEach((stat) => {
      total += stat.profit;
    });
    return total;
  }, [portfolioStats]);

  const totalProfitPct = useMemo(() => {
    const totalInvested = Array.from(portfolioStats.values()).reduce((sum, stat) => sum + stat.invested_amount, 0);
    return totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  }, [portfolioStats, totalProfit]);

  const bestPerformer = useMemo(() => {
    let best = { name: '', profitPct: -Infinity };
    for (let i = 0; i < myPortfolios.length; i++) {
      const portfolio = myPortfolios[i];
      const stats = portfolioStats.get(portfolio.id!);
      if (stats && stats.profitPct > best.profitPct) {
        best = { name: portfolio.name, profitPct: stats.profitPct };
      }
    }
    return best.name ? best : null;
  }, [myPortfolios, portfolioStats]);

  return (
    <>
      <TitleHeader title={t("My Portfolios")}/>
      <div className="container mt-1">
        <p>{t("Pick your favorite coins to create a custom portfolio and track your potential profits in one place.")}</p>
        <Button className="d-inline-flex align-items-center gap-2 mb-5" type="link" to={routes.profile.newMyPortfolio}>
          <GoPlus size={25} style={{marginBottom: "2px"}} />
          {t("New portfolio")}
        </Button>

        {/* My Portfolios Section */}
        <div className="my-portfolios-section">

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
                  onDelete={handleDeletePortfolio}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};