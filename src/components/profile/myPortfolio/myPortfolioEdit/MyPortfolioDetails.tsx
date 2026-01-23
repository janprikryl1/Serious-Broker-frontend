import {FC, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useMyPortfolioContext} from "../../../../utils/providers/MyPortfolioProvider.tsx";

export const MyPortfolioDetails:FC = () => {
    const {t} = useTranslation();
    const {name, setName, description, setDescription, investedAmount, startInvest, setInvestedAmount, setStartInvest} = useMyPortfolioContext();

    const { maxDate, minDate } = useMemo(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const twoYearsAgo = new Date(today);
        twoYearsAgo.setFullYear(today.getFullYear() - 2);

        return {
            maxDate: today.toISOString().split('T')[0],
            minDate: twoYearsAgo.toISOString().split('T')[0]
        };
    }, []);

    return (
        <>
            <div className="mb-3">
                <label htmlFor="portfolioName" className="form-label">
                    {t("Portfolio Name")}
                </label>
                <input
                    type="text"
                    id="portfolioName"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="portfolioDescription" className="form-label">
                    {t("Portfolio Description")}
                </label>
                <input
                    type="text"
                    id="portfolioDescription"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="portfolioInvestedAmount" className="form-label">
                    {t("Invested amount")} (€)
                </label>
                <input
                    type="number"
                    min={0}
                    id="portfolioInvestedAmount"
                    className="form-control"
                    value={investedAmount}
                    onChange={(e) => setInvestedAmount(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="portfolioStartInvest" className="form-label">
                    {t("Date of starting investing")}
                </label>
                <input
                    type="date"
                    max={maxDate}
                    min={minDate}
                    id="portfolioStartInvest"
                    className="form-control"
                    value={startInvest}
                    onChange={(e) => setStartInvest(e.target.value)}
                />
            </div>
        </>
    )
}