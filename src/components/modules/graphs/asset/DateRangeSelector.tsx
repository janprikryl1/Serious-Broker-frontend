import { FC } from "react";
import { Form } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

type Props = {
    startDate: string;
    setStartDate: (value: string) => void;
    endDate: string;
    setEndDate: (value: string) => void;
};

export const DateRangeSelector: FC<Props> = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const {t} = useTranslation();
    const today = new Date().toISOString().split("T")[0];

    return (
        <>
            <div className="col-auto d-flex align-items-center">
                <Typography variant="h6" className="me-2">
                    {t("Season")}
                </Typography>
                <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-auto d-flex align-items-center">
                <Typography variant="h6" className="me-3">
                    -
                </Typography>
                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} max={today} />
            </div>
        </>
    );
}
