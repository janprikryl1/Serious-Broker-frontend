import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";
import {logURL} from "../../utils/constants";
import {cryptoCurrencyUpdate, deleteCryptocurrency, getAllCryptocurrencies} from "../../utils/api/adminCryptocurrencyService.ts";
import {CryptoCurrencyTableInput} from "../../components/admin/cryptoCurrencyManagement/CryptoCurrencyTableInput.tsx";
import {CryptoCurrencyFileUpload} from "../../components/admin/cryptoCurrencyManagement/CryptoCurrencyFileUpload.tsx";
import {CryptoCurrencyIconLink} from "../../components/admin/cryptoCurrencyManagement/CryptoCurrencyIconLink.tsx";
import {AddCryptoCurrency} from "../../components/admin/cryptoCurrencyManagement/AddCryptoCurrency.tsx";
import {Button} from "../../components/reusable/Button.tsx";
import {AdminTableFilter} from "../../components/reusable/AdminTableFilter.tsx";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {CryptoCurrencyType} from "../../utils/types/asset/CryptoCurrencyType.ts";

export const AdminCoinSettings: FC = () => {
    const { t } = useTranslation();
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

    const handleTextChange = (id: number, value: string, field: 'name' | 'symbol' | 'about') => {
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
                    CustomSwal.fire({
                        icon: "success",
                        title: t("Updated"),
                        text: t("Coin detail updated"),
                    });
                } else if (result.data.status === "error") {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Error"),
                        text: t(result.data.message),
                    });
                }
            } catch (e) {
                console.error(e);
                CustomSwal.fire({
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
                CustomSwal.fire({
                    icon: "success",
                    title: t("Coin deleted")
                });
            }
        } catch (error) {
            CustomSwal.fire({
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
        { field: 'id', headerName: "Id", flex: 1, editable: true, headerClassName: 'background-gray' },
        {
            field: 'name',
            headerName: t("Name"),
            flex: 1,
            headerClassName: 'background-gray',
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ? 
                <CryptoCurrencyTableInput id={params.row.id} value={params.value} onChange={handleTextChange} field="name" /> : params.value,
        },
        {
            field: 'symbol',
            headerName: t("Symbol"),
            flex: 1,
            headerClassName: 'background-gray',
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ?
                <CryptoCurrencyTableInput id={params.row.id} value={params.value} onChange={handleTextChange} field="symbol" /> : params.value,
        },
        {
            field: 'photo',
            headerName: t("Icon"),
            flex: 2,
            headerClassName: 'background-gray',
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ? (
                    <CryptoCurrencyFileUpload handleFileChange={handleFileChange} handleSubmit={handleSubmit} rowId={params.row.id} handleDelete={handleDelete} />
                ) : <CryptoCurrencyIconLink link={params.value} />
        },
    ];

    return (
        <div className="service-details__item-inner">
            <h2 className="admin-section-title">{t("Coins management")}</h2>
            <AddCryptoCurrency />
            <Button type="link" className="p-2" to={logURL}>{t("Save to log")}</Button>
            <AdminTableFilter setFilteredCoins={setFilteredCoins} cryptocurrencies={cryptocurrencies} columns={columns} />
            <DataGrid
                rows={filteredCoins ?? cryptocurrencies}
                columns={columns}
                hideFooterSelectedRowCount
                onRowClick={(params) => handleRowClick(params.row.id)}
                sx={{ border: 0, color:"#fff" }}
                pageSizeOptions={[10, 20, 50, 100]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } }
                }}
            />
        </div>
    );
};
