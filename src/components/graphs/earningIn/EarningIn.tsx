import { FC, useState, useMemo } from "react";
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import 'dayjs/locale/cs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useTranslation } from "react-i18next";
import { csCZ } from "@mui/x-date-pickers/locales";
import {CandlestickData} from "../../../utils/types/asset/KlineData.ts";
import {graphColors} from "../../../utils/constants/qraphConstants.ts";

dayjs.extend(isBetweenPlugin);
dayjs.locale('cs');

type Props = {
    series: { data: CandlestickData[] }[] | undefined;
    startDate: string;
    endDate: string;
}

export const EarningIn: FC<Props> = ({ series, startDate, endDate }) => {
    const { t } = useTranslation();
    const [buyDate, setBuyDate] = useState<Dayjs | null>(dayjs(startDate));
    const [sellDate, setSellDate] = useState<Dayjs | null>(dayjs(endDate));
    const [initialInvestment, setInitialInvestment] = useState<number>(0);

    // Helper function to find the closest data point for a given date
    const findClosestData = (date: Dayjs | null): CandlestickData | undefined => {
        if (!series || !date) return undefined;
        const allData = series[0]?.data || [];
        return allData.reduce((closest, current) => {
            const currentDiff = Math.abs(dayjs(current.x).diff(date));
            const closestDiff = Math.abs(dayjs(closest.x).diff(date));
            return currentDiff < closestDiff ? current : closest;
        });
    };

    // Find buy and sell prices
    const buyData = useMemo(() => findClosestData(buyDate), [buyDate, series]);
    const sellData = useMemo(() => findClosestData(sellDate), [sellDate, series]);

    const calculateGain = () => {
        if (!buyData || !sellData || initialInvestment <= 0) return { gain: 0, percentage: 0 };

        const buyPrice = buyData.y[0]; // Open price for buy
        const sellPrice = sellData.y[3]; // Close price for sell

        const quantity = initialInvestment / buyPrice;
        const finalValue = quantity * sellPrice;

        const gain = finalValue - initialInvestment;
        const percentage = (gain / initialInvestment) * 100;

        return { gain, percentage };
    };

    const { gain, percentage } = calculateGain();

    const handleBuyDateChange = (value: Dayjs | null) => {
        if (value && (value.isSame(dayjs(startDate)) || value.isAfter(dayjs(startDate)))) {
            setBuyDate(value);
        }
    };

    const handleSellDateChange = (value: Dayjs | null) => {
        if (value && (value.isBefore(dayjs(endDate)) || value.isSame(dayjs(endDate)))) {
            setSellDate(value);
        }
    };

    return (
        <div className="padding-bottom padding-top asset-font" data-aos="fade-up" data-aos-duration="1000">
            <div className="row justify-content-center align-items-center mt-3">
                <h2 className="text-center">{t("If I started investing at some point")}</h2>
                <div
                    className="cta-form d-flex align-items-center justify-content-center gap-2 mt-5 mb-5 w-100"
                    style={{maxWidth: "300px"}}
                >
                    <p className="mb-0" style={{whiteSpace: "nowrap"}}>{t("Amount")}</p>
                    <input
                        type="number"
                        className="form-control form-control--style2 flex-grow-1"
                        style={{height: "40px"}}
                        placeholder={t("Initial investment") + " ($)"}
                        defaultValue={0}
                        min={0}
                        onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    />
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs" localeText={csCZ.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <div className="row g-3 justify-content-center mb-4">
                        <div className="col-12 col-md-6 mobile-margin">
                            <p className="text-bold">{t("Buy Date")}</p>
                            <DateCalendar
                                value={buyDate}
                                onChange={handleBuyDateChange}
                                minDate={dayjs(startDate)}
                                maxDate={dayjs(endDate)}
                                disableFuture={true}
                                disablePast={false}
                                showDaysOutsideCurrentMonth={false}
                                slotProps={graphColors}
                                sx={{
                                    color: "#ffca2d",
                                    "& .MuiPickersDay-root": { color: "#ffca2d" },
                                    "& .MuiDayCalendar-weekDayLabel": { color: "white" },
                                    "& .Mui-selected": { backgroundColor: "#ffca2d", color: "#000" },
                                    "& .MuiPickersCalendarHeader-label": { color: "white" },
                                    "& .MuiPickersArrowSwitcher-root": { color: "white" },
                                }}                          
                            />
                        </div>
                        <div className="col-12 col-md-6 mobile-margin">
                            <p className="text-bold">{t("Sell Date")}</p>
                            <DateCalendar
                                value={sellDate}
                                onChange={handleSellDateChange}
                                minDate={dayjs(startDate)}
                                maxDate={dayjs(endDate)}
                                disableFuture={true}
                                disablePast={false}
                                showDaysOutsideCurrentMonth={false}
                                slotProps={graphColors}
                                sx={{
                                    color: "#ffca2d",
                                    "& .MuiPickersDay-root": { color: "#ffca2d" },
                                    "& .MuiDayCalendar-weekDayLabel": { color: "white" },
                                    "& .Mui-selected": { backgroundColor: "#ffca2d", color: "#000" },
                                    "& .MuiPickersCalendarHeader-label": { color: "white" },
                                    "& .MuiPickersArrowSwitcher-root": { color: "white" },
                                }} 
                            />
                        </div>
                    </div>
                </LocalizationProvider>
                <h4 className="text-bold" style={{color: gain > 0 ? "green" : gain < 0 ? "red" : "gray", fontSize: "35px"}}>
                    {t("Gain: ")}{gain.toFixed(2)}$ ({percentage.toFixed(2)}%)
                </h4>
            </div>
        </div>
    );
};
