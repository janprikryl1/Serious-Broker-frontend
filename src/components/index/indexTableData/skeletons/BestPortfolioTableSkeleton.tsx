import {FC} from "react";
import Skeleton from "react-loading-skeleton";
import {useMediaQuery} from "@mui/material";

export const BestPortfolioTableSkeleton:FC = () => {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index}>
                    {!isMobile && (
                        <th>
                            <Skeleton width={30} height={20} />
                        </th>
                    )}
                    <td>
                        <Skeleton width={100} height={20} />
                    </td>
                    <td>
                        <Skeleton width={150} height={20} />
                    </td>
                    <td>
                        <Skeleton width={50} height={20} />
                    </td>
                    <td>
                        <Skeleton width={100} height={50} />
                    </td>
                </tr>
            ))}
        </>
    )
}