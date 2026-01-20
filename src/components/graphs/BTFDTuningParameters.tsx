import {FC, useEffect, useState} from "react";
import {getAssetSpotKlines} from "../../utils/api/GraphsService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import templates from "rollup-plugin-visualizer/dist/plugin/template-types";
import {TitleHeader} from "../about/TitleHeader.tsx";
import {Form} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {CardContainer} from "../reusable/CardContainer.tsx";
import {ChartContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
import {BTFDGraph} from "./BTFDGraph.tsx";
import {AssetRowMobile} from "./asset/AssetRowMobile.tsx";
import {AssetRow} from "./asset/AssetRow.tsx";

type ParameterSetting = {multiplier: number, period: number, maxDrop: number};
type ProcessedDataPoint = {datetime: string, closeEur: number};
type Result = {assetName: string, results: number[][], datetimes: string[]};

export const BTFDTuningParameters:FC = () => {
    const coinsLabels = ['BTC', 'BNB', 'ETH', 'DOGE', 'SHIB'];
    const ATHs = [56274.90, 567.69, 4059.86, 0.52, 0.0000649]
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
    const maxPeriod = Math.max(period1, period2);
    const [importantParameters, setImportantParameters] = useState<number[]>([]);

    const [graphData, setGraphData] = useState<ProcessedDataPoint[] | undefined>();
    const [filteredData, setFilteredData] = useState<ProcessedDataPoint[] | undefined>();
    const [multiplier1Result, setMultiplier1Result] = useState(0);
    const [multiplier2Result, setMultiplier2Result] = useState(0);
    const [period1Result, setPeriod1Result] = useState(0);
    const [period2Result, setPeriod2Result] = useState(0);
    const [maxDrop1Result, setMaxDrop1Result] = useState(0);
    const [maxDrop2Result, setMaxDrop22Result] = useState(0);
    const [results, setRestults] = useState<Result[] | undefined>([]);

    useEffect(() => {
        const getData = async () => {

            let tempResults: Result[] = [];         // {assetName: string, results: number[][], datetime: string[]}

            for (let i = 0; i < coinsLabels.length; i++) {
                let resultsForAsset: number[][] = [];   // results: number[][]
                let tempDatetime: string[] = [];

                for (let j = 0; j < settings.length; j++) {

                    try {
                        const response = await getAssetSpotKlines(
                            coinsLabels[i],
                            settings[j].period,
                            "2025-11-14",
                        );
                        if (response?.data) {
                            //console.log(response.data);
                            const processedData: ProcessedDataPoint[] = response.data.map((p: any) => ({
                                datetime: p.datetime,
                                closeEur: parseFloat(p.close_eur),
                            }));
                            setGraphData(processedData);
                            const tempFilteredData = processedData.filter((_, index) => index % 10 === 0);


                            if (settings[j].period == maxPeriod) {
                                tempDatetime = tempFilteredData.map((p: any) => p.datetime);
                                //console.log("maxPeriod", maxPeriod);
                                //console.log("tempDatetime: ", tempDatetime);

                            }

                            //setFilteredData(processedData.filter((_, index) => index % 70 === 0))

                            let result = computeBTFD(coinsLabels[i], tempFilteredData, ATHs[i], settings[j].multiplier, settings[j].maxDrop);
                            resultsForAsset.push(result);

                            if (j == settings.length - 1) {
                                tempResults.push({
                                    assetName: coinsLabels[i],
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
            //console.log("tempResults: ", tempResults);
        }
        getData();
    }, []);

    function computeBTFD(assetName: String, inputData: ProcessedDataPoint[], ATH: number, maxMultiplier: number, maxDecrease: number):number[] {
        const points = inputData.map((p) => p)

        // if (assetName === "DOGE" || assetName === "SHIB") {
        //     console.log("points: ", points);
        //     console.log("ATH: ", ATH, " maxMultiplier: ", maxMultiplier, " maxDecrease: ", maxDecrease);
        // }

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
            //console.log(multiplier);

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

    function computeImportatParameters() {
        if (!settings || settings.length === 0) {
            return [];
        }

        const baseSettings = settings[0];
        const differingParameterIndexes = [];

        for (let i = 1; i < settings.length; i++) {
            const currentSettings = settings[i];

            if (currentSettings.multiplier !== baseSettings.multiplier) {
                differingParameterIndexes.push(0);
            }

            else if (currentSettings.period !== baseSettings.period) {
                differingParameterIndexes.push(1);
            }

            else if (currentSettings.maxDrop !== baseSettings.maxDrop) {
                differingParameterIndexes.push(2);
            }
        }

        setImportantParameters(differingParameterIndexes);
    }

    return (
        <>
            <TitleHeader title={`Tuning of BTFD parameters`} />
            <div className="container graph-container mt-4">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner mb-5">
                            {/*{results?.map((r, assetIndex) => (
                                <div key={assetIndex}>
                                    <h3>{r.assetName}</h3>
                                    {r.results.map((resForSetting, settingIndex) => (
                                        <div key={settingIndex} style={{ marginLeft: "1rem" }}>
                                            {`Multiplier: ${settings[settingIndex].multiplier}, Period: ${settings[settingIndex].period}, MaxDrop: ${settings[settingIndex].maxDrop} => Result: ${resForSetting[resForSetting.length - 1].toFixed(2)}%`}
                                        </div>
                                    ))}
                                </div>
                            )) ?? "No results yet"}*/}

                            <div className="container mt-4">

                                {results.map((asset, assetIndex) => (
                                    <div key={assetIndex} className="mb-5">

                                        <h3 className="mt-4 mb-3">{asset.assetName}</h3>

                                        <div className="asset-table">
                                            <table className="table table-bordered">

                                                <thead className="table-header-row">
                                                <tr>
                                                    <th className="table-header-cell">Multiplier</th>
                                                    <th className="table-header-cell">Period</th>
                                                    <th className="table-header-cell">Max Drop</th>
                                                    <th className="table-header-cell">Result</th>
                                                </tr>
                                                </thead>

                                                <tbody className="asset-table-body">
                                                {asset.results.map((resForSetting, settingIndex) => {

                                                    const currentSetting = settings[settingIndex];
                                                    // Vždy si vezmeme základné nastavenie (prvý riadok) na porovnanie
                                                    const baseSetting = settings[0];

                                                    const lastResult = resForSetting[resForSetting.length - 1];
                                                    const formattedResult = lastResult ? `${lastResult.toFixed(2)}%` : 'N/A';

                                                    const highlightColor = "#B1974E"; // Farba zvýraznenia

                                                    // --- LOGIKA ZVÝRAZNENIA (PRIAMO TU) ---
                                                    // Zistíme, ktorý parameter sa líši od baseSetting.
                                                    // Priorita (else if) zabezpečí, že sa zvýrazní len jedna bunka,
                                                    // presne ako v tvojej pôvodnej funkcii.

                                                    let highlightType = null; // null, 'multiplier', 'period', alebo 'maxDrop'

                                                    if (settingIndex > 0) { // Prvý riadok (index 0) nezvýrazňujeme
                                                        if (currentSetting.multiplier !== baseSetting.multiplier) {
                                                            highlightType = 'multiplier';
                                                        } else if (currentSetting.period !== baseSetting.period) {
                                                            highlightType = 'period';
                                                        } else if (currentSetting.maxDrop !== baseSetting.maxDrop) {
                                                            highlightType = 'maxDrop';
                                                        }
                                                    }
                                                    // ---------------------------------------

                                                    return (
                                                        <tr key={settingIndex} className="table-row">
                                                            {/* Multiplier */}
                                                            <td
                                                                className="table-cell"
                                                                style={{
                                                                    backgroundColor: highlightType === 'multiplier' ? highlightColor : '#211F1B'
                                                                }}
                                                            >
                                                                {currentSetting.multiplier}
                                                            </td>

                                                            {/* Period */}
                                                            <td
                                                                className="table-cell"
                                                                style={{
                                                                    backgroundColor: highlightType === 'period' ? highlightColor : '#211F1B'
                                                                }}
                                                            >
                                                                {currentSetting.period}
                                                            </td>

                                                            {/* Max Drop */}
                                                            <td
                                                                className="table-cell"
                                                                style={{
                                                                    backgroundColor: highlightType === 'maxDrop' ? highlightColor : '#211F1B'
                                                                }}
                                                            >
                                                                {currentSetting.maxDrop}
                                                            </td>

                                                            <td className="table-cell fw-bold" style={{color: "#B1974E"}}>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}