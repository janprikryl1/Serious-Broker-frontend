import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { MyPortfolioProvider, useMyPortfolioContext } from "../../utils/providers/MyPortfolioProvider.tsx";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { distributeEvenAllocations } from "../../utils/functions/portfolioAllocations.ts";
import {Button, ButtonColor} from "../../components/reusable/Button.tsx";
import { showToast } from "../../components/toast/toastHelper.tsx";
import { routes } from "../../utils/constants";
import { FiEye } from "react-icons/fi";
import { Assets } from "../../utils/types/asset/AssetDetailType.ts";
import {PortfolioFormCard} from "../../components/profile/myPortfolio/myPortfolioEdit/PortfolioFormCard.tsx";
import {
  SelectCryptocurrenciesModal
} from "../../components/profile/myPortfolio/myPortfolioEdit/SelectCryptocurrenciesModal.tsx";

export const EditMyPortfolio: FC = () => {
  return (
    <MyPortfolioProvider>
      <EditMyPortfolioContent />
    </MyPortfolioProvider>
  );
};

const EditMyPortfolioContent: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    name,
    setName,
    asset,
    setAsset,
    saveChanges,
    isLoading
  } = useMyPortfolioContext();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleAllocationChange = (coinId: number, value: string) => {
    const numPercent = value === "" ? 0 : parseFloat(value);
    const decimalValue = numPercent / 100;

    setAsset((prev) =>
      prev.map((item) =>
        item.id === coinId ? { ...item, allocation: decimalValue } : item
      )
    );
  };

  const handleRemoveAsset = (symbol: string) => {
    setAsset((prev) => {
      const remaining = prev.filter((item) => item.asset_label !== symbol);
      return distributeEvenAllocations(remaining);
    });
  };

  const handleRecompute = () => {
    if (asset.length === 0) return;
    setAsset((prev) => distributeEvenAllocations(prev));
    showToast.info(t("Allocations recomputed to 100%"));
  };

  const handleAddAssetsFromModal = (newAssets: Assets[]) => {
    setAsset((prev) => {
      const unique = newAssets.filter(
        (na) => !prev.some((p) => p.asset_label.toUpperCase() === na.asset_label.toUpperCase())
      );
      const combined = [...prev, ...unique];
      return distributeEvenAllocations(combined);
    });
  };

  const handleSave = async () => {
    setHasSubmitted(true);

    const isNameEmpty = !name || name.trim() === "";
    const sumAllocations = asset.reduce((acc, curr) => acc + (Number(curr.allocation) || 0), 0);
    const isAllocationInvalid = asset.length === 0 || Math.abs(sumAllocations - 1.0) >= 0.001;

    if (isNameEmpty) {
      showToast.error(t("Portfolio name is required."));
      return;
    }

    if (asset.length === 0) {
      showToast.error(t("Please select at least one cryptocurrency."));
      return;
    }

    if (isAllocationInvalid) {
      showToast.error(t("Allocation must be 100% in total."));
      return;
    }

    const response = await saveChanges();
    if (response && (response.status === 200 || response.status === 201)) {
      navigate(routes.profile.myPortfolio);
    }
  };

  const isEditMode = Boolean(id);

  return (
    <>
      <TitleHeader
        title={isEditMode ? t("Edit Portfolio") : t("Create New Portfolio")}
        secondaryTitle={name ? name : undefined}
      />

      <div className="container tw-flex tw-flex-col tw-items-center  mt-2 pb-5">
        <PortfolioFormCard
          name={name}
          onNameChange={setName}
          assets={asset}
          onAllocationChange={handleAllocationChange}
          onRemoveAsset={handleRemoveAsset}
          onRecompute={handleRecompute}
          onOpenAddModal={() => setShowModal(true)}
          hasSubmitted={hasSubmitted}
        />

        <div className="tw-flex tw-items-center tw-gap-3 tw-mt-6 tw-justify-center lg:tw-justify-start">
          {isEditMode && (
            <Button
              color={ButtonColor.transparent}
              className=" tw-border tw-border-secondary"
              type="link"
              to={`/profile/my_portfolio_details/${id}`}
            >
              <div className="tw-text-stone-300 tw-flex tw-items-center tw-gap-2">
                <FiEye size={18} />
                {t("Preview portfolio")}
              </div>
            </Button>
          )}

          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? t("Saving...") : t("Save")}
          </Button>
        </div>
      </div>

      <SelectCryptocurrenciesModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddAssets={handleAddAssetsFromModal}
        existingAssetSymbols={asset.map((a) => a.asset_label)}
      />
    </>
  );
};