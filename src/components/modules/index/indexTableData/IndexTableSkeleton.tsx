import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const IndexTableSkeleton: FC = () => {
    return (
        <div
            className="text-center d-flex flex-column align-items-center justify-content-center"
            style={{ marginTop: "350px" }}
        >
            <Skeleton width={500} height={50} style={{ marginBottom: "20px" }} />
            <Skeleton width={350} height={30} />
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={`button-${index}`}
                        width={80}
                        height={30}
                        style={{ borderRadius: "5px" }}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
                {Array.from({ length: 2 }).map((_, index) => (
                    <Skeleton
                        key={`big-button-${index}`}
                        width={200}
                        height={50}
                        style={{ borderRadius: "10px" }}
                    />
                ))}
            </div>

            {Array.from({ length: 2 }, (_, index) => (
                <div className="d-flex justify-content-center align-items-stretch flex-wrap mt-5" key={index}>
                    <div className="p-3">
                        <Skeleton width={500} height={50} className="mb-2" />
                        <Skeleton width={500} height={400} />
                    </div>
                    <div className="p-3">
                        <Skeleton width={500} height={50} className="mb-2" />
                        <Skeleton width={500} height={400} />
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-center align-items-stretch flex-wrap mt-5 mb-5">
                <div className="p-3 w-100 mb-5">
                    <Skeleton width={400} height={50} className="mb-2" />
                    <Skeleton width={400} height={250} />
                </div>
                <div className="p-3 w-100 mb-5">
                    <Skeleton width={600} height={50} className="mb-2" />
                    <Skeleton width={600} height={400} />
                </div>
            </div>
        </div>
    );
};
