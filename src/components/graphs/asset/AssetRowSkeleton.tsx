import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Nezabudnite na CSS import, ak ho nemáte v hlavnom App.tsx

export const AssetRowSkeleton: FC = () => {
  return (
    <div className="table-row d-flex py-2 align-items-start">

      {/* Sloupec: Název */}
      <div className="col-3 pe-3">
        <Skeleton width="90%" />
      </div>

      {/* Sloupec: Label */}
      <div className="col-3 pe-3">
        <Skeleton width="90%" />
      </div>

      {/* Sloupec: Vytvoř. */}
      <div className="col-1 pe-3">
        <Skeleton width="80%" />
        {/*<Skeleton width="70%" />*/}
      </div>

      {/* Sloupec: Měna */}
      <div className="col-1 pe-3">
        <Skeleton width="80%" />
      </div>

      {/* Sloupec: Zastoupené mince */}
      <div className="col-1 pe-3">
        <Skeleton width="80%" />
      </div>

      {/* Sloupec: Změna za den */}
      <div className="col-1 pe-3">
        <Skeleton width="80%" />
      </div>

      {/* Sloupec: K datu */}
      <div className="col-1 pe-3">
        <Skeleton width="80%" />
      </div>

      {/* Sloupec: Ve watchlistu */}
      <div className="col-1 text-center d-flex justify-content-center align-items-center">
        <Skeleton width={20} height={20} />
      </div>
    </div>
  );
};