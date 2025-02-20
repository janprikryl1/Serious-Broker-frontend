import {Dispatch, FC, SetStateAction, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {CryptoCurrencyType} from "../../utils/types/CryptoCurrencyType.ts";
import {Button, ButtonColor} from "./Button.tsx";

type Props = {
    cryptocurrencies: CryptoCurrencyType[];
    setFilteredCoins: Dispatch<SetStateAction<CryptoCurrencyType[] | undefined>>
    columns: {field: string; headerName: string; flex: number; editable: boolean; renderCell?: undefined }[] | { field: string; headerName: string; flex: number; }[];
}


export const AdminTableFilter:FC<Props> = ({cryptocurrencies, setFilteredCoins, columns}) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState<string>('email');

    const handleSearch = () => {
        const results = cryptocurrencies.filter((coin) =>
            coin[searchColumn as keyof CryptoCurrencyType]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCoins(results);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilteredCoins(cryptocurrencies);
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