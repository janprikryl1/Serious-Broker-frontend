import {useEffect, useState} from "react";
import {GridRenderCellParams} from "@mui/x-data-grid";
import Form from "react-bootstrap/Form";
import {FaRegSave} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {BinanceIndexType} from "../../types/graphs/BinanceIndexType.ts";
import {getBinanceIndexAbouts, updateBinanceIndexAbout} from "../../api/binanceIndexAboutService.ts";
import {CustomSwal} from "../../functions/customSwal.ts";
import {Button} from "../../../components/reusable/Button.tsx";

export const useAdminBinanceIndexAbout = () => {
    const {t} = useTranslation();
    const [editModeRows, setEditModeRows] = useState<{ [key: number]: boolean }>({});
    const [binanceIndexes, setBinanceIndexes] = useState<BinanceIndexType[]>([]);
    const [filteredIndexes, setFilteredIndexes] = useState<BinanceIndexType[]>([]);  // Initialize as empty array instead of undefined

    useEffect(() => {
        const fetchBinanceIndexes = async () => {
            try {
                const response = await getBinanceIndexAbouts();
                if (!response) return;
                setBinanceIndexes(response.data);
                setFilteredIndexes(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBinanceIndexes();
    }, []);

    const handleUpload = async (id: number) => {
        const index = binanceIndexes.find(item => item.id === id);
        if (!index) return;

        try {
            const response = await updateBinanceIndexAbout(id, index.about);
            if (response?.status === 200) {
                setEditModeRows(prev => ({ ...prev, [id]: false }));
                CustomSwal.fire({
                    icon: "success",
                    title: t("Success"),
                    text: t("Successfully saved"),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextChange = (id: number, value: string) => {
        const updateData = (items: BinanceIndexType[]) =>
            items.map((item) =>
                item.id === id ? { ...item, about: value } : item
            );

        setBinanceIndexes(updateData);
        setFilteredIndexes(updateData);
    };

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
            renderCell: (params: GridRenderCellParams<{id: number}>) => params.value,
        },
        {
            field: 'label',
            headerName: t("Label"),
            flex: 1,
            headerClassName: 'background-gray',
            renderCell: (params: GridRenderCellParams<{id: number}>) => params.value,
        },
        {
            field: 'about',
            headerName: t("About"),
            flex: 2,
            headerClassName: 'background-gray',
            renderCell: (params: GridRenderCellParams<{id: number}>) => editModeRows[params.row.id] ?
                <Form.Group style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 5, height: 40 }}>
                    <Form.Control
                        style={{ marginTop: 5, height: 40 }}
                        value={params.value}
                        onChange={(e) => handleTextChange(params.row.id, e.target.value)}
                    />
                    <Button style={{marginTop: 5, height: 35}} onClick={() => handleUpload(params.row.id)}>
                        <FaRegSave />
                    </Button>
                </Form.Group> : params.value,
        },
    ];
    
    return {
        setFilteredIndexes,
        binanceIndexes,
        columns,
        filteredIndexes,
        handleRowClick
    }
}