import { FC } from "react";
import PotentionalForHighReturns from "../../utils/icons/index/potential_for_high_returns.svg";
import ProtectionAgainstInflation from "../../utils/icons/index/protection_against_inflation.svg";
import UsersHaveFullControl from "../../utils/icons/index/users_have_full_controll.svg";

export const WhyToInvestInCryptocurrencies: FC = () => {
    return (
        <div className="container pt-5 pb-5">
            <h2 className="pb-3 text-center">Why to Invest in Cryptocurrencies</h2>
            <div className="d-flex flex-wrap justify-content-center gap-5">
                <div style={{ maxWidth: "280px", textAlign: "left" }}>
                    <img
                        src={PotentionalForHighReturns}
                        alt="Potential for High Returns"
                        style={{ transform: "scale(0.5)", transformOrigin: "center center"}}
                    />
                    <p className="step-title">Potential for High Returns</p>
                    <p>Their popularity is growing rapidly, and some cryptocurrencies have a limited supply.</p>
                </div>
                <div style={{ maxWidth: "280px", textAlign: "left" }}>
                    <img
                        src={ProtectionAgainstInflation}
                        alt="Protection against inflation"
                        style={{ transform: "scale(0.5)", transformOrigin: "center center"}}
                    />
                    <p className="step-title">Protection against inflation</p>
                    <p>Limited supply of coins, which is not influenced by decisions made by central banks or governments.</p>
                </div>
                <div style={{ maxWidth: "280px", textAlign: "left" }}>
                    <img
                        src={UsersHaveFullControl}
                        alt="Users Have Full Control"
                        style={{ transform: "scale(0.5)", transformOrigin: "center center"}}
                    />
                    <p className="step-title">Users Have Full Control</p>
                    <p>Decentralization in cryptocurrencies ensures that no central authority can interfere with or restrict your transactions.</p>
                </div>
            </div>
        </div>
    );
};
