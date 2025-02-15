import {FC, useEffect, useState} from "react";
import {HighlightsListSkeleton} from "../../components/modules/highlights/HighlightsListSkeleton.tsx";
import {getHighlights} from "../../api/highlightsService.ts";
import {HighlightType} from "../../utils/types/highlights/HighlightType.ts";

export const HighlightsList:FC = () => {
    const [highlights, setHighlights] = useState<HighlightType[]>();
    
    useEffect(() => {
        const fetchHighlights = async () => {
            try {
            const response = await getHighlights();
            setHighlights(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchHighlights();
    }, []);
    
    return (
        <>
            {highlights === undefined ? (
                <HighlightsListSkeleton />
            ) : highlights.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                    <strong>Ups!</strong> No highlights found.
                </div>
            ) : (
                <div>
                    {highlights.map((highlight) => (
                        <div key={highlight.id}>
                            <h2>{highlight.title}</h2>
                            <p>{highlight.description}</p>
                        </div>
                    ))}
                </div>
                )}
        </>
    );
}