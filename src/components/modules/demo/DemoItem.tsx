import { FC, useEffect, useState } from "react";
import { widgets, WidgetsType } from "../../../utils/types/demos/demoType.ts";
import { DemoWidgetImage } from "./demoWidgets/DemoWidgetImage.tsx";
import { CurrentWidgetSkeleton } from "./demoWidgets/CurrentWidgetSkeleton.tsx";
import { DemoArticleWidget } from "./demoWidgets/DemoArticleWidget.tsx";
import { DemoCoinGraph } from "./demoWidgets/DemoCoinGraph.tsx";
import { DemoAssetGraphs } from "./demoWidgets/DemoAssetGraphs.tsx";
import { DemoWidgetGlossary } from "./demoWidgets/DemoWidgetGlossary.tsx";

type Props = {
    widgets: widgets[];
    time_of_replace: number;
}

export const DemoItem: FC<Props> = ({ widgets, time_of_replace }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleWidgets = widgets.filter(widget => widget.visible);

    useEffect(() => {
        if (visibleWidgets.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % visibleWidgets.length);
        }, time_of_replace * 1000);

        return () => clearInterval(interval);
    }, [time_of_replace, visibleWidgets.length]);

    if (visibleWidgets.length === 0) {
        return <CurrentWidgetSkeleton />;
    }

    const currentWidget = visibleWidgets[currentIndex];

    return (
        <div className="mt-5">
            {currentWidget.type === WidgetsType.Image ?
                <DemoWidgetImage src={currentWidget.propertyId} alt={currentWidget.propertyId} />
                : currentWidget.type === WidgetsType.Article ? 
                <DemoArticleWidget articleId={currentWidget.propertyId} />
                : currentWidget.type === WidgetsType.ASSET_GRAPHS ?
                <DemoAssetGraphs index_label={currentWidget.propertyId} />
                : currentWidget.type === WidgetsType.COIN_GRAPH ?
                <DemoCoinGraph index_label={currentWidget.propertyId} />
                : currentWidget.type === WidgetsType.GLOSSARY ?
                <DemoWidgetGlossary title={currentWidget.propertyId} />
                : <CurrentWidgetSkeleton />
            }
        </div>
    );
};
