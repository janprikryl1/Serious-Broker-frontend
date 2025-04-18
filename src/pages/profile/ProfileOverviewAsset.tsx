import Skeleton from "react-loading-skeleton";
import {FC} from "react";

export const ProfileOverviewAsset:FC = () => {
    return (
        Array.from(Array(3).keys()).map((_, index) => (
            <div className="col-sm" key={index}>
                <Skeleton height={150} width={350} style={{marginBottom: '10px'}}/>
            </div>
        ))
    );
}