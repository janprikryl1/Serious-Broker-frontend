import {FC} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";
import {BinanceIndexTableFilter} from "../../components/admin/binanceIndexAbout/BinanceIndexAboutFilter.tsx";
import {useAdminBinanceIndexAbout} from "../../utils/hooks/admin/useAdminBinanceIndexAbout.tsx";

export const AdminBinanceIndexAbout: FC = () => {
    const {t} = useTranslation();
    const {
        setFilteredIndexes,
        binanceIndexes,
        columns,
        filteredIndexes,
        handleRowClick
    } = useAdminBinanceIndexAbout();

    return (
        <div className="service-details__item-inner">
            <h2 className="admin-section-title">{t("Binance indexes management")}</h2>
            <BinanceIndexTableFilter
                setFilteredIndexes={setFilteredIndexes}
                binanceIndexes={binanceIndexes}
                columns={columns}
            />
            <DataGrid
                rows={filteredIndexes}
                columns={columns}
                hideFooterSelectedRowCount
                onRowClick={(params) => handleRowClick(params.row.id)}
                sx={{border: 0, color: "#fff"}}
                pageSizeOptions={[10, 20, 50, 100]}
                initialState={{
                    pagination: {paginationModel: {pageSize: 10}}
                }}
            />
        </div>
    );
};