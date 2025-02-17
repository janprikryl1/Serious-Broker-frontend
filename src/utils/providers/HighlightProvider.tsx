import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {HighlightType} from "../types/highlights/HighlightType.ts";
import {defaultHighlight} from "../constants";
import {createHighlight, getHighlightById, updateExistingHighlight} from "../../api/highlightsService.ts";
import Swal from "sweetalert2";

type Props = {
    children: ReactNode;
};

type HighlightProviderProps = {
    highlightData: HighlightType;
    saveChanges: (data: HighlightType) => void;
};

const HighlightContext = createContext<HighlightProviderProps | undefined>(undefined);

export const HighlightProvider = ({children}: Props) => {
    const {id} = useParams<{ id: string }>();
    const {t} = useTranslation();
    const [highlightData, setHighlightData] = useState<HighlightType>(defaultHighlight);

    useEffect(() => {
        if (!id) return;
        const fetchHighlight = async () => {
            try {
                const response = await getHighlightById(id);
                if (!response) return;
                setHighlightData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHighlight();
    }, [id]);

    const saveChanges = async (data: HighlightType) => {         
        const response = await (id ? updateExistingHighlight(id, data) : createHighlight(data));
        if(response?.status === 200) {
            Swal.fire({
                title: t("Successfully saved"),
                text: t("Highlight successfully update"),
                icon: "success",
            });
        } else {
            Swal.fire({
                title: t("Error"),
                text: t("Error while saving changes"),
                icon: "error",
            });
        }
    };

    const value: HighlightProviderProps = {highlightData, saveChanges};

    return (
        <HighlightContext.Provider value={value}>{children}</HighlightContext.Provider>
    );
};

export const useHighlightContext = () => {
    const context = useContext(HighlightContext);
    if (context === undefined) {
        throw new Error("useHighlightContext must be used within a HighlightProvider");
    }
    return context;
};
