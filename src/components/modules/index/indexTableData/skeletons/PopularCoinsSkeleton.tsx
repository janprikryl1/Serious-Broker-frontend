import Skeleton from "react-loading-skeleton";
import {FC} from "react";
import {useMediaQuery} from "@mui/material";

export const PopularCoinsSkeleton:FC = () => {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index}>
                    <td>
                        <Skeleton width={30} height={20} />
                    </td>
                    <td>
                        <Skeleton width={100} height={20} />
                    </td>
                    <td>
                        <Skeleton width={50} height={20} />
                    </td>
                    <td>
                        <Skeleton width={70} height={20} />
                    </td>
                    {!isMobile && index === 2 && (
                        <td rowSpan={2} className="text-center align-middle">
                            <Skeleton width={150} height={200} />
                        </td>
                    )}
                </tr>
            ))}
        </>
    );
}