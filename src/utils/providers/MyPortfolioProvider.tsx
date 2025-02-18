import { createContext, ReactNode, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { AvailableCoinType } from "../types/myPortfolio/availableCoinType.ts";
import {MyPortfolioType} from "../types/myPortfolio/MyPortfolioType.ts";
import Swal from "sweetalert2";
import {Assets} from "../types/asset/AssetDetailType.ts";
import {getAvaliableCoins, getMyPortfolioDetails, saveMyPortfolio} from "../api/myPortfolioService.ts";

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
    saveChanges: () => Promise<void>;
    isLoading: boolean;
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
    const [asset, setAsset] = useState<Assets[]>([]);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setIsLoading(true);
                const response = await getAvaliableCoins();
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
            Swal.fire({
                title: t('Error, portfolio name is required'),
                text: t('Please enter portfolio name'),
                icon: 'error',
            });
            return;
        }

        if (!asset.length) {
            Swal.fire({
                title: t('Error, portfolio asset is required'),
                text: t('Please add at least one asset to portfolio'),
                icon: 'error',
            });
            return;
        }

        try {
            setIsLoading(true);

            const portfolioData: MyPortfolioType = {
                id: id ? parseInt(id) : undefined,
                name: name.trim(),
                description: description.trim(),
                asset
            };

            const response = await saveMyPortfolio(portfolioData);
            Swal.fire({
                title: t('Portfolio saved'),
                text: t('Portfolio saved successfully'),
                icon: 'success',
            });

            if (!id && response.data.data.id) {
                navigate("/profile/edit_my_portfolio/"+response.data.data.id);
            }
        } catch (error) {
            console.error('Error saving portfolio:', error);
            Swal.fire({
                title: t('Error while saving portfolio'),
                text: t('Error while saving portfolio, please try again'),
                icon: 'error',
            });
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
        isLoading
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