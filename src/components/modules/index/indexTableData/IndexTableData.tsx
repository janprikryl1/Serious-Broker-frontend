import {FC} from "react";
import {PopularCoins} from "./PopularCoins.tsx";
import {MostProfitableLastSelectedPeriod} from "./MostProfitableLastSelectedPeriod.tsx";
import {IndexDataProvider} from "../../../../utils/providers/IndexDataProvider.tsx";
import {IndexTableTitle} from "./IndexTableTitle.tsx";

export const IndexTableData: FC = () => {
    return (
        <IndexDataProvider>
            <div className="text-center d-flex flex-column align-items-center justify-content-center" style={{ marginTop: "250px" }}>
               <IndexTableTitle />
                <div className="row">
                    <div className="col-sm-6">
                        <MostProfitableLastSelectedPeriod />
                    </div>
                    <div className="col-sm-6">
                        <PopularCoins />
                    </div>
                    <div className="col-sm-6">
                                
                    </div>
                </div>
            </div>
        </IndexDataProvider>
    );
};
