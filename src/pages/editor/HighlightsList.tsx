import {FC, useCallback, useEffect, useState} from "react";
import {HighlightsListSkeleton} from "../../components/modules/highlights/HighlightsListSkeleton.tsx";
import {HighlightType} from "../../utils/types/highlights/HighlightType.ts";
import {HighlightCard} from "../../components/modules/highlights/HighlightCard.tsx";
import {Button} from "../../components/Button.tsx";
import {useTranslation} from "react-i18next";
import {editorURLS} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
import {getHighlights} from "../../utils/api/highlightsService.ts";

export const HighlightsList:FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [highlights, setHighlights] = useState<HighlightType[]>();

    const fetchHighlights = useCallback(async () => {
        try {
            const response = await getHighlights();
            if (!response) return;
            setHighlights(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);
    
    useEffect(() => {
        fetchHighlights();
    }, [fetchHighlights]);
    
    return (
        <div className="mt-4 padding-bottom">
                <div className="blog__wrapper">
                    <div className="row g-4">
                        <div className="container mt-4">
                            {highlights === undefined ? (
                                <HighlightsListSkeleton />
                            ) : highlights.length === 0 ? (
                                <div className="alert alert-warning" role="alert">
                                    <strong>Ups!</strong> No highlights found.
                                </div>
                            ) : (
                                <>
                                    <h2 style={{fontSize: "35px"}}>{t("Highlights")}</h2>
                                    <Button style={{ fontSize: 20, marginLeft:10 }} onClick={() => navigate(editorURLS.highlitsEditor)}>{t("New highlight")}</Button>
                                    <div className="row">
                                        {highlights.map((highlight) => (
                                            <HighlightCard key={highlight.id} highlightData={highlight} fetchHighlights={fetchHighlights} />
                                        ))}
                                    </div>
                                </>
                                )}
                        </div>
                    </div>
                </div>
        </div>
    );
}