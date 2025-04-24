import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "../../reusable/Button.tsx";
import {AddCryptoCurrencyForm} from "./AddCryptoCurrencyForm.tsx";

export const AddCryptoCurrency:FC = () => {
    const {t} = useTranslation();
    const [showForm, setShowForm] = useState(false);
    
    return (
        <div className="mb-3">
            {!showForm ? (
                <Button onClick={() => setShowForm(!showForm)}>
                    {t("Add new coin")}
                </Button>
            ) : (
                <AddCryptoCurrencyForm />
            )}
        </div>
    )
}