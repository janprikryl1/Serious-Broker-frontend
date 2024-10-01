export const company = "Serious Broker";
export const PROTECTED_ROUTES = ['/admin', '/profile', '/assets', '/most_profitable_assets', '/asset_graph/:id'];
export const pageLimit = 10;
export const imageURL = "https://api.serious.broker/article/images/";

export const facebookURL = "https://www.facebook.com/seriousbroker/";
export const instagramURL = "https://www.instagram.com/seriousbroker/";
export const linkedinURL = "https://www.linkedin.com/company/serious-broker/";
export const youtubeURL = "https://www.youtube.com/channel/UC0-0-0";
export const twitterURL = "https://twitter.com/seriousbroker/";

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
    assetGraph: "/asset_graph/:id",
    recommendation: "/recommendation",
    dictionary: "/dictionary",
    cryptocurrenciesList: "/cryptocurrencies_list",
    cryptocurrencyDetailURL: "/cryptocurrency_detail/",
    cryptocurrencyDetail: "/cryptocurrency_detail/:id",
    graphsRecommendationDetailURL: "/graphs/recommendation/detail/",
    graphsRecommendationDetail: "/graphs/recommendation/detail/:asset_label",
    signIn: "/sign_in",
    register: "/register",
    profile: "/profile",
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
        glossary: "glossary",
        logTable: "log_table",
        feedbacks: "feedbacks"
    },
    inquiry: "/inquiry"
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
    glossary: "/admin/glossary",
    logTable: "/admin/log_table",
    feedbacks: "/admin/feedbacks"
}

//Date functions
export const toCzechDateFormat = (dateRaw: string): string => {
    const date = new Date(dateRaw);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Měsíce jsou 0-indexované
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}. ${month}. ${year} ${hours}:${minutes}`;
}

export const toCzechDate = (dateRaw: string): string => {
    const date = new Date(dateRaw);
    return `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()}`;
}

export const getDayName = (dayNumber: number) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNumber ? daysOfWeek[dayNumber] : 'Unknown day';
}

export const convertUTCToLocalTime = (utcHour: number) => {
    const utcDate = new Date(Date.UTC(2024, 0, 1, utcHour));
    const localTime = utcDate.toLocaleString(navigator.language, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return localTime;
}

export const getYear = (yearNumber: number) => {
    return 2024 - yearNumber;
}