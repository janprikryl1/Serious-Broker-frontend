import { createContext, ReactNode, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { AvailableCoinType } from "../types/myPortfolio/availableCoinType.ts";
import {MyPortfolioType} from "../types/myPortfolio/MyPortfolioType.ts";
import {Assets} from "../types/asset/AssetDetailType.ts";
import {getAvailableCoins, getMyPortfolioDetails, saveMyPortfolio} from "../api/myPortfolioService.ts";
import {ToastColor, useToast} from "./ToastProvider.tsx";

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
    const { showToast } = useToast();

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
                const response = await getMyPortfolioDetails(parseInt(id));
                const portfolio = response.data;

                setName(portfolio.name);
                setDescription(portfolio.description || "");
                setAsset(portfolio.asset);
                setInvestedAmount(portfolio.invested_amount);
                setStartInvest(portfolio.start_invest);
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
            showToast(t('Error, portfolio name is required'), ToastColor.red);
            return null;
        }

        if (!asset.length) {
            showToast(t('Error, portfolio asset is required'), ToastColor.red);
            return null;
        }

        showToast(t('Saving portfolio...'), ToastColor.gold);

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

            showToast(t('Portfolio saved successfully'), ToastColor.green);

            return response;
        } catch (error) {
            console.error('Error saving portfolio:', error);
            showToast(t('Error while saving portfolio, please try again'), ToastColor.red, 5000);
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