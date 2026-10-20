import {NavbarURLs, NavLink} from "../types/NavLink.ts";
// @ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

export const domain = "https://serious.broker";
export const PROTECTED_ROUTES = ['/admin', '/profile', '/graphs', '/editor'];
export const pageLimit = 9;
export const imageURL = "https://api.serious.broker/article/images/";
export const coinURL = "https://api.serious.broker/cryptocurrency_list/images/";
export const glossaryImagesURL = "https://api.serious.broker/glossary/images/";
export const qrCodeImagesURL = "https://api.serious.broker/qr_codes/qr/";
export const formImagesURL = "https://api.serious.broker/form_questions/";
export const logURL = `https://api.serious.broker/table_log/coinmarketcup_coin_save_name_photo.php`;

export const facebookURL = "https://www.facebook.com/profile.php?id=61566158057883";
export const instagramURL = "https://www.instagram.com/serious_broker/?igsh=MTVsM3NqMmFxaTNsaQ%3D%3D&utm_source=qr";
export const linkedinURL = "https://www.linkedin.com/in/serious-broker-07283b331/";
export const youtubeURL = "http://www.youtube.com/@SeriousBroker";
export const twitterURL = "https://x.com/SeriousBroker";

export const phoneNumber = "+420 735 838 972";
export const contactEmail = "info@serious.broker";

export const freecurrencyapi = new Freecurrencyapi('fca_live_tMDn3hFf3kZtFQuBrCmsqlLwAEmgSJUtXoNJEASX');


export const routes = {
    home: "/",
    about: "/about",
    // overview: "/overview",
    contact: "/contact",
    articles: "/articles",
    articleURL: "/article/",
    article: "/article/:id/:language?",
    searchURL: "/articles/search/",
    search: "/articles/search/:text",
    assets: "/asset_list",
    assetGraphURL: "/asset_graph/",
    assetGraphDetail: "assetGraphCurrencyDetail/asset_graph/detail",
    // : "/asset_graph/detail/:index_label",
    assetGraph: "/asset_graph/:name",
    recommendation: "/graphs/recommendation",
    dictionary: "/dictionary",
    cryptocurrenciesList: "/cryptocurrencies_list",
    cryptocurrencyDetailURL: "/cryptocurrency_detail/",
    cryptocurrencyDetail: "/cryptocurrency_detail/:id",
    graphsRecommendationDetailURL: "/graphs/recommendation/detail/",
    graphsRecommendationDetail: "/graphs/recommendation/detail/:asset_label",
    cryptoCalculator: "/calculator",
    BTFD: "/graphs/BTFD",
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
        newInvestmentPlanIntro: "/profile/new_investment_plan_intro",
        newInvestmentPlanName: "/profile/new_investment_plan_name",
        newInvestmentPlan: "/profile/new_investment_plan",
        newInvestmentPlanNewPortfolio: "/profile/new_investment_plan/new_portfolio",
        newInvestmentPlanExistingPortfolio: "/profile/new_investment_plan/existing_portfolio",
        newInvestmentPlanRecurringInvestment: "/profile/new_investment_plan/recurring_investment",
        newInvestmentPlanInvestedAmount: "/profile/new_investment_plan/invested_amount",
        newInvestmentPlanTrafficLights: "/profile/new_investment_plan/traffic_lights",
        editInvestmentPlan: "/profile/edit_investment_plan/:id",
        myInvestmentPlans: "/profile/my_investment_plans",
        myTrafficLights: "/profile/my_traffic_lights",
        dashboard: "/profile/dashboard",
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
        genericTableData: "generic_table_data",
        newGenericTableData: "generic_table_data/edit",
        editGenericTableData: "generic_table_data/edit/:id",
        genericsTableData: "generic_table_results/:id",
        forms: "forms",
        formResponses: "form_responses",
        formEvaulationSettings: "form_evaulation_settings",
    },
    // guides: {
    //     index: "",
    //     guidedInvestControl: "guided_invest_control",
    //     personalStrategy: "personal_strategy",
    // },
    demos: "/demos",
    demo: "/demo/:id",
    cooperationInfo: "/cooperation_info",
    gdprInfo: "/gdpr_info",
    cookiesInfo: "/cookies_info",
    aboutLogin: "/about_login",
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
    index: "/admin/",
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
    genericTableData: "/admin/generic_table_data",
    newGenericTableData: "/admin/generic_table_data/edit",
    genericsTableData: "/admin/generic_table_results",
    forms: "/admin/forms",
    formResponses: "/admin/form_responses",
    formEvaulationSettings: "/admin/form_evaulation_settings",
}

export const internalToolsURLS = {
    index: "/internal/",
}

export const guideURLS = {
    index: "/guide",
    guidedInvestControl: "/guide/guided_invest_control",
    personalStrategy: "/guide/personal_strategy",
}

export const registeredUserNavbarURLs: NavbarURLs = {
    analysesStrategies: {
        title: "Analyses & Strategies",
        subLinks: {
            indices: { title: "Indices", link: routes.assets },
            // cryptocurrencies: { title: "Cryptocurrencies", link: routes.cryptocurrenciesList },
            cryptocurrencies: { title: "Cryptocurrencies", link: routes.recommendation },
            cryptoCalculator: { title: "Calculator", link: routes.cryptoCalculator},
            BTFD: { title: "Strategies", link: routes.BTFD },
        }
    },
    investmentProfile: {
        title: "Investment Profile",
        subLinks: {
            dashboard: { title: "Dashboard", link: routes.profile.dashboard },
            portfolios: { title: "My Portfolios", link: routes.profile.myPortfolio },
            investmentPlans: { title: "My Investment Plans", link: routes.profile.myInvestmentPlans },
            marketTrafficLights: { title: "My Market Traffic Lights", link: routes.profile.myTrafficLights },
            watchlist: { title: "Watchlist", link: routes.profile.myWatchList },
        }
    },
    education: {title: "Education", link: routes.articles},
};

export const notRegisteredUserNavbarURLs: Record<string, NavLink> = {
    aboutLogin: { title: "Analyses & Strategies", link:  routes.register},
    indices: { title: "Indices", link: routes.assets },
    cryptocurrencies: { title: "Cryptocurrencies", link: routes.cryptocurrenciesList },
    cryptoCalculator: { title: "Calculator", link: routes.cryptoCalculator},
    education: {title: "Education", link: routes.articles},
};