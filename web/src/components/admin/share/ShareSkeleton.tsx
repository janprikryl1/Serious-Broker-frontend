import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const ShareSkeleton:FC = () => {
    return (
        <div className="padding-top padding-bottom">
            <div className="blog__wrapper">
              <Skeleton width={100} height={30} className="mb-3"/>
              <Skeleton width={600} height={40}/>
                <div className="row mt-5">
                {Array.from({length: 6}, (_, i) => (
                    <div key={i} className="col-sm mb-3">
                        <Skeleton width={300} height={100}/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};