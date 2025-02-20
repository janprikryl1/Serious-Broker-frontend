import {Dispatch, FC, SetStateAction, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {BinanceIndexType} from "../../../utils/types/graphs/BinanceIndexType.ts";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

type Props = {
    binanceIndexes: BinanceIndexType[];
    setFilteredIndexes: Dispatch<SetStateAction<BinanceIndexType[]>>
    columns: {field: string; headerName: string; flex: number; editable: boolean; renderCell?: undefined }[] | { field: string; headerName: string; flex: number; }[];
}

export const BinanceIndexTableFilter:FC<Props> = ({binanceIndexes, setFilteredIndexes, columns}) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState<string>('id');

    const handleSearch = () => {
        const results = binanceIndexes.filter((binanceIndex) =>
            binanceIndex[searchColumn as keyof BinanceIndexType]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredIndexes(results);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilteredIndexes(binanceIndexes);
    };

    return (
        <InputGroup className="mb-3 mt-3">
            <InputGroup.Text id="inputGroup-sizing-sm">{t("Column")}</InputGroup.Text>
            <Form.Select
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
                aria-label={t("Search Column")}
            >
                {columns.map((column) => (
                    <option key={column.field} value={column.field}>
                        {column.headerName}
                    </option>
                ))}
            </Form.Select>
            <InputGroup.Text id="inputGroup-sizing-sm">{t("Value")}</InputGroup.Text>
            <Form.Control
                type="text"
                placeholder={t("Search term...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>
                {t("Search")}
            </Button>
            <Button color={ButtonColor.red} onClick={handleClearFilters}>
                {t("Clear filters")}
            </Button>
        </InputGroup>
    )
}