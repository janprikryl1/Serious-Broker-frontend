import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useMyPortfolioContext} from "../../../../../utils/providers/MyPortfolioProvider.tsx";


export const MyPortfolioDetails:FC = () => {
    const {t} = useTranslation();
    const {name, setName, description, setDescription} = useMyPortfolioContext();
    
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
        </>
    )
}