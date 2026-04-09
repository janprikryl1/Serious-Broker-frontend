import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CustomSwal } from "../../utils/functions/customSwal.ts";
import { getTableContent } from "../../utils/api/genericTableService.ts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { InputGroup, Form } from "react-bootstrap";
import { Button, ButtonColor } from "../../components/reusable/Button.tsx";

export const AdminGenericTableResults: FC = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [originalResults, setOriginalResults] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [searchColumn1, setSearchColumn1] = useState('');
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchColumn2, setSearchColumn2] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [filterCondition, setFilterCondition] = useState<'AND' | 'OR'>('AND');

    useEffect(() => {
        if (!id) return;
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await getTableContent(id);
                const rows = response.data;

                if (Array.isArray(rows) && rows.length > 0) {
                    const dynamicColumns: GridColDef[] = Object.keys(rows[0]).map((key) => ({
                        field: key,
                        headerName: t(key),
                        flex: 1,
                        headerClassName: "background-gray",
                    }));

                    if (!rows[0].hasOwnProperty("id")) {
                        rows.forEach((row, index) => (row.id = index + 1));
                    }

                    setColumns(dynamicColumns);
                    setOriginalResults(rows);
                    setResults(rows);

                    // Default column selections
                    setSearchColumn1(Object.keys(rows[0])[0]);
                    setSearchColumn2(Object.keys(rows[0])[1] || Object.keys(rows[0])[0]);
                }

            } catch (error) {
                console.error("Error fetching results:", error);
                CustomSwal.fire({
                    title: t('Error'),
                    text: t('Something went wrong!'),
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    const handleSearch = () => {
        const filtered = originalResults.filter((row) => {
            const val1 = row[searchColumn1]?.toString().toLowerCase() ?? '';
            const val2 = row[searchColumn2]?.toString().toLowerCase() ?? '';
            const match1 = val1.includes(searchTerm1.toLowerCase());
            const match2 = val2.includes(searchTerm2.toLowerCase());
            return filterCondition === 'AND' ? match1 && match2 : match1 || match2;
        });
        setResults(filtered);
    };

    const handleClearFilters = () => {
        setSearchTerm1('');
        setSearchTerm2('');
        setResults(originalResults);
    };

    return (
        <div>
            <h3 className="admin-section-title">{t("Generic table results")}</h3>
            {columns.length > 0 && (
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t("Column 1")}</InputGroup.Text>
                    <Form.Select value={searchColumn1} onChange={(e) => setSearchColumn1(e.target.value)}>
                        {columns.map((column) => (
                            <option key={column.field} value={column.field}>
                                {column.headerName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        type="text"
                        placeholder={t("Search term 1...")}
                        value={searchTerm1}
                        onChange={(e) => setSearchTerm1(e.target.value)}
                    />
                    <Form.Select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value as 'AND' | 'OR')}>
                        <option value="AND">{t("AND")}</option>
                        <option value="OR">{t("OR")}</option>
                    </Form.Select>
                    <InputGroup.Text>{t("Column 2")}</InputGroup.Text>
                    <Form.Select value={searchColumn2} onChange={(e) => setSearchColumn2(e.target.value)}>
                        {columns.map((column) => (
                            <option key={column.field} value={column.field}>
                                {column.headerName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        type="text"
                        placeholder={t("Search term 2...")}
                        value={searchTerm2}
                        onChange={(e) => setSearchTerm2(e.target.value)}
                    />
                    <Button color={ButtonColor.gold} onClick={handleSearch}>{t("Search")}</Button>
                    <Button color={ButtonColor.red} onClick={handleClearFilters}>{t("Clear filters")}</Button>
                </InputGroup>
            )}

            {results === undefined ? (
                <p>Loading...</p>
            ) : results.length === 0 ? (
                <p>{t("No results found")}</p>
            ) : (
                <DataGrid
                    rows={results}
                    columns={columns}
                    loading={loading}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    hideFooter
                    sx={{ border: 0, color: "#fff" }}
                />
            )}
        </div>
    );
};
