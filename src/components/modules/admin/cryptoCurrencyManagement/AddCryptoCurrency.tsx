import {ChangeEvent, FC, FormEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {CryptoCurrencyNewType} from "../../../../utils/types/CryptoCurrencyType.ts";
import {CryptoCurrencyInput} from "./CryptoCurrencyInput.tsx";
import { cryptoCurrencyAdd } from "../../../../api/adminCryptocurrencyService.ts";
import Swal from "sweetalert2";
import {defaultNewCurrency} from "../../../../utils/constants";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {Button} from "../../../Button.tsx";

export const AddCryptoCurrency:FC = () => {
    const {t} = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [newCryptoCurrency, setNewCryptoCurrency] = useState<CryptoCurrencyNewType>(defaultNewCurrency);        
    
    const handleSetCryptoCurrency = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCryptoCurrency({...newCryptoCurrency, [e.target.name]: e.target.value});
    }

    const handleFileChange = (file: File | null) => {
        setNewCryptoCurrency((prevData) => ({
            ...prevData,
            photo: file
        }));
    };
    
    const handleAddCryptoCurrency = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await cryptoCurrencyAdd(newCryptoCurrency);
            if (!response) return;
            if (response.data.status === "success") {
                Swal.fire({
                    icon: "success", title: t("Coin created"),
                });
                setNewCryptoCurrency(defaultNewCurrency);
            } else if (response.data.status === "error") {
                Swal.fire({
                    icon: "error", title: t("Error"), text: t(response.data.message),
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error", title: t("Error"), text: t("Failed to add cryptocurrency"),
            });
        }
    }
    
    return (
        <div className="padding-bottom">
            {!showForm ? (
                <Button onClick={() => setShowForm(!showForm)}>
                    {t("Add new coin")}
                </Button>
            ) : (
        <form onSubmit={handleAddCryptoCurrency}>
            <h4 className="card-title">{t("Add new coin")}</h4>
            <br/>
                <CryptoCurrencyInput
                    name="name"
                    value={newCryptoCurrency?.name ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Name")}
                />
                <CryptoCurrencyInput
                    name="symbol"
                    value={newCryptoCurrency?.symbol ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Symbol")}
                />
                <CryptoCurrencyInput
                    name="price"
                    value={newCryptoCurrency?.price ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Price")}
                    type="number"
                />
                <CryptoCurrencyInput
                    name="marketcap"
                    value={newCryptoCurrency?.marketcap ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Market Cap")}
                />
                <CryptoCurrencyInput
                    name="category"
                    value={newCryptoCurrency?.category ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Category")}
                />
                <CryptoCurrencyInput
                    name="max_supply"
                    value={newCryptoCurrency?.max_supply ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Max Supply")}
                    type="number"
                />
                <CryptoCurrencyInput
                    name="circulating_supply"
                    value={newCryptoCurrency?.circulating_supply ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Circulating Supply")}
                />
                <CryptoCurrencyInput
                    name="website"
                    value={newCryptoCurrency?.website ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Website")}
                />
                <CryptoCurrencyInput
                    name="whitepaper"
                    value={newCryptoCurrency?.whitepaper ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Whitepaper")}
                />
                <CryptoCurrencyInput
                    name="reddit"
                    value={newCryptoCurrency?.reddit ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Reddit")}
                />
                <CryptoCurrencyInput
                    name="twitter"
                    value={newCryptoCurrency?.twitter ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Twitter")}
                />
                <CryptoCurrencyInput
                    name="telegram"
                    value={newCryptoCurrency?.telegram ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Telegram")}
                />
                <CryptoCurrencyInput
                    name="cmc_rank"
                    value={newCryptoCurrency?.cmc_rank ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("CMC Rank")}
                    type="number"
                />
                <CryptoCurrencyInput
                    name="date"
                    value={newCryptoCurrency?.date ?? ""}
                    onChange={handleSetCryptoCurrency}
                    placeholder={t("Date")}
                    type="date"
                />
                <InputGroup className="mb-3">
                    <InputGroup.Text>Icon</InputGroup.Text>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange((e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files![0] : null)}
                    />
                </InputGroup>
                <div className="col-md-12">
                    <div className="col-md-12">
                        <Button type="submit" className="btn btn-warning">
                            {t("Add Cryptocurrency")}
                        </Button>
                    </div>
                </div>
        </form>
            )}
        </div>
    )
}