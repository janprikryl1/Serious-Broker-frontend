import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const CryptoCategoriesExampleSkeleton:FC = () => {
    return (
        <>
            {[...Array(3)].map((_, coinIndex) => (
                <tr key={coinIndex}>
                    <td><Skeleton width={30} height={20} /></td>
                    <td><Skeleton width={100} height={20} /></td>
                    <td><Skeleton width={50} height={20} /></td>
                    <td><Skeleton width={70} height={20} /></td>
                </tr>
            ))}
        </>
    );
};