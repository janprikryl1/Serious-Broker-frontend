import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const CryptoCurrenciesSkeleton:FC = () => {
    return (
        <div style={{ marginTop: 30 }}>
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} width={400} height={20} style={{ marginBottom: 10 }} />
            ))}
        </div>
    );
};