import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getInvestmentPlan, saveInvestmentPlan} from "../api/investmentPlanService.ts";
import {InvestmentPlanType} from "../types/investmentPlan/InvestmentPlanType.ts";
import {InvestmentFrequency} from "../../pages/profile/investmentPlan/RecurringInvestment.tsx";
import {routes} from "../constants";
import {showToast} from "../../components/toast/toastHelper.tsx";

type Props = {
    children: ReactNode;
};

type InvestmentPlanProps = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    isCustomPortfolio: boolean;
    setIsCustomPortfolio: Dispatch<SetStateAction<boolean>>;
    userPortfolioId: number | null;
    setUserPortfolioId: Dispatch<SetStateAction<number | null>>;
    binanceAssetId: number | null;
    setBinanceAssetId: Dispatch<SetStateAction<number | null>>;
    frequency: string;
    setFrequency: Dispatch<SetStateAction<InvestmentFrequency>>;
    day: number | null;
    setDay: Dispatch<SetStateAction<number | null>>;
    hour: number | null;
    setHour: Dispatch<SetStateAction<number | null>>;
    startDate: string | null;
    setStartDate: Dispatch<SetStateAction<string | null>>;
    investmentAmount: number | null;
    setInvestmentAmount: Dispatch<SetStateAction<number | null>>;
    currency: string;
    setCurrency: Dispatch<SetStateAction<string>>;
    buyTrafficLightId: number | null;
    setBuyTrafficLightId: Dispatch<SetStateAction<number | null>>;
    sellTrafficLightId: number | null;
    setSellTrafficLightId: Dispatch<SetStateAction<number | null>>;
    saveChanges: () => Promise<void>;
    isLoading: boolean;
}

const InvestmentPlanContext = createContext<InvestmentPlanProps | undefined>(undefined);

export const InvestmentPlanProvider = ({ children }: Props) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isCustomPortfolio, setIsCustomPortfolio] = useState<boolean>(false);
    const [userPortfolioId, setUserPortfolioId] = useState<number | null>(null);
    const [binanceAssetId, setBinanceAssetId] = useState<number | null>(null);
    const [investmentAmount, setInvestmentAmount] = useState<number | null>(100);
    const [currency, setCurrency] = useState<string>("EUR");
    const [buyTrafficLightId, setBuyTrafficLightId] = useState<number | null>(null);
    const [sellTrafficLightId, setSellTrafficLightId] = useState<number | null>(null);
    const [frequency, setFrequency] = useState<InvestmentFrequency>(InvestmentFrequency.week); // alebo InvestmentFrequency.week
    const [day, setDay] = useState<number | null>(null);
    const [hour, setHour] = useState<number | null>(0);
    const [startDate, setStartDate] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (!id) return;

        const fetchPlan = async () => {
            try {
                setIsLoading(true);
                const response = await getInvestmentPlan(parseInt(id));
                const plan = response.data;

                setName(plan.name);
                setDescription(plan.description || "");
                setIsCustomPortfolio(!!plan.is_custom_portfolio);
                setUserPortfolioId(plan.user_portfolio_id ?? null);
                setBinanceAssetId(plan.binance_asset_id ?? null);
                setInvestmentAmount(plan.investment_amount);
                setCurrency(plan.currency);
                setBuyTrafficLightId(plan.buy_traffic_light_id ?? null);
                setSellTrafficLightId(plan.sell_traffic_light_id ?? null);
                setFrequency((plan.frequency as InvestmentFrequency) ?? InvestmentFrequency.week);
                setDay(plan.day_of_period ?? null);
                setHour(plan.investment_hour ?? 0);
                setStartDate(plan.start_date ?? null);
            } catch (error) {
                console.error("Error fetching investment plan:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlan();
    }, [id]);

    // Redirect to first step when page is refreshed
    useEffect(() => {
        const isIntroPage = location.pathname.includes(routes.profile.newInvestmentPlanIntro);
        const isNamePage = location.pathname.includes(routes.profile.newInvestmentPlanName);
        const isEditPage = location.pathname.includes("/profile/edit_investment_plan/");

        if (!isIntroPage && !isNamePage && !isEditPage && !name) {
            navigate(routes.profile.newInvestmentPlanIntro, { replace: true });
        }
    }, [location.pathname, name, navigate]);

    const saveChanges = async () => {
        if (!name.trim()) {
            showToast.error(t('Name is required'));
            return;
        }
        if (!investmentAmount || investmentAmount <= 0) {
            showToast.error(t('Invalid investment amount'));
            return;
        }
        if (isCustomPortfolio && !userPortfolioId) {
            showToast.error(t('Please select a portfolio'));
            return;
        }
        if (!isCustomPortfolio && !binanceAssetId) {
            showToast.error(t('Please select an asset'));
            return;
        }

        showToast.info(t('Saving investment plan...'));

        try {
            setIsLoading(true);

            const planData: InvestmentPlanType = {
                id: id ? parseInt(id) : undefined,
                name: name.trim(),
                description: description,
                is_custom_portfolio: isCustomPortfolio,
                user_portfolio_id: isCustomPortfolio ? userPortfolioId : null,
                binance_asset_id: !isCustomPortfolio ? binanceAssetId : null,
                frequency: frequency,
                day_of_period: day,
                investment_hour: hour ?? 0,
                investment_amount: investmentAmount,
                start_date: startDate,
                currency: currency,
                buy_traffic_light_id: buyTrafficLightId,
                sell_traffic_light_id: sellTrafficLightId
            };

            console.log(planData);

            await saveInvestmentPlan(planData);

            showToast.success(t('Investment plan saved successfully'));

            if (!id) {
                navigate("/profile/my_investment_plans");
            }
        } catch (e) {
            console.error('Error saving investment plan', e);
            showToast.error(t('Error while saving plan, please try again'), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const value: InvestmentPlanProps = {
        name, setName,
        description, setDescription,
        isCustomPortfolio, setIsCustomPortfolio,
        userPortfolioId, setUserPortfolioId,
        binanceAssetId, setBinanceAssetId,
        frequency, setFrequency,
        day, setDay,
        hour, setHour,
        startDate, setStartDate,
        investmentAmount, setInvestmentAmount,
        currency, setCurrency,
        buyTrafficLightId, setBuyTrafficLightId,
        sellTrafficLightId, setSellTrafficLightId,
        saveChanges,
        isLoading
    };

    return (
        <InvestmentPlanContext.Provider value={value}>{children}</InvestmentPlanContext.Provider>
    );
};

export const useInvestmentPlanContext = () => {
    const context = useContext(InvestmentPlanContext);
    if (context === undefined) {
        throw new Error("useInvestmentPlanContext must be used within an InvestmentPlanProvider");
    }
    return context;
};
