import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {routes} from "../../../utils/constants";
import {TitleHeader} from "../../../components/about/TitleHeader.tsx";
import {OutlineContainer} from "../../../components/reusable/OutlineContainer.tsx";
import {Button} from "../../../components/reusable/Button.tsx";

import {useInvestmentPlanContext} from "../../../utils/providers/InvestmentPlanProvider.tsx";
import {useNavigate} from "react-router-dom";
import {FiEdit3} from "react-icons/fi";

export const NewInvestmentPlanName: FC = () => {
  const {t} = useTranslation();

  const {name, setName, description, setDescription} = useInvestmentPlanContext();
  const navigate = useNavigate();

  return (
    <>
      <TitleHeader title={t("New Investment Plan")}/>
      <div className={"container"}>
        <OutlineContainer style={{margin: 0}}>
          <h3>{t("Name and Description")}</h3>
          <div className="d-flex flex-column align-items-start gap-3 mb-5">
                    <span className="gray-3-color-text mb-3">
                        {t("Set a name for your investment plan and a brief description to quickly identify it.")}
                    </span>

            <div style={{display: "flex", alignItems: "flex-end", width: "100%", marginBottom: "-15px"}}>
              <input
                type="text"
                className="form-control borderless"
                placeholder={t("Enter plan name...")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{fontSize: "24px", width: "50%"}}
              />
              <FiEdit3 style={{marginLeft: "15px"}} size={35} color={"var(--secondary-color)"}/>
            </div>
            <div className={"gray-2-color-text"} style={{marginTop: 0}}>{t("Name")}</div>
          </div>

          <div className={"gray-2-color-text mb-2"}>{t("Description")}</div>
          <div style={{width: "100%"}}>
                    <textarea
                      className="form-control outline-input"
                      placeholder={t("Enter a brief description (optional)...")}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      style={{textAlign: "start", width: "50%", resize: "none"}}
                    />
          </div>

          <div className={"d-flex justify-content-center mt-4"}>
            <Button
              className="mt-4"
              onClick={() => navigate(routes.profile.newInvestmentPlan)}
              disabled={!name.trim()}
            >
              {t("Continue")}
            </Button>
          </div>
        </OutlineContainer>
      </div>
    </>
  );
};