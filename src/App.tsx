import {lazy} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core';
import AOS from 'aos';
import { useEffect } from "react";
import "./i18n";
import { routes, adminURLS } from "./utils/constants";
import { ThemeProvider } from "./utils/providers/ThemeProvider.tsx";
import { ProviderUser } from "./utils/providers/providerUser.tsx";
import { AchievmentsProvider } from "./utils/providers/AchievmentsProvider.tsx";
import { ToastContainer } from "react-toastify";
import { UnverifiedHeaderInfo } from "./components/UnverifiedHeaderInfo.tsx";
import { Header } from "./components/modules/navbar/Header.tsx";
import { Footer } from "./components/modules/navbar/Footer.tsx";
import {PageLoader} from "./components/PageLoader.tsx";
const Index = lazy(() => import("./pages/Index.tsx").then(module => ({ default: module.Index })));
const About = lazy(() => import("./pages/About.tsx").then(module => ({ default: module.About })));
const Contact = lazy(() => import("./pages/Contact.tsx").then(module => ({ default: module.Contact })));
const Articles = lazy(() => import("./pages/Articles.tsx").then(module => ({ default: module.Articles })));
const Article = lazy(() => import("./pages/Article.tsx").then(module => ({ default: module.Article })));
const SearchArticles = lazy(() => import("./pages/SearchArticles.tsx").then(module => ({ default: module.SearchArticles })));
const Assets = lazy(() => import("./pages/graphs/Assets.tsx").then(module => ({ default: module.Assets })));
const GraphsOverview = lazy(() => import("./pages/graphs/GraphsOverview.tsx").then(module => ({ default: module.GraphsOverview })));
const MostProfitableAssets = lazy(() => import("./pages/graphs/MostProfitableAssets.tsx").then(module => ({ default: module.MostProfitableAssets })));
const AssetGraph = lazy(() => import("./pages/graphs/AssetGraph.tsx").then(module => ({ default: module.AssetGraph })));
const AssetGraphCurrencyDetail = lazy(() => import("./pages/graphs/AssetGraphCurrencyDetail.tsx").then(module => ({ default: module.AssetGraphCurrencyDetail })));
const Recommendation = lazy(() => import("./pages/graphs/Recommendation.tsx").then(module => ({ default: module.Recommendation })));
const Glossary = lazy(() => import("./pages/Glossary.tsx").then(module => ({ default: module.Glossary })));
const CryptoCurrenciesList = lazy(() => import("./pages/CryptoCurrenciesList.tsx").then(module => ({ default: module.CryptoCurrenciesList })));
const CryptoCurrencyDetail = lazy(() => import("./pages/CryptoCurrencyDetail.tsx").then(module => ({ default: module.CryptoCurrencyDetail })));
const RecommendationDetails = lazy(() => import("./pages/graphs/RecommendationDetails.tsx").then(module => ({ default: module.RecommendationDetails })));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount.tsx").then(module => ({ default: module.VerifyAccount })));
const ForgottenPassword = lazy(() => import("./pages/ForgottenPassword.tsx").then(module => ({ default: module.ForgottenPassword })));
const RecoverPassword = lazy(() => import("./pages/RecoverPassword.tsx").then(module => ({ default: module.RecoverPassword })));
const Admin = lazy(() => import("./pages/admin/Admin.tsx").then(module => ({ default: module.Admin })));
const SignIn = lazy(() => import("./pages/SignIn.tsx").then(module => ({ default: module.SignIn })));
const Register = lazy(() => import("./pages/Register.tsx").then(module => ({ default: module.Register })));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx").then(module => ({ default: module.ErrorPage })));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview.tsx").then(module => ({ default: module.AdminOverview })));
const UserManagment = lazy(() => import("./pages/admin/UserManagment.tsx").then(module => ({ default: module.UserManagment })));
const NewsletterOverview = lazy(() => import("./pages/admin/NewsletterOverview.tsx").then(module => ({ default: module.NewsletterOverview })));
const ArticleManagement = lazy(() => import("./pages/admin/ArticleManagement.tsx").then(module => ({ default: module.ArticleManagement })));
const EditArticle = lazy(() => import("./pages/admin/EditArticle.tsx").then(module => ({ default: module.EditArticle })));
const ArticleComments = lazy(() => import("./pages/admin/ArticleComments.tsx").then(module => ({ default: module.ArticleComments })));
const ArticleShare = lazy(() => import("./pages/admin/ArticleShare.tsx").then(module => ({ default: module.ArticleShare })));
const ArticleTranslate = lazy(() => import("./pages/admin/ArticleTranslate.tsx").then(module => ({ default: module.ArticleTranslate })));
const TranslateEdit = lazy(() => import("./pages/admin/TranslateEdit.tsx").then(module => ({ default: module.TranslateEdit })));
const PostEdit = lazy(() => import("./pages/admin/PostEdit.tsx").then(module => ({ default: module.PostEdit })));
const GlossaryManagement = lazy(() => import("./pages/admin/GlossaryManagement.tsx").then(module => ({ default: module.GlossaryManagement })));
const LogTable = lazy(() => import("./pages/admin/LogTable.tsx").then(module => ({ default: module.LogTable })));
const Feedbacks = lazy(() => import("./pages/admin/Feedbacks.tsx").then(module => ({ default: module.Feedbacks })));
const AdminAchivments = lazy(() => import("./pages/admin/AdminAchivments.tsx").then(module => ({ default: module.AdminAchivments })));
const CoinSettings = lazy(() => import("./pages/admin/CoinSettings.tsx").then(module => ({ default: module.CoinSettings })));
const ChachedData = lazy(() => import("./pages/admin/ChachedData.tsx").then(module => ({ default: module.ChachedData })));
const QRManagement = lazy(() => import("./pages/admin/QRManagement.tsx").then(module => ({ default: module.QRManagement })));
const Profile = lazy(() => import("./pages/profile/Profile.tsx").then(module => ({ default: module.Profile })));
const ProfileOverview = lazy(() => import("./pages/profile/ProfileOverview.tsx").then(module => ({ default: module.ProfileOverview })));
const ProfileAchievements = lazy(() => import("./pages/profile/ProfileAchievements.tsx").then(module => ({ default: module.ProfileAchievements })));
const ProfileMembership = lazy(() => import("./pages/profile/ProfileMembership.tsx").then(module => ({ default: module.ProfileMembership })));
const ProfileEdit = lazy(() => import("./pages/profile/ProfileEdit.tsx").then(module => ({ default: module.ProfileEdit })));
const Demos = lazy(() => import("./pages/Demos.tsx").then(module => ({ default: module.Demos })));
const Demo = lazy(() => import("./pages/Demo.tsx").then(module => ({ default: module.Demo })));
const AdminDemos = lazy(() => import("./pages/admin/AdminDemos.tsx").then(module => ({ default: module.AdminDemos })));
const AdminDemoEdit = lazy(() => import("./pages/admin/AdminDemoEdit.tsx").then(module => ({ default: module.AdminDemoEdit })));
const MyPortfolio = lazy(() => import("./pages/profile/MyPortfolio.tsx").then(module => ({ default: module.MyPortfolio })));
const EditMyPortfolio = lazy(() => import("./pages/profile/EditMyPortfolio.tsx").then(module => ({ default: module.EditMyPortfolio })));
const MyPortfolioDetails = lazy(() => import("./pages/profile/MyPortfolioDetails.tsx").then(module => ({ default: module.MyPortfolioDetails })));

// Disable automatic CSS addition for Font Awesome
config.autoAddCss = false;

function App() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <BrowserRouter>
            <ThemeProvider>
                <ProviderUser>
                    <AchievmentsProvider>
                        <UnverifiedHeaderInfo />
                        <Header />
                        <Routes>
                            <Route path={routes.home} element={<Index />} />
                            <Route path={routes.about} element={<PageLoader><About /></PageLoader>} />
                            <Route path={routes.contact} element={<PageLoader><Contact /></PageLoader>} />
                            <Route path={routes.articles} element={<PageLoader><Articles /></PageLoader>} />
                            <Route path={routes.article} element={<PageLoader><Article /></PageLoader>} />
                            <Route path={routes.search} element={<PageLoader><SearchArticles /></PageLoader>} />
                            <Route path={routes.assets} element={<PageLoader><Assets /></PageLoader>} />
                            <Route path={routes.graphs} element={<PageLoader><GraphsOverview /></PageLoader>} />
                            <Route path={routes.mostProfitableAssets} element={<PageLoader><MostProfitableAssets /></PageLoader>} />
                            <Route path={routes.assetGraph} element={<PageLoader><AssetGraph /></PageLoader>} />
                            <Route path={routes.assetGraphCurrencyDetail} element={<PageLoader><AssetGraphCurrencyDetail /></PageLoader>} />
                            <Route path={routes.recommendation} element={<PageLoader><Recommendation /></PageLoader>} />
                            <Route path={routes.dictionary} element={<PageLoader><Glossary /></PageLoader>} />
                            <Route path={routes.cryptocurrenciesList} element={<PageLoader><CryptoCurrenciesList /></PageLoader>} />
                            <Route path={routes.cryptocurrencyDetail} element={<PageLoader><CryptoCurrencyDetail /></PageLoader>} />
                            <Route path={routes.graphsRecommendationDetail} element={<PageLoader><RecommendationDetails /></PageLoader>} />
                            <Route path={routes.signIn} element={<PageLoader><SignIn /></PageLoader>} />
                            <Route path={routes.register} element={<PageLoader><Register /></PageLoader>} />
                            <Route path={routes.profile.profileURL} element={<PageLoader><Profile/></PageLoader>}>
                                <Route path={routes.profile.profileURL} element={<PageLoader><ProfileOverview /></PageLoader>}/>
                                <Route path={routes.profile.edit} element={<PageLoader><ProfileEdit/></PageLoader>}/>
                                <Route path={routes.profile.achievements} element={<PageLoader><ProfileAchievements/></PageLoader>}/>
                                <Route path={routes.profile.membership} element={<PageLoader><ProfileMembership/></PageLoader>} />
                                <Route path={routes.profile.myPortfolio} element={<PageLoader><MyPortfolio/></PageLoader>} />
                                <Route path={routes.profile.editMyPortfolio} element={<PageLoader><EditMyPortfolio/></PageLoader>} />
                                <Route path={routes.profile.myPortfolioDetails} element={<PageLoader><MyPortfolioDetails/></PageLoader>} />
                                <Route path={routes.profile.newMyPortfolio} element={<PageLoader><EditMyPortfolio/></PageLoader>} />
                            </Route>                            
                            <Route path={routes.verifyAccount} element={<PageLoader><VerifyAccount /></PageLoader>} />
                            <Route path={routes.forgottenPassword} element={<PageLoader><ForgottenPassword /></PageLoader>} />
                            <Route path={routes.recoverPassword} element={<PageLoader><RecoverPassword /></PageLoader>} />
                            <Route path={adminURLS.index} element={<PageLoader><Admin /></PageLoader>}>
                                <Route path={routes.admin.index} element={<PageLoader><AdminOverview /></PageLoader>} />
                                <Route path={routes.admin.users} element={<PageLoader><UserManagment /></PageLoader>} />
                                <Route path={routes.admin.newsletter} element={<PageLoader><NewsletterOverview /></PageLoader>} />
                                <Route path={routes.admin.articles} element={<PageLoader><ArticleManagement /></PageLoader>} />
                                <Route path={routes.admin.articleNew} element={<PageLoader><EditArticle /></PageLoader>} />
                                <Route path={routes.admin.articleEdit} element={<PageLoader><EditArticle /></PageLoader>} />
                                <Route path={routes.admin.articleComments} element={<PageLoader><ArticleComments /></PageLoader>} />
                                <Route path={routes.admin.articleShare} element={<PageLoader><ArticleShare /></PageLoader>} />
                                <Route path={routes.admin.articleTranslate} element={<PageLoader><ArticleTranslate /></PageLoader>} />
                                <Route path={routes.admin.translations} element={<PageLoader><TranslateEdit /></PageLoader>} />
                                <Route path={routes.admin.translationsEdit} element={<PageLoader><TranslateEdit /></PageLoader>} />
                                <Route path={routes.admin.postEdit} element={<PageLoader><PostEdit /></PageLoader>} />
                                <Route path={routes.admin.glossary} element={<PageLoader><GlossaryManagement /></PageLoader>} />
                                <Route path={routes.admin.logTable} element={<PageLoader><LogTable /></PageLoader>} />
                                <Route path={routes.admin.feedbacks} element={<PageLoader><Feedbacks /></PageLoader>} />
                                <Route path={routes.admin.achievements} element={<PageLoader><AdminAchivments /></PageLoader>} />
                                <Route path={routes.admin.coinSettings} element={<PageLoader><CoinSettings /></PageLoader>} />
                                <Route path={routes.admin.chachedData} element={<PageLoader><ChachedData /></PageLoader>} />
                                <Route path={routes.admin.qr} element={<PageLoader><QRManagement /></PageLoader>} />
                                <Route path={routes.admin.demos} element={<PageLoader><AdminDemos /></PageLoader>} />
                                <Route path={routes.admin.editDemo} element={<PageLoader><AdminDemoEdit /></PageLoader>} />
                                <Route path={routes.admin.newDemo} element={<PageLoader><AdminDemoEdit /></PageLoader>} />
                            </Route>
                            <Route path={routes.demos} element={<PageLoader><Demos /></PageLoader>} />
                            <Route path={routes.demo} element={<PageLoader><Demo /></PageLoader>} />
                            <Route path="*" element={<PageLoader><ErrorPage /></PageLoader>} />
                        </Routes>
                        <Footer />
                    </AchievmentsProvider>
                </ProviderUser>
            </ThemeProvider>
            <ToastContainer position="bottom-right" />
        </BrowserRouter>
    );
}

export default App;
