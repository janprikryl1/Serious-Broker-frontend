import { Typeahead } from "react-bootstrap-typeahead";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Option } from "react-bootstrap-typeahead/types/types";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {useMyPortfolioContext} from "../../../../utils/providers/MyPortfolioProvider.tsx";

type Props = {
    coin?: string;
    index: number;
};

export const AvailableCoinsDropdown: FC<Props> = ({ coin, index }) => {
    const { availableCoins, setAsset, asset } = useMyPortfolioContext();
    const { t } = useTranslation();
    
    const filteredOptions = availableCoins.filter(
        (c) => !asset.some((asset) => asset.asset_label === c.name)
    );

    const handleChange = (selected: Option[]) => {
        setAsset((prevAsset) =>
            prevAsset.map((item, i) =>
                i === index
                    ? { ...item, id: selected.length > 0 && typeof selected[0] === "object" && "name" in selected[0] ? (selected[0] as { id: number }).id : 0, asset_label: selected.length > 0 && typeof selected[0] === "object" && "name" in selected[0] ? (selected[0] as { name: string }).name : "" }
                    : item
            )
        );
    };

    return (
        <Typeahead
            id="available-coins"
            onChange={handleChange}
            options={filteredOptions as Option[]}
            placeholder={t("Vyberte coin...")}
            labelKey="name"
            selected={coin ? availableCoins.filter(c => c.name === coin) : []}
            allowNew={false}
        />
    );
};
