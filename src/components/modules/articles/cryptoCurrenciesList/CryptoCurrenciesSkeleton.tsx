import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const CryptoCurrenciesSkeleton:FC = () => {
    return (
        <div style={{marginTop: 30}}>
            {Array.from({length: 3}).map((_, index) => (
                <div className="row" key={index}>
                    <div className="col-sm-2">
                        <Skeleton width={100} height={20} style={{marginBottom: 10}}/>
                    </div>
                    <div className="col-sm-4">
                        <Skeleton width={400} height={200} style={{marginBottom: 10}}/>
                    </div>
                </div>
            ))}
        </div>
    );
};