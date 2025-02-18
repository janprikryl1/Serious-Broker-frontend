import {FC, useEffect, useState} from "react";
import {HighlightType} from "../../../utils/types/highlights/HighlightType.ts";
import {IoIosInformationCircleOutline} from "react-icons/io";
import {useTranslation} from "react-i18next";
import {getRandomHighlight} from "../../../utils/api/highlightsService.ts";

export const Highlight:FC = () => {
    const {i18n} = useTranslation();
    const [highlightData, setHighlightData] = useState<HighlightType>();

    useEffect(() => {
        const fetchHighlight = async () => {
            try {
                const response = await getRandomHighlight();
                setHighlightData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchHighlight();
    }, []);
    
    if (highlightData) {
        return (
            <div className="cta-dark">
                <h2 style={{fontSize: "35px"}}>{i18n.language == "cs" ? highlightData.title_cs : highlightData.title}</h2>
                <div className="row">
                    <div className="col-2">
                        <IoIosInformationCircleOutline />
                    </div>
                    <div className="col-sm">
                        <p style={{fontSize: "15px"}}>{i18n.language == "cs" ? highlightData.description_cs : highlightData.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}