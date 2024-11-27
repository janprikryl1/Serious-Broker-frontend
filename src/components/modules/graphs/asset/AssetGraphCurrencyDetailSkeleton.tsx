import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const AssetGraphCurrencyDetailSkeleton: FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="text-center">
                <Skeleton height={30} width={350} className="mb-3" />
                <Skeleton height={30} width={250} className="mb-3" />
                <Skeleton height={30} width={250} className="mb-3" />
                <Skeleton height={30} width={200} className="mb-3" />
                <Skeleton height={30} width={200} className="mb-3" />
                <Skeleton height={350} width={500} />
            </div>
        </div>
    );
};
