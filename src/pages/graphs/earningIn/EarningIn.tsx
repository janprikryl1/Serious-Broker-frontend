import {FC, useState} from "react";
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {Day} from "./Day.tsx";
import {useTranslation} from "react-i18next";

dayjs.extend(isBetweenPlugin);

type Props = {
    id: number;
}

type EarningInType = {
    asset_id: number;
    dim_year: number;
    dim_week_day: number;
    dim_hour: number;
    dim_minute: number;
    amount: number;
    num_of_trades: number;
    close_eur: number;
    amount_eur: number;
    profit: number;
}


export const EarningIn:FC<Props> = ({id}) => {
    console.log(id);
    const {t} = useTranslation();
    const [graphData, setGraphData] = useState<EarningInType[]>();
    const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
    
   /* useEffect(() => {
        const getGraphAssetBuyData = async (period: ChartAssetBuyEnum) => {
            const response = await getAssetBuys(id, period);
            console.log(response);
            if (response) {
                setGraphData(response.data);
            }
        }
        getGraphAssetBuyData(ChartAssetBuyEnum.Week);
    }, [id]);*/
    
    const handleChange = (value: Dayjs) => {
        setValue(value);
        console.log(value.get("date"));
    };
    
    return (
            <div className="container padding-top padding-bottom">
                <div className="cta__wrapper">
                    <div className="cta__newsletter d-flex justify-content-center">
                        <div
                            className="cta__newsletter-inner text-center"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div>
                                <p>Kdybych začal investovat v nějakém bodě</p>
                                <div
                                    className="cta-form form-subscribe cta-form__inner d-sm-flex align-items-center justify-content-center">
                                    <input
                                        type="email"
                                        className="form-control form-control--style2 mb-3 mb-sm-0"
                                        placeholder="Počáteční invesice"
                                        value={0}
                                        onChange={(e) => console.log(e.target.value)}
                                    />
                                    <button
                                        className="trk-btn trk-btn--large trk-btn--secondary2"
                                        onClick={() => console.log("Submit")}
                                        style={{paddingLeft: "20px"}}
                                    >
                                        {t("Count")}
                                    </button>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        value={value}
                                        onChange={handleChange}
                                        showDaysOutsideCurrentMonth
                                        displayWeekNumber
                                        slots={{day: Day}}
                                        slotProps={{
                                            day: (ownerState) =>
                                                ({
                                                    selectedDay: value,
                                                    hoveredDay,
                                                    onPointerEnter: () => setHoveredDay(ownerState.day),
                                                    onPointerLeave: () => setHoveredDay(null),
                                                }),
                                        }}
                                    />
                                </LocalizationProvider>
                                <p>Ve vybraný týden: </p>
                                <p>Za celou dobu: </p>
                                
                                {graphData ? graphData.map((item, index) => (
                                    <>
                                        <p key={index}>{item.profit}</p>
                                    </>
                                )) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};