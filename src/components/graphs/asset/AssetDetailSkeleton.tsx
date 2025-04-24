import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const AssetDetailSkeleton:FC = () => {
    return (
        <div className="container padding-bottom px-5">
            <div className="row">
                {Array.from({length: 8}, (_, i) => (
                    <div className="col-sm-3 mb-2" key={i}>  
                    <Skeleton height={50} width={250}/>
                    </div>
                ))}
            </div>
            <Skeleton height={150} width={350}/>
        </div>
    );
};