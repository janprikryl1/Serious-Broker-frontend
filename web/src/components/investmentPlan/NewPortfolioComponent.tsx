import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { coinURL, routes } from "../../utils/constants";
import { InvestmentPlanLayout } from "../profile/myPortfolio/InvestmentPlanLayout.tsx";
import { getBinanceIndexAssetRecomBestPrevious } from "../../utils/api/GraphsService.ts";
import {
  BinanceIndexAssetRecomBestPreviousType
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { RecommendationGraphEnum } from "../../utils/enums/RecommendationGraphEnum.tsx";
import { useInfiniteScroll } from "../../utils/hooks/useInfiniteScroll.ts";
import { NextStepButton } from "../reusable/NextStepButton.tsx";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { Button, ButtonColor } from "../reusable/Button.tsx";
import { Modal } from "react-bootstrap";
import { SearchBar } from "../reusable/SearchBar.tsx";
import { useMyPortfolioContext } from "../../utils/providers/MyPortfolioProvider.tsx";
import { CustomModal } from "../reusable/CustomModal.tsx";
import { useInvestmentPlanContext } from "../../utils/providers/InvestmentPlanProvider.tsx";
import { Assets } from "../../utils/types/asset/AssetDetailType.ts";
import { showToast } from "../toast/toastHelper.tsx";
import { GlassCard } from "../reusable/GlassCard.tsx";
import { AssetRowSkeleton } from "../graphs/asset/AssetRowSkeleton.tsx";
import { getAllCryptocurrenciesPhoto } from "../../utils/api/CryptocurrencyService.ts";
import { CryptoCurrencyAdminType } from "../../utils/types/asset/CryptoCurrencyType.ts";
import { getTradingCoins } from "../../utils/api/binanceIndexAssets.ts";
import { Checkbox } from "../reusable/Checkbox.tsx";
import {SelectCryptocurrenciesModal} from "../profile/myPortfolio/myPortfolioEdit/SelectCryptocurrenciesModal.tsx";
import {PortfolioFormCard} from "../profile/myPortfolio/myPortfolioEdit/PortfolioFormCard.tsx";
import baseGoldCoin from "../../utils/icons/coins/base_gold.png";

const distributeEvenAllocations = (assetsList: Assets[]): Assets[] => {
  const count = assetsList.length;
  if (count === 0) return [];

  const baseUnits = Math.floor(100 / count);
  const remainderUnits = 100 % count;

  return assetsList.map((item, index) => {
    const units = index < remainderUnits ? baseUnits + 1 : baseUnits;
    return {
      ...item,
      allocation: units / 100
    };
  });
};

export const NewPortfolioComponent: FC = () => {
  const { t } = useTranslation();
  const currentStep = 0;
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { name, setName, asset, setAsset, saveChanges } = useMyPortfolioContext();
  const { setIsCustomPortfolio, setUserPortfolioId, setBinanceAssetId } = useInvestmentPlanContext();

  const handleAllocationChange = (id: number, value: string) => {
    const numPercent = value === "" ? 0 : parseFloat(value);
    setAsset(prev => prev.map(a => a.id === id ? { ...a, allocation: numPercent / 100 } : a));
  };

  const handleRemoveAsset = (symbol: string) => {
    setAsset(prev => distributeEvenAllocations(prev.filter(a => a.asset_label !== symbol)));
  };

  const handleRecompute = () => {
    setAsset(prev => distributeEvenAllocations(prev));
    showToast.info(t("Allocations recomputed to 100%"));
  };

  const handleAddAssetsFromModal = (newAssets: Assets[]) => {
    setAsset(prev => {
      const unique = newAssets.filter(na => !prev.some(p => p.asset_label === na.asset_label));
      return distributeEvenAllocations([...prev, ...unique]);
    });
  };

  const createPortfolio = async () => {
    setHasSubmitted(true);
    const sum = asset.reduce((acc, curr) => acc + (Number(curr.allocation) || 0), 0);
    if (!name.trim() || asset.length === 0 || Math.abs(sum - 1.0) >= 0.001) return;

    try {
      const response = await saveChanges();
      if (response && (response.status === 200 || response.status === 201)) {
        setIsCustomPortfolio(true);
        setBinanceAssetId(null);
        if (response.data?.data?.id) setUserPortfolioId(response.data.data.id);
        setShowFinalModal(true);
      }
    } catch {
      showToast.error(t("Error while saving portfolio, please try again"));
    }
  };

  return (
    <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
      <h5 className="tw-mb-0 tw-pb-0 tw-text-base sm:tw-text-lg">
        {t("Create New Portfolio")}
      </h5>
      <Link
        to={routes.profile.newInvestmentPlanExistingPortfolio}
        className="link-underline tw-text-xs sm:tw-text-sm"
      >
        {t("Choose from Existing Portfolios instead")}
      </Link>

      <PortfolioFormCard
        name={name}
        onNameChange={setName}
        assets={asset}
        onAllocationChange={handleAllocationChange}
        onRemoveAsset={handleRemoveAsset}
        onRecompute={handleRecompute}
        onOpenAddModal={() => setShowPortfolioModal(true)}
        hasSubmitted={hasSubmitted}
      />

      <div className="tw-mt-6">
        <Button onClick={createPortfolio}>{t("Create")}</Button>
      </div>

      <SelectCryptocurrenciesModal
        show={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        onAddAssets={handleAddAssetsFromModal}
        existingAssetSymbols={asset.map(a => a.asset_label)}
      />

      <CustomModal
        title={t("Portfolio {{name}} created", { name })}
        type="success"
        showModal={showFinalModal}
        closeModal={() => setShowFinalModal(false)}
      >
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={true}
          link={routes.profile.newInvestmentPlanRecurringInvestment}
        />
      </CustomModal>
    </InvestmentPlanLayout>
  );
};
