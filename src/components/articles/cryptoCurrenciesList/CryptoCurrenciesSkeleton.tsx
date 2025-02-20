import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const CryptoCurrenciesSkeleton: FC = () => {
    return (
        <div className="row" style={{ marginTop: 30 }}>
            {[...Array(5)].map((_, index) => (
                <div key={index} className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                        <Skeleton circle width={40} height={40} />
                        <div className="ms-3 flex-grow-1">
                            <Skeleton width={150} />
                            <Skeleton width={100} />
                        </div>
                        <div className="text-end">
                            <Skeleton width={80} />
                            <Skeleton width={60} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
