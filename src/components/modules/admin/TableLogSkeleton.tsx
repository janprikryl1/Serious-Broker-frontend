import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const TableLogSkeleton:FC = () => {
    return (
        <>
            <h4 className="card-title"><Skeleton width={150} /></h4>
            <p className="card-description"><Skeleton width={200} /></p>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th><Skeleton width={50} /></th>
                        <th><Skeleton width={100} /></th>
                        <th><Skeleton width={80} /></th>
                        <th><Skeleton width={150} /></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array(5).fill(0).map((_, index) => (
                        <tr key={index}>
                            <td><Skeleton width={30} /></td>
                            <td><Skeleton width={100} /></td>
                            <td><Skeleton width={80} /></td>
                            <td><Skeleton width={150} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};