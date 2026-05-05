import {FC, useEffect, useState} from "react";
import {getAssetSpotKlines} from "../../utils/api/GraphsService.ts";
import {getBinanceAssetATH} from "../../utils/api/ATHService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {TitleHeader} from "../about/TitleHeader.tsx";
import {BTFDGraph} from "./BTFDGraph.tsx";
import {CollapsibleInfoBox} from "../reusable/CollapsibleInfoBox.tsx";
import {useTranslation} from "react-i18next";

type ParameterSetting = { multiplier: number, period: number, maxDrop: number };
type ProcessedDataPoint = { datetime: string, closeEur: number };
type Result = { assetName: string, coinName: string, results: number[][], datetimes: string[] };

export const BTFDTuningParameters: FC = () => {
  const { t } = useTranslation();
  const coinsLabels = ['BTC', 'BNB', 'ETH', 'DOGE', 'SHIB'];
  const coinsNames = ['Bitcoin', 'BNB', 'Ethereum', 'Dogecoin', "Shiba Inu"]
  const [ATHs, setATHs] = useState<number[]>([]);
  const multiplier1 = 3;
  const multiplier2 = 10;
  const period1 = 1;
  const period2 = 3;
  const maxDrop1 = 0.75;
  const maxDrop2 = 0.5;
  const settings: ParameterSetting[] = [
    {multiplier: multiplier1, period: period1, maxDrop: maxDrop1},
    {multiplier: multiplier2, period: period1, maxDrop: maxDrop1},
    {multiplier: multiplier1, period: period2, maxDrop: maxDrop1},
    {multiplier: multiplier1, period: period1, maxDrop: maxDrop2},
  ]

  // Labels for the new "Model" column, matching the order of `settings`
  const modelLabels = [
    'Base model',
    'Multiplier x10',
    'Period 3 years',
    'Max Drop 50%'
  ];

  const modelClasses = [
    'red',
    'green',
    'blue',
    'purple'
  ]

  const maxPeriod = Math.max(period1, period2);
  const [importantParameters, setImportantParameters] = useState<number[]>([]);

  const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
  const [results, setRestults] = useState<Result[] | undefined>([]);

  useEffect(() => {
    const getData = async () => {
      // First, load ATH values from backend
      let loadedATHs: number[] = [];
      for (const coin of coinsLabels) {
        try {
          const response = await getBinanceAssetATH(coin);
          const athValue = typeof response?.data?.price_eur === 'string'
            ? parseFloat(response.data.price_eur)
            : (response?.data?.price_eur ?? 0);
          loadedATHs.push(athValue);
        } catch (e) {
          console.error(`Failed to fetch ATH for ${coin}:`, e);
          loadedATHs.push(0);
        }
      }
      setATHs(loadedATHs);

      // Then process data with loaded ATHs
      let tempResults: Result[] = [];

      for (let i = 0; i < coinsLabels.length; i++) {
        let resultsForAsset: number[][] = [];
        let tempDatetime: string[] = [];

        for (let j = 0; j < settings.length; j++) {

          try {
            const response = await getAssetSpotKlines(
              coinsLabels[i],
              settings[j].period,
              "2025-11-14",
            );
            if (response?.data) {
              const processedData: ProcessedDataPoint[] = response.data.map((p: any) => ({
                datetime: p.datetime,
                closeEur: parseFloat(p.close_eur),
              }));
              setGraphData(processedData);
              const tempFilteredData = processedData.filter((_, index) => index % 10 === 0);


              if (settings[j].period == maxPeriod) {
                tempDatetime = tempFilteredData.map((p: any) => p.datetime);
              }

              let result = computeBTFD(coinsLabels[i], tempFilteredData, loadedATHs[i], settings[j].multiplier, settings[j].maxDrop);
              resultsForAsset.push(result);

              if (j == settings.length - 1) {
                tempResults.push({
                  assetName: coinsLabels[i],
                  coinName: coinsNames[i],
                  results: resultsForAsset,
                  datetimes: tempDatetime
                });
              }

            } else {
              setGraphData([]);
            }
          } catch (e) {
            CustomSwal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
            });
            console.log(e);
            setGraphData([]);
          }
        }
      }
      setRestults(tempResults);
    }
    getData();
  }, []);

  function computeBTFD(assetName: String, inputData: ProcessedDataPoint[], ATH: number, maxMultiplier: number, maxDecrease: number): number[] {
    const points = inputData.map((p) => p)

    let baseInvestment = 100;
    let currentATH = ATH;

    let totalInvested = 0;
    let totalAssetUnitsOwned = 0;
    let ret = 0;
    let data: number[] = [];

    for (const p of points) {

      if (p.closeEur > currentATH) {
        currentATH = p.closeEur;
      }

      let priceDecrease = Math.min((currentATH - p.closeEur) / currentATH, maxDecrease);
      const multiplier = 1 + ((maxMultiplier - 1) / maxDecrease * priceDecrease);

      let actualInvestment = multiplier * baseInvestment;

      totalInvested += actualInvestment;
      totalAssetUnitsOwned += actualInvestment / p.closeEur;

      let holdingsValue = p.closeEur * totalAssetUnitsOwned;
      let profit = holdingsValue - totalInvested;
      ret = profit / totalInvested;

      data.push(ret * 100);
    }
    return data;
  }

  function computeImportantParameters() {
    if (!settings || settings.length === 0) {
      return [];
    }

    const baseSettings = settings[0];
    const differingParameterIndexes: number[] = [];

    for (let i = 1; i < settings.length; i++) {
      const currentSettings = settings[i];

      if (currentSettings.multiplier !== baseSettings.multiplier) {
        differingParameterIndexes.push(0);
      } else if (currentSettings.period !== baseSettings.period) {
        differingParameterIndexes.push(1);
      } else if (currentSettings.maxDrop !== baseSettings.maxDrop) {
        differingParameterIndexes.push(2);
      }
    }

    setImportantParameters(differingParameterIndexes);
  }

  return (
    <>
      <TitleHeader title={t("Buy the F*****g Dip Investing Strategy")}/>
      <div className="container graph-container mt-4">
        <CollapsibleInfoBox
          title={t("btfdInfo.title")}
          initialText={t("btfdInfo.initialText")}
          className="mb-5"
        >
          <div className="mt-4">
            <h5 className="info-box-heading">{t("btfdInfo.dynamicVsPassiveTitle")}</h5>
            <p className="info-box-text">
              {t("btfdInfo.dynamicVsPassiveText")}
            </p>

            <hr className="border-light opacity-25 my-4"/>

            <h5 className="info-box-heading">{t("btfdInfo.mechanicsTitle")}</h5>
            <p className="info-box-text">
              {t("btfdInfo.mechanicsText")}
            </p>

            <div className="ms-3">
              <h6 className="fw-bold mb-2">{t("btfdInfo.baseAmountTitle")}</h6>
              <p className="info-box-text small">
                {t("btfdInfo.baseAmountDesc")}
              </p>

              <h6 className="fw-bold mb-2">{t("btfdInfo.multiplierTitle")}</h6>
              <p className="info-box-text small">
                {t("btfdInfo.multiplierDesc")}
              </p>
            </div>

            <div className="mt-4 p-3 pb-1 rounded" style={{ background: "rgba(255,255,255,0.1)" }}>
              <p className="info-box-text m-0">
                <strong>{t("btfdInfo.whyBetterTitle")}</strong><br/>
                {t("btfdInfo.whyBetterDesc")}
              </p>
            </div>
          </div>
        </CollapsibleInfoBox>

        <p>{t("btfdInfo.tuningDescription")}</p>

        {results?.map((asset, assetIndex) => (
          <div key={assetIndex} className="mb-5">

            <h3 className="mt-5 mb-3">{asset.assetName} - {asset.coinName}</h3>

            <div className="btfd-tuning-table-wrapper">
              <table className="btfd-tuning-table">

                <thead className="btfd-tuning-thead">
                <tr>
                  <th className="btfd-tuning-th">Model</th>
                  <th className="btfd-tuning-th">Multiplier</th>
                  <th className="btfd-tuning-th">Period</th>
                  <th className="btfd-tuning-th">Max Drop</th>
                  <th className="btfd-tuning-th">Result</th>
                </tr>
                </thead>

                <tbody className="btfd-tuning-tbody">
                {asset.results.map((resForSetting, settingIndex) => {

                  const currentSetting = settings[settingIndex];
                  const baseSetting = settings[0];

                  const lastResult = resForSetting[resForSetting.length - 1];
                  const formattedResult = lastResult ? `${lastResult.toFixed(2)}%` : 'N/A';

                  const highlightColor = "#B1974E";


                  let highlightType: string | null = null;

                  if (settingIndex > 0) { // Prvý riadok (index 0) nezvýrazňujeme
                    if (currentSetting.multiplier !== baseSetting.multiplier) {
                      highlightType = 'multiplier';
                    } else if (currentSetting.period !== baseSetting.period) {
                      highlightType = 'period';
                    } else if (currentSetting.maxDrop !== baseSetting.maxDrop) {
                      highlightType = 'maxDrop';
                    }
                  }

                  return (
                    <tr key={settingIndex} className="btfd-tuning-tr">
                      {/* Model column */}
                      <td className={`btfd-tuning-td`}>
                        <div
                          className={`d-inline-flex align-items-center justify-content-center color-container--chart-${modelClasses[settingIndex]}`}
                          style={{borderRadius: '15px', padding: '2px 12px', fontSize: '0.85rem'}}>
                          {modelLabels[settingIndex]}
                        </div>
                      </td>

                      {/* Multiplier */}
                      <td
                        className={`btfd-tuning-td ${highlightType === 'multiplier' ? 'btfd-tuning-td--highlighted' : ''}`}>
                        {currentSetting.multiplier}
                      </td>

                      {/* Period */}
                      <td
                        className={`btfd-tuning-td ${highlightType === 'period' ? 'btfd-tuning-td--highlighted' : ''}`}>
                        {currentSetting.period}
                      </td>

                      {/* Max Drop */}
                      <td
                        className={`btfd-tuning-td ${highlightType === 'maxDrop' ? 'btfd-tuning-td--highlighted' : ''}`}>
                        {currentSetting.maxDrop}
                      </td>

                      <td className="btfd-tuning-td btfd-tuning-td--bold" style={{color: "#B1974E"}}>
                        {formattedResult}
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>

            {asset.results && asset.datetimes && (
              <div className="mt-4">
                <BTFDGraph
                  graphData={asset.results}
                  datetimes={asset.datetimes}
                />
              </div>
            )}

          </div>
        ))}
      </div>
    </>
  )
}