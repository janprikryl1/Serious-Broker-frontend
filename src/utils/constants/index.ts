import {NavbarURLs, NavLink} from "../types/NavLink.ts";
import {DemoType} from "../types/demos/demoType.ts";
import {Assets} from "../types/asset/AssetDetailType.ts";
import {HighlightType} from "../types/highlights/HighlightType.ts";
// @ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

export const domain = "https://serious.broker";
export const PROTECTED_ROUTES = ['/admin', '/profile', '/assets', '/graphs', '/asset_graph/:id', '/editor'];
export const pageLimit = 9;
export const imageURL = "https://api.serious.broker/article/images/";
export const coinURL = "https://api.serious.broker/cryptocurrency_list/images/";
export const glossaryImagesURL = "https://api.serious.broker/glossary/images/";
export const qrCodeImagesURL = "https://api.serious.broker/qr_codes/qr/";
export const logURL = `https://api.serious.broker/table_log/coinmarketcup_coin_save_name_photo.php`;

export const facebookURL = "https://www.facebook.com/profile.php?id=61566158057883";
export const instagramURL = "https://www.instagram.com/serious_broker/?igsh=MTVsM3NqMmFxaTNsaQ%3D%3D&utm_source=qr";
export const linkedinURL = "https://www.linkedin.com/in/serious-broker-07283b331/";
export const youtubeURL = "http://www.youtube.com/@SeriousBroker";
export const twitterURL = "https://x.com/SeriousBroker";

export const phoneNumber = "+420 735 838 972";
export const contactEmail = "brokerserious@gmail.com";

export const freecurrencyapi = new Freecurrencyapi('fca_live_tMDn3hFf3kZtFQuBrCmsqlLwAEmgSJUtXoNJEASX');


export const routes = {
    home: "/",
    about: "/about",
    overview: "/overview",
    contact: "/contact",
    articles: "/articles",
    articleURL: "/article/",
    article: "/article/:id/:language?",
    searchURL: "/articles/search/",
    search: "/articles/search/:text",
    assets: "/asset_list",
    assetGraphURL: "/asset_graph/",
    assetGraphDetail: "/asset_graph/detail",
    assetGraphCurrencyDetail: "/asset_graph/detail/:index_label",
    assetGraph: "/asset_graph/:name",
    recommendation: "/graphs/recommendation",
    dictionary: "/dictionary",
    cryptocurrenciesList: "/cryptocurrencies_list",
    cryptocurrencyDetailURL: "/cryptocurrency_detail/",
    cryptocurrencyDetail: "/cryptocurrency_detail/:id",
    graphsRecommendationDetailURL: "/graphs/recommendation/detail/",
    graphsRecommendationDetail: "/graphs/recommendation/detail/:asset_label",
    signIn: "/sign_in",
    register: "/register",
    profile: {
        profileURL: "/profile",
        edit: "/profile/edit",
        sessions: "/profile/sessions",
        achievements: "/profile/achievements",
        membership: "/profile/membership",
        myPortfolio: "/profile/my_portfolio",
        editMyPortfolio: "/profile/edit_my_portfolio/:id",
        newMyPortfolio: "/profile/edit_my_portfolio",
        myPortfolioDetails: "/profile/my_portfolio_details/:id",
        myWatchList: "/profile/my_watch_list",
    },
    verifyAccount: "/verify_account/:user_id/:token",
    forgottenPassword: "/forgotten_password",
    recoverPassword: "/reset_password/:user_id/:secret_key_1/:secret_key_2",
    editor: {
        index: "",
        articles: "articles",
        articleNew: "articles/new",
        articleEdit: "articles/edit/:id",
        articleComments: "article/comments/:id",
        articleShare: "article/share/:id",
        articleTranslate: "article/translate/:id",
        translations: "article/translations/:articleId",
        translationsEdit: "article/translations/:articleId/:id",
        postEdit: "article/post/edit/:articleId/:id?",
        highlights: "highlights",
        highlitsEditor: "highlits/editor/:id",
        highlightsNew: "highlits/editor",
    },
    admin: {
        index: "",
        users: "users",
        newsletter: "newsletter",
        glossary: "glossary",
        logTable: "log_table",
        feedbacks: "feedbacks",
        achievements: "achievements",
        coinSettings: "coin_settings",
        chachedData: "chached_data",
        qr: "qr",
        demos: "demos",
        demo: "demo/:id",
        editDemo: "demos/edit/:id",
        newDemo: "demos/edit",
        binanceIndexAbout: "binance_index_about",
    },
    guides: {
        index: "",
        guidedInvestControl: "guided_invest_control",
        personalStrategy: "personal_strategy",
    },
    demos: "/demos",
    demo: "/demo/:id",
    
}

export const editorURLS = {
    index: "/editor",
    articles: "/editor/articles",
    articleNew: "/editor/articles/new",
    articleEdit: "/editor/articles/edit/",
    articleComments: "/editor/article/comments/",
    articleShare: "/editor/article/share/",
    articleTranslate: "/editor/article/translate/",
    translations: "/editor/article/translations/",
    translationsEdit: "/editor/article/translations/",
    postEdit: "/editor/article/post/edit/",
    highlights: "/editor/highlights",
    highlitsEditor: "/editor/highlits/editor",
}

export const adminURLS = {
    index: "/admin",
    users: "/admin/users",
    newsletter: "/admin/newsletter",
    glossary: "/admin/glossary",
    logTable: "/admin/log_table",
    feedbacks: "/admin/feedbacks",
    achievements: "/admin/achievements",
    coinSettings: "/admin/coin_settings",
    chachedData: "/admin/chached_data",
    qr: "/admin/qr",
    demos: "/admin/demos",
    newDemo: "/admin/demos/edit",
    binanceIndexAbout: "/admin/binance_index_about",
}

export const guideURLS = {
    index: "/guide",
    guidedInvestControl: "/guide/guided_invest_control",
    personalStrategy: "/guide/personal_strategy",
}

export const registeredUserNavbarURLs: NavbarURLs = {
    articles: { title: "Articles", link: routes.articles },
    overview: { title: "Overview", link: routes.overview },
    assets: {title: "Assets", link: routes.assets},
    graphs: {title: "Recommendation", link: routes.recommendation},
    myWatchList: { title: "My watch list", link: routes.profile.myWatchList },
    aboutUs: { title: "About us", link: routes.about },
};

export const notRegisteredUserNavbarURLs: Record<string, NavLink> = {
    learn: { title: "Learn", link: routes.articles },
    overview: { title: "Overview", link: routes.overview },
    aboutUs: { title: "About us", link: routes.about },
};

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

const graphColor = {
    color: '#000',
    backgroundColor: '#ffca2d',
}

export const graphColors = {
    day: {
        sx: {
            '&.Mui-selected': graphColor,
            '&.Mui-selected:focus': graphColor,
            '&.Mui-selected.Mui-focusVisible': graphColor,
        },
    },
}

export const MAX_RANGES = {
    "1m": 2 * 24 * 60 * 60 * 1000, // 2 days
    "3m": 2 * 24 * 60 * 60 * 1000,
    "5m": 7 * 24 * 60 * 60 * 1000, // 7 days
    "15m": 7 * 24 * 60 * 60 * 1000,
    "30m": 7 * 24 * 60 * 60 * 1000,
    "1h": 2 * 365 * 24 * 60 * 60 * 1000, // 2 years
    "2h": 2 * 365 * 24 * 60 * 60 * 1000,
    "4h": 2 * 365 * 24 * 60 * 60 * 1000,
    "6h": 2 * 365 * 24 * 60 * 60 * 1000,
    "8h": 2 * 365 * 24 * 60 * 60 * 1000,
    "12h": 2 * 365 * 24 * 60 * 60 * 1000,
    "1d": 2 * 365 * 24 * 60 * 60 * 1000,
    "3d": 2 * 365 * 24 * 60 * 60 * 1000,
    "1w": 2 * 365 * 24 * 60 * 60 * 1000,
    "1M": NaN
};

export const defaultContent = [{id: 0, title: "", tasks: [{id: 0, task: "", image: "", animateTo: {from: {x: 0, y: 0}, to: {x: 0, y: 0}}}]}];
    
export const defaultSubjects = [{id: 0, title: "", text: ""}];