import {NavbarURLs, NavLink} from "../types/NavLink.ts";
import {DemoType} from "../types/demos/demoType.ts";
import {Assets} from "../types/asset/AssetDetailType.ts";

export const domain = "https://serious.broker";
export const PROTECTED_ROUTES = ['/admin', '/profile', '/assets', '/most_profitable_assets', '/asset_graph/:id'];
export const pageLimit = 10;
export const imageURL = "https://api.serious.broker/article/images/";
export const coinURL = "https://api.serious.broker/cryptocurrency_list/images/";
export const glossaryImagesURL = "https://api.serious.broker/glossary/images/";
export const qrCodeImagesURL = "https://api.serious.broker/qr_codes/qr/";

export const facebookURL = "https://www.facebook.com/profile.php?id=61566158057883";
export const instagramURL = "https://www.instagram.com/serious_broker/?igsh=MTVsM3NqMmFxaTNsaQ%3D%3D&utm_source=qr";
export const linkedinURL = "https://www.linkedin.com/in/serious-broker-07283b331/";
export const youtubeURL = "http://www.youtube.com/@SeriousBroker";
export const twitterURL = "https://x.com/SeriousBroker";

export const phoneNumber = "+420 000 000 000";
export const contactEmail = "pri0207@vsb.cz";

export const routes = {
    home: "/",
    about: "/about",
    contact: "/contact",
    articles: "/articles",
    articleURL: "/article/",
    article: "/article/:id/:language?",
    searchURL: "/search/",
    search: "/search/:text",
    graphs: "/graphs",
    assets: "/assets",
    mostProfitableAssets: "/most_profitable_assets",
    assetGraphURL: "/asset_graph/",
    assetGraphDetail: "/asset_graph_detail",
    assetGraphCurrencyDetail: "/asset_graph_detail/:index_label",
    assetGraph: "/asset_graph/:index_label",
    recommendation: "/recommendation",
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
        achievements: "/profile/achievements",
        membership: "/profile/membership",
        myPortfolio: "/profile/my_portfolio",
        editMyPortfolio: "/profile/edit_my_portfolio/:id",
        newMyPortfolio: "/profile/edit_my_portfolio",
        myPortfolioDetails: "/profile/my_portfolio_details/:id",
    },
    verifyAccount: "/verify_account/:user_id/:token",
    forgottenPassword: "/forgotten_password",
    recoverPassword: "/reset_password/:user_id/:secret_key_1/:secret_key_2",
    admin: {
        index: "",
        users: "users",
        newsletter: "newsletter",
        articles: "articles",
        articleNew: "articles/new",
        articleEdit: "articles/edit/:id",
        articleComments: "article/comments/:id",
        articleShare: "article/share/:id",
        articleTranslate: "article/translate/:id",
        translations: "translations/:articleId",
        translationsEdit: "translations/:articleId/:id",
        postEdit: "post/edit/:articleId/:id?",
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
    },
    demos: "/demos",
    demo: "/demo/:id",
    
}

export const adminURLS = {
    index: "/admin",
    users: "/admin/users",
    newsletter: "/admin/newsletter",
    articles: "/admin/articles",
    articleNew: "/admin/articles/new",
    articleEdit: "/admin/articles/edit/",
    articleComments: "/admin/article/comments/",
    articleShare: "/admin/article/share/",
    articleTranslate: "/admin/article/translate/",
    translations: "/admin/translations/",
    translationsEdit: "/admin/translations/",
    postEdit: "/admin/post/edit/",
    glossary: "/admin/glossary",
    logTable: "/admin/log_table",
    feedbacks: "/admin/feedbacks",
    achievements: "/admin/achievements",
    coinSettings: "/admin/coin_settings",
    chachedData: "/admin/chached_data",
    qr: "/admin/qr",
    demos: "/admin/demos",
    newDemo: "/admin/demos/edit",
}

export const registeredUserNavbarURLs: NavbarURLs = {
    articles: { title: "Articles", link: routes.articles },
    graphs: {
        title: "Graphs",
        subLinks: {
            graphs: { title: "Graphs", link: routes.graphs },
            assets: { title: "Assets", link: routes.assets },
            mostProfitableAssets: { title: "Most profitable assets", link: routes.mostProfitableAssets }
        },
    },
};

export const notRegisteredUserNavbarURLs: Record<string, NavLink> = {
    learn: { title: "Learn", link: routes.articles },
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
    status: true
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

export const howDoWeEvaluateReportingPeriodArticle = "/article/20";
export const whatIsPurposeOfReportingPeriodArticle = "/article/21";
export const whatIsMarketCapitalizationArticle = "/article/22";
export const areEstablishedCryptocurrenciesOrNewcomersToTheMarketBetterArticle = "/article/23";