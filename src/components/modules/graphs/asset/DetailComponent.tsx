import { FC, useEffect, useRef, useState } from "react";
import { ColorType, createChart, Time, ISeriesApi } from "lightweight-charts";
import { Tooltip } from "./Tooltip";
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
};

export const DetailComponent: FC<ChartComponentProps> = ({
                                                             data,
                                                             backgroundColor = 'white',
                                                             lineColor = '#dd9f3a',
                                                             textColor = 'black',
                                                             areaTopColor = '#dd9f3a',
                                                             areaBottomColor = 'rgb(236,196,132)',
                                                             width = 500,
                                                             height = 300,
                                                         }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<TooltipDataType | null>(null);

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
            timeScale: {
                timeVisible: false,
                secondsVisible: false,
            },
        });
        chart.timeScale().fitContent();

        const formattedData = data.map((dataPoint) => ({
            time: Math.floor(Date.parse(dataPoint.datetime) / 1000) as Time,
            value: Number(dataPoint.close_eur),
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
                const dateStr = new Date((param.time as number) * 1000).toLocaleString().split('T')[0];
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

        return () => {
            chart.remove();
        };
    }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

    return (
        <>
            <p>Details</p>
            <div style={{ position: 'relative' }} ref={chartContainerRef}>
                <Tooltip tooltip={tooltip} lineColor={lineColor}></Tooltip>
            </div>
        </>
    );
};
