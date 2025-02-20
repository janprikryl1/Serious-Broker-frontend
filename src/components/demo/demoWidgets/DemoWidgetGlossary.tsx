import {FC, useEffect, useState} from "react";
import {GlossaryItemOverview} from "../../reusable/GlossaryItemOverview.tsx";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import Skeleton from "react-loading-skeleton";
import {GlossaryType} from "../../../utils/types/GlossaryType.ts";
import {getGlossaryByName} from "../../../utils/api/glossaryService.ts";

type Props = {
    title: string;
}

export const DemoWidgetGlossary:FC<Props> = ({title}) => {
    const {t} = useTranslation();
    const [glossaryData, setGlossaryData] = useState<GlossaryType>();

    useEffect(() => {
        const getGlossary = async () => {
            try {
                const response = await getGlossaryByName(title);
                setGlossaryData(response.data);
            } catch (exception) {
                console.error(exception);
                Swal.fire({
                    icon: "error",
                    title: t("Loading failed"),
                    text: t("Please try again later"),
                });
                console.error("Error fetching glossary:", exception);
            }
        }
        getGlossary();
    }, [title]);
    
    return (
        <div className="d-flex justify-content-center align-items-stretch flex-wrap">
            <div className="p-3 w-100">
                {glossaryData ? <GlossaryItemOverview data={glossaryData} /> : <Skeleton height={50} width={200} />}
            </div>
        </div>
    )
}