import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {AssetDetailSkeleton} from "../../components/graphs/asset/AssetDetailSkeleton.tsx";
import {useAssetGraph} from "../../utils/hooks/useAssetGraph.ts";
import {useMediaQuery} from "@mui/material";
import {routes} from "../../utils/constants";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";
import {WatchlistButton} from "../../components/reusable/WatchlistButton.tsx";
import Box from "@mui/material/Box";
import {StyledTab, StyledTabs} from "../../components/tabs/StyledTabs.tsx";
import {IndexDetailsTab1} from "../../components/tabs/IndexDetailsTab1.tsx";
import {IndexDetailsTab2} from "../../components/tabs/IndexDetailsTab2.tsx";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import coinsGroup from "../../utils/icons/coins/coins_group.svg";

export const IndexDetails: FC = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [value, setValue] = useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const {
    asset,
    handleToggleWatchList,
    selectedPeriod,
    setSelectedPeriod,
    currencyValue,
    setCurrencyValue,
    setCurrency,
    setCurrencyPrice,
    currencyPrice,
    currency,
    graphData,
    missingCurrencies,
    isInWatchList
  } = useAssetGraph();

  return (
    asset ? (
      <>
        <div className="container tw-pt-8">
          <Link to={routes.assets} className="tw-inline-block">
            <div className="tw-flex tw-items-center tw-text-gray-2 hover:tw-underline">
              <IoIosArrowBack />
              {t("Back to list")}
            </div>
          </Link>
        </div>

        <TitleHeader
          title={asset?.name}
          badge={t("Index")}
          img={coinsGroup}
          imgClassname="tw-h-[100px]"
          actionIcon={
            <WatchlistButton
              isInWatchList={isInWatchList}
              onToggle={handleToggleWatchList}
              className="-tw-translate-y-[7px]"
              size={24}
            />
        }/>

        <div className="container mt-4">
          <Box>
            <StyledTabs
              value={value}
              onChange={handleChange}
            >
              <StyledTab value="overview" label={t("Overview")} />
              <StyledTab value="recommendation" label={t("Buy & Sell Recommendations")} />
            </StyledTabs>
          </Box>

          <div className="tw-mt-4">
            {value === 'overview' && (
              <IndexDetailsTab1
                asset={asset}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                currencyValue={currencyValue}
                setCurrencyValue={setCurrencyValue}
                setCurrency={setCurrency}
                setCurrencyPrice={setCurrencyPrice}
                currencyPrice={currencyPrice}
                currency={currency}
                graphData={graphData}
                missingCurrencies={missingCurrencies}
              />
            )}
            {value === 'recommendation' && (
              user ? (
                <IndexDetailsTab2 indexDetails={asset} />
              ) : (
                <div className="tw-text-center tw-py-10 tw-text-gray-2">
                  {t("Please log in to view recommendations")}
                </div>
              )
            )}
          </div>
        </div>
      </>
    ) : <AssetDetailSkeleton/>
  );
};
