import {FC, useEffect, useState} from "react";
import {HighlightType} from "../../../utils/types/highlights/HighlightType.ts";
import {getRandomHighlight} from "../../../api/highlightsService.ts";
import {IoIosInformationCircleOutline} from "react-icons/io";

export const Highlight:FC = () => {
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
                <h2 style={{fontSize: "35px"}}>{highlightData.title}</h2>
                <IoIosInformationCircleOutline />
            </div>
        );
    }
}