import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CryptoCurrencyType } from "../../utils/types/CryptoCurrencyType.ts";
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { useThemeContext } from "../../utils/providers/ThemeProvider.tsx";
import {
    cryptoCurrencyUpdate,
    deleteCryptocurrency,
    getAllCryptocurrencies
} from "../../api/adminCryptocurrencyService.ts";
import {CryptoCurrencyTableInput} from "../../components/modules/admin/cryptoCurrencyManagement/CryptoCurrencyTableInput.tsx";
import {CryptoCurrencyFileUpload} from "../../components/modules/admin/cryptoCurrencyManagement/CryptoCurrencyFileUpload.tsx";
import {CryptoCurrencyIconLink} from "../../components/modules/admin/cryptoCurrencyManagement/CryptoCurrencyIconLink.tsx";
import Swal from "sweetalert2";
import {AdminTableFilter} from "../../components/modules/reusable/AdminTableFilter.tsx";
import {AddCryptoCurrency} from "../../components/modules/admin/cryptoCurrencyManagement/AddCryptoCurrency.tsx";

export const CoinSettings: FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrencyType[]>([]);
    const [editModeRows, setEditModeRows] = useState<{ [key: number]: boolean }>({});
    const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File | null }>({});
    const [filteredCoins, setFilteredCoins] = useState<CryptoCurrencyType[]>();

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllCryptocurrencies();
                if (!result) return;
                setCryptocurrencies(result.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const handleFileChange = (id: number, file: File | null) => {
        setSelectedFiles((prevFiles) => ({
            ...prevFiles,
            [id]: file
        }));
    };

    const handleTextChange = (id: number, value: string, field: 'name' | 'symbol') => {
        setCryptocurrencies((prevCryptocurrencies) => prevCryptocurrencies.map((cryptocurrency) => {
            if (cryptocurrency.id === id) {
                return {
                    ...cryptocurrency,
                    [field]: value
                };
            }
            return cryptocurrency;
        }));
    };

    const handleSubmit = async (id: number) => {
        const cryptocurrency = cryptocurrencies.find((crypto) => crypto.id === id);
        if (cryptocurrency) {
            const updateObject = {
                id: cryptocurrency.id,
                name: cryptocurrency.name,
                symbol: cryptocurrency.symbol,
                photo: selectedFiles[id],
            };
            try {
                const result = await cryptoCurrencyUpdate(updateObject);
                if (!result) throw ("Not sent");
                if (result.data.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: t("Updated"),
                        text: t("Coin detail updated"),
                    });
                } else if (result.data.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: t("Error"),
                        text: t(result.data.message),
                    });
                }
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: "error",
                    title: t("Updating failed"),
                    text: t("Please try again later"),
                });
            } 
        } else {
            console.error(`Cryptocurrency with ID ${id} not found`);
        }
    };
    
    const handleDelete = async (id: number) => {
        try {
            const response = await deleteCryptocurrency(id);
            if (response !== undefined && response.data.stauts === "success") {
                setCryptocurrencies((cryptocurrencies) => cryptocurrencies.filter(item => item.id !== id));
                setFilteredCoins(cryptocurrencies);
                Swal.fire({
                    icon: "success",
                    title: t("Coin deleted")
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Error while deleting cryptocurrency"),
            });
            console.error(error);
        }
    }
    
    const handleRowClick = (id: number) => {
        setEditModeRows((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

    const columns = [
        { field: 'id', headerName: "Id", flex: 1, editable: true },
        {
            field: 'name',
            headerName: t("Name"),
            flex: 1,
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ? 
                <CryptoCurrencyTableInput id={params.row.id} value={params.value} onChange={handleTextChange} field="name" /> : params.value,
        },
        {
            field: 'symbol',
            headerName: t("Symbol"),
            flex: 1,
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ?
                <CryptoCurrencyTableInput id={params.row.id} value={params.value} onChange={handleTextChange} field="symbol" /> : params.value,
        },
        {
            field: 'photo',
            headerName: t("Icon"),
            flex: 2,
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ? (
                    <CryptoCurrencyFileUpload handleFileChange={handleFileChange} handleSubmit={handleSubmit} rowId={params.row.id} handleDelete={handleDelete} />
                ) : <CryptoCurrencyIconLink link={params.value} />
        },
    ];

    return (
        <div className="service-details__item-inner">
            <h2>{t("Coins management")}</h2>
            <AddCryptoCurrency />
            <AdminTableFilter setFilteredCoins={setFilteredCoins} cryptocurrencies={cryptocurrencies} columns={columns} />
            <Paper sx={{ backgroundColor: theme === 'dark' ? "#5a636c" : "#f5f8fb" }}>
                <DataGrid
                    rows={filteredCoins ?? cryptocurrencies}
                    columns={columns}
                    hideFooterSelectedRowCount
                    onRowClick={(params) => handleRowClick(params.row.id)}
                    sx={{ border: 0 }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                />
            </Paper>
        </div>
    );
};
