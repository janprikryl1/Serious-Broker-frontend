export const company = "Serious Broker";
export const domain = "https://serious.broker";
export const PROTECTED_ROUTES = ['/admin', '/profile', '/assets', '/most_profitable_assets', '/asset_graph/:id'];
export const pageLimit = 10;
export const imageURL = "https://api.serious.broker/article/images/";

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
        achievements: "/profile/achievements"
    },
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
        coinSettings: "coin_settings"
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
    postEdit: "/admin/post/edit/",
    glossary: "/admin/glossary",
    logTable: "/admin/log_table",
    feedbacks: "/admin/feedbacks",
    achievements: "/admin/achievements",
    coinSettings: "/admin/coin_settings"
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4D4D', '#4D80FF', '#4DD0E1', '#80FF80', '#80C4FF', '#C4A0FF', '#FFA0A0', '#FF8080', '#A04D80', '#8080FF', '#80FFFF', '#FFFF80', '#00FF80', '#008000', '#0000FF'];

// Funkce pro výběr náhodné barvy
export const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

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

    