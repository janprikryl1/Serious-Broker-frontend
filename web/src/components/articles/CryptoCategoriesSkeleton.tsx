import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const CryptoCategoriesSkeleton: FC = () => {
    return (
        [...Array(5)].map((_, index) => (
            <div key={index} className="blog__writer" style={{ marginTop: 50 }}>
                <div className="blog__writer-designation">
                    <div>
                        <Skeleton width={120} height={20} />
                        <Skeleton width={60} height={20} style={{ marginLeft: 10 }} />
                    </div>
                </div>
            </div>
        ))
    );
};
