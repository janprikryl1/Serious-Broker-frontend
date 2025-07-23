import { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const AssetRowSkeleton: FC = () => {
    return (
        <div className="table-row d-flex border-top py-2 align-items-start">

            {/* Sloupec: Název */}
            <div className="col-2 pe-3">
                <Skeleton variant="text" width="85%" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width="60%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: Label */}
            <div className="col-2 pe-3">
                <Skeleton variant="text" width="70%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: Vytvoř. */}
            <div className="col-1 pe-3">
                <Skeleton variant="text" width="90%" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width="70%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: Měna */}
            <div className="col-1 pe-3">
                <Skeleton variant="text" width="55%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: Zastoupené mince */}
            <div className="col-3 pe-3">
                <Skeleton variant="text" width="100%" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width="80%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: Změna za den */}
            <div className="col-1 pe-3">
                <Skeleton variant="text" width="80%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: K datu */}
            <div className="col-1 pe-3">
                <Skeleton variant="text" width="90%" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width="70%" sx={{ fontSize: '1rem' }} />
            </div>

            {/* Sloupec: Ve watchlistu */}
            <div className="col-1 text-center">
                <Skeleton variant="rectangular" width={20} height={20} />
            </div>
        </div>
    );
};