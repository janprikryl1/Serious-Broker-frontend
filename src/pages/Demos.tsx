import {FC, useEffect, useState} from "react";
import {DemoType} from "../utils/types/demos/demoType.ts";
import {getAllDemos} from "../api/demosService.ts";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {DemoLinkCard} from "../components/modules/demo/DemoLinkCard.tsx";

export const Demos:FC = () => {
    const {t} = useTranslation();
    const [demos, setDemos] = useState<DemoType[]>([]);
    
    useEffect(() => {
        const fetchDemos = async () => {
            try {
                const response = await getAllDemos();
                setDemos(response.data);
            } catch (error) {
                Swal.fire({
                    title: t('Error'),
                    text: t('Something went wrong!'),
                    icon: 'error',
                });
                console.error(error);
            }
        }
        fetchDemos();
    }, []);
    
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                {demos.map((demo) => (
                    <DemoLinkCard key={demo.id} title={demo.name} id={demo.id!}/>
                ))}
            </div>
        </div>
    );
};