import {DemoType} from "../types/demos/demoType.ts";
import {Assets} from "../types/asset/AssetDetailType.ts";
import {HighlightType} from "../types/highlights/HighlightType.ts";

export const defaultNewCurrency = {
    id: 0,
    name: "",
    symbol: "",
    price: 0,
    marketcap: "",
    category: "",
    max_supply: 0,
    circulating_supply: "",
    website: "",
    whitepaper: "",
    reddit: "",
    twitter: "",
    telegram: "",
    cmc_rank: 0,
    date: "",
    photo: null
}

export const defaultNewDemo: DemoType = {
    name: "",
    description: "",
    time_of_replace: 5,
    created: new Date(),
    widgets:[]
}

export const defaultNewMyPortfolioAsset: Assets = {
    id: 0,
    asset_label: "",
    allocation: 0,
    status: true,
    photo: "",
    name: "",
}

export const defaultHighlight: HighlightType = {
    id: -1,
    title_cs: "",
    title: "",
    description_cs: "",
    description: "",
    created: "",
}

export const defaultContent = [{id: 0, title: "", tasks: [{id: 0, task: "", image: "", animateTo: {from: {x: 0, y: 0}, to: {x: 0, y: 0}}}]}];

export const defaultSubjects = [{id: 0, title: "", text: ""}];