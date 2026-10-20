import { createContext, ReactNode, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { AvailableCoinType } from "../types/myPortfolio/availableCoinType.ts";
import {MyPortfolioType} from "../types/myPortfolio/MyPortfolioType.ts";
import {Assets} from "../types/asset/AssetDetailType.ts";
import {getAvailableCoins, getMyPortfolioDetailsGraph, saveMyPortfolio} from "../api/myPortfolioService.ts";
import {showToast} from "../../components/toast/toastHelper.tsx";
import {captureEvent} from "../posthog.ts";

type Props = {
    children: ReactNode;
};

type MyPortfolioProps = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    asset: Assets[];
    setAsset: Dispatch<SetStateAction<Assets[]>>;
    availableCoins: AvailableCoinType[];
    saveChanges: () => Promise<any>;
    isLoading: boolean;
    investedAmount: number;
    startInvest: string;
    setInvestedAmount: Dispatch<SetStateAction<number>>;
    setStartInvest: Dispatch<SetStateAction<string>>;
};

const MyPortfolioContext = createContext<MyPortfolioProps | undefined>(undefined);

export const MyPortfolioProvider = ({ children }: Props) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [availableCoins, setAvailableCoins] = useState<AvailableCoinType[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [investedAmount, setInvestedAmount] = useState<number>(0);
    const [startInvest, setStartInvest] = useState<string>("");
    const [asset, setAsset] = useState<Assets[]>([]);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setIsLoading(true);
                const response = await getAvailableCoins();
                setAvailableCoins(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCoins();
    }, [t]);

    useEffect(() => {
        if (!id) return;

        const fetchPortfolio = async () => {
            try {
                setIsLoading(true);
                const response = await getMyPortfolioDetailsGraph(parseInt(id));
                const portfolio = response.data as any;

                const portfolioAssets = Array.isArray(portfolio.asset)
                    ? portfolio.asset.map((assetItem: any) => ({
                        ...assetItem,
                        name: assetItem.name || assetItem.asset_label || "",
                        allocation: Number(assetItem.allocation ?? 0),
                        photo: assetItem.photo || "",
                    }))
                    : [];

                setName(typeof portfolio.label === "string" ? portfolio.label : (portfolio.name ?? ""));
                setDescription(typeof portfolio.description === "string" ? portfolio.description : "");
                setAsset(portfolioAssets as Assets[]);
                setInvestedAmount(Number(portfolio.invested_amount ?? 0));
                setStartInvest(
                    portfolio.start_invest instanceof Date
                        ? portfolio.start_invest.toISOString().slice(0, 10)
                        : (portfolio.start_invest ?? "")
                );
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolio();
    }, [id, t, navigate]);

    const saveChanges = async () => {
        if (!name.trim()) {
            showToast.error(t('Error, portfolio name is required'));
            return null;
        }

        if (!asset.length) {
            showToast.error(t('Error, portfolio asset is required'));
            return null;
        }

        showToast.info(t('Saving portfolio...'));

        try {
            setIsLoading(true);

            const portfolioData: MyPortfolioType = {
                id: id ? parseInt(id) : undefined,
                name: name.trim(),
                description: description.trim(),
                asset,
                invested_amount: investedAmount,
                start_invest: startInvest
            };

            const response = await saveMyPortfolio(portfolioData);

            captureEvent(id ? 'portfolio_updated' : 'portfolio_created', {
                portfolio_id: id ? parseInt(id) : response?.data?.id,
                portfolio_name: name.trim(),
                asset_count: asset.length,
                invested_amount: investedAmount,
            });

            showToast.success(t('Portfolio saved successfully'));

            return response;
        } catch (error) {
            console.error('Error saving portfolio:', error);
            showToast.error(t('Error while saving portfolio, please try again'), 5000);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const value: MyPortfolioProps = {
        availableCoins,
        name,
        setName,
        description,
        setDescription,
        asset,
        setAsset,
        saveChanges,
        isLoading,
        investedAmount,
        startInvest,
        setInvestedAmount,
        setStartInvest
    };

    return (
        <MyPortfolioContext.Provider value={value}>{children}</MyPortfolioContext.Provider>
    );
};

export const useMyPortfolioContext = () => {
    const context = useContext(MyPortfolioContext);
    if (context === undefined) {
        throw new Error("useMyPortfolioContext must be used within a MyPortfolioProvider");
    }
    return context;
};