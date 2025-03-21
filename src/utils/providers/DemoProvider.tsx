import {createContext, ReactNode, useContext, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {DemoType} from "../types/demos/demoType.ts";
import {defaultNewDemo} from "../constants";
import {getDemoById, saveDemo} from "../api/demosService.ts";
import {CustomSwal} from "../functions/customSwal.ts";

type Props = {
    children: ReactNode;
};

type DemoProviderProps = {
    demo: DemoType;
    updateDemo: (updates: Partial<DemoType>) => void;
    uploadDemo: () => Promise<void>;
    refreshDemo: () => Promise<void>;
};

const DemoContext = createContext<DemoProviderProps | undefined>(undefined);

export const DemoProvider = ({children}: Props) => {
    const {id} = useParams<{ id: string }>();
    const {t} = useTranslation();
    const [demo, setDemo] = useState<DemoType>(defaultNewDemo);

    const updateDemo = (updates: Partial<DemoType>) => {
        setDemo((prevDemo) => ({ ...prevDemo, ...updates }));
    };
    
    const refreshDemo = async () => {
        if (!id) return;
        try {
            const response = await getDemoById(id);    
            if (response.status === 200) {
                setDemo(response.data);
            }
        } catch (error) {
            console.error("Failed to load demo:", error);
        }
    };

    const uploadDemo = async () => {
        if (!demo) return;
        try {
            await saveDemo(demo);
            CustomSwal.fire({
                title: t("Successfully saved"),
                text: t("Demo successfully saved"),
                icon: "success",
            });
        } catch (error) {
            console.error("Failed to save demo:", error);
        }
    };

    useEffect(() => {
        refreshDemo();
    }, [id]);

    const value: DemoProviderProps = {
        demo,
        updateDemo,
        uploadDemo,
        refreshDemo,
    };

    return (
        <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
    );
};

export const useDemoContext = () => {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error("useDemoContext must be used within a DemoProvider");
    }
    return context;
};
