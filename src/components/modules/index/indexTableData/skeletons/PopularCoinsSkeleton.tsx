import Skeleton from "react-loading-skeleton";
import {FC} from "react";

export const PopularCoinsSkeleton:FC = () => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index}>
                    <td>
                        <Skeleton width={30} height={20}/>
                    </td>
                    <td>
                        <Skeleton width={100} height={20}/>
                    </td>
                    <td>
                        <Skeleton width={50} height={20}/>
                    </td>
                    <td>
                        <Skeleton width={70} height={20}/>
                    </td>
                    <td>
                        <Skeleton width={70} height={20}/>
                    </td>
                </tr>
            ))}
        </>
    );
}