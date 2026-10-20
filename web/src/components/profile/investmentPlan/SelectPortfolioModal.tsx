import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { ExistingPortfoliosTable } from "./ExistingPortfoliosTable.tsx";
import { AssetType } from "../../../utils/types/asset/AssetType.ts";

export type SelectPortfolioModalProps = {
  show: boolean;
  onClose: () => void;
  selectedAssetId: number | null | undefined;
  onSelectPortfolio: (asset: AssetType) => void;
};

export const SelectPortfolioModal: FC<SelectPortfolioModalProps> = ({
                                                                      show,
                                                                      onClose,
                                                                      selectedAssetId,
                                                                      onSelectPortfolio,
                                                                    }) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="xl"
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <Modal.Header closeButton className="tw-border-0">
        <Modal.Title>{t("Select portfolio")}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="tw-pb-4">
        <ExistingPortfoliosTable
          selectedAssetId={selectedAssetId}
          onSelectAsset={(asset) => {
            onSelectPortfolio(asset);
            onClose();
          }}
          maxContainerHeight="tw-max-h-[min(65vh,580px)]"
          showDetailGraph={false} // v modale grafy netreba, aby bol výber svižný
        />
      </Modal.Body>
    </Modal>
  );
};