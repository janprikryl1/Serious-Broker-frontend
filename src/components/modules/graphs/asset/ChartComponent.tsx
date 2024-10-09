import { createChart, ColorType, Time, ISeriesApi } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { DetailComponent } from "./DetailComponent";
import Button from "react-bootstrap/Button";
import { Tooltip } from "./Tooltip";
import { getAssetBuysBetween } from "../../../../api/binanceIndexAssets";
import {useTranslation} from "react-i18next";
import {DataPointType} from "../../../../utils/types/asset/DataPointType.ts";
import {TooltipDataType} from "../../../../utils/types/asset/TooltipDataType.ts";


type ChartComponentProps = {
    data: DataPointType[];
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
    width?: number;
    height?: number;
    assetId?: number;
};

export const ChartComponent: React.FC<ChartComponentProps> = ({
                                                                  data,
                                                                  backgroundColor = 'white',
                                                                  lineColor = '#dd9f3a',
                                                                  textColor = 'black',
                                                                  areaTopColor = '#dd9f3a',
                                                                  areaBottomColor = 'rgb(218,197,162)',
                                                                  width = 500,
                                                                  height = 300,
                                                                  assetId
                                                              }) => {
    const { t } = useTranslation();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<TooltipDataType | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [detailsData, setDetailsData] = useState<DataPointType[] | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) {
            return;
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: width,
            height: height,
        });
        chart.timeScale().fitContent();

        const formattedData = data.map((dataPoint) => ({
            time: Date.parse(dataPoint.datetime) / 1000 as Time,
            value: Number(dataPoint.close_eur),  // Ensure number type
        }));

        const newSeries = chart.addAreaSeries({
            lineColor,
            topColor: areaTopColor,
            bottomColor: areaBottomColor,
        });

        newSeries.setData(formattedData);

        chart.subscribeCrosshairMove((param) => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > chartContainerRef.current!.clientWidth ||
                param.point.y < 0 ||
                param.point.y > chartContainerRef.current!.clientHeight
            ) {
                setTooltip(null);
            } else {
                const dateStr = new Date((param.time as number) * 1000).toISOString().split('T')[0];
                const data = param.seriesData.get(newSeries as ISeriesApi<'Area'>);
                const price = data !== undefined && "value" in data ? (data as { value: number }).value : 0;

                const coordinate = newSeries.priceToCoordinate(price);
                if (coordinate === null) {
                    return;
                }

                let shiftedCoordinate = param.point.x - 50;
                shiftedCoordinate = Math.max(
                    0,
                    Math.min(chartContainerRef.current!.clientWidth - 80, shiftedCoordinate)
                );

                const coordinateY =
                    coordinate - 80 - 15 > 0
                        ? coordinate - 80 - 15
                        : Math.max(
                            0,
                            Math.min(
                                chartContainerRef.current!.clientHeight - 80 - 15,
                                coordinate + 15
                            )
                        );

                setTooltip({
                    display: true,
                    top: coordinateY,
                    left: shiftedCoordinate,
                    price,
                    date: dateStr,
                });
            }
        });

        const debounce = (func: (...args: any[]) => void, timeout = 300) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            let timer: NodeJS.Timeout;
            return (...args: any[]) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func(...args);
                }, timeout);
            };
        };

        const handleTimeRangeChange = debounce(async (visibleTimeRange: { from: number; to: number }) => {
            if (visibleTimeRange) {
                const fromDate = new Date(visibleTimeRange.from * 1000);
                const toDate = new Date(visibleTimeRange.to * 1000);
                const oneMonth = 30 * 24 * 60 * 60 * 1000; // Approximate milliseconds in one month
                const isLessThanOrEqualToOneMonth = (toDate.getTime() - fromDate.getTime()) <= oneMonth;
                if (isLessThanOrEqualToOneMonth && assetId) {
                    try {
                        const newData: {data: {graph: DataPointType[]}} | undefined = await getAssetBuysBetween(assetId, fromDate.toISOString(), toDate.toISOString());
                        if (!newData) return;
                        setDetailsData(newData.data.graph as DataPointType[]);
                        setShowDetails(true);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }
        }, 1500);

        chart.timeScale().subscribeVisibleTimeRangeChange(handleTimeRangeChange);

        return () => {
            chart.remove();
        };
    }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, showDetails]);

    return (
        <>
            {showDetails && detailsData ? (
                <>
                    <DetailComponent data={detailsData} width={width} height={height}></DetailComponent>
                    <Button onClick={() => setShowDetails(false)}>{t("Back")}</Button>
                </>
            ) : (
                <div style={{ position: 'relative' }} ref={chartContainerRef}>
                    <Tooltip tooltip={tooltip} lineColor={lineColor}></Tooltip>
                </div>
            )}
        </>
    );
};
