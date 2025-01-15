export type DemoType = {
    id?: number;
    name: string;
    description: string;
    time_of_replace: number;
    created: string | Date;
    widgets: widgets[];
}

export type widgets = {
    type: WidgetsType;
    propertyId: string;
    visible: boolean;
}

export enum WidgetsType {
    Image = "Image",
    Article = "Article",
    COIN_GRAPH = "COIN_GRAPH",
    ASSET_GRAPHS = "ASSET_GRAPHS",
    GLOSSARY = "GLOSSARY",
    COINMARKETCUP_TOP_10 = "COINMARKETCUP_TOP_10"
}