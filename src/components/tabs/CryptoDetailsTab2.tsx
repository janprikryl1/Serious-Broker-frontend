import {FC} from "react";
import {useTranslation} from "react-i18next";
import {BtfdDcaComparison} from "../graphs/BtfdDcaComparison.tsx";

type Props = {
  assetLabel: string | undefined;
}

// Strategies tab
export const CryptoDetailsTab2: FC<Props> = ({assetLabel}) => {
  const {t} = useTranslation();

  return (
    <div className="tw-pt-10">
      {assetLabel && <BtfdDcaComparison asset_label={assetLabel}/>}
    </div>
  );
};