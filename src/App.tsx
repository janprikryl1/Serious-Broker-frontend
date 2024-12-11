import './App.css';
import {lazy, Suspense} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/css/swiper-bundle.min.css';
import './styles/sass/style.scss';
import { useEffect } from "react";
import "./i18n";
import { routes, adminURLS } from "./utils/constants";
import { ThemeProvider } from "./utils/providers/ThemeProvider.tsx";
import { ProviderUser } from "./utils/providers/providerUser.tsx";
import { AchievmentsProvider } from "./utils/providers/AchievmentsProvider.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UnverifiedHeaderInfo } from "./components/UnverifiedHeaderInfo.tsx";
import { Header } from "./components/modules/navbar/Header.tsx";
import { Footer } from "./components/modules/navbar/Footer.tsx";
import {Index} from "./pages/Index.tsx";

//const Index = lazy(() => import("./pages/Index.tsx").then(module => ({ default: module.Index })));
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
const Profile = lazy(() => import("./pages/profile/Profile.tsx").then());
const Admin = lazy(() => import("./pages/admin/Admin.tsx").then(module => ({ default: module.Admin })));
const SignIn = lazy(() => import("./pages/SignIn.tsx").then(module => ({ default: module.SignIn })));
const Register = lazy(() => import("./pages/Register.tsx").then(module => ({ default: module.Register })));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx").then(module => ({ default: module.ErrorPage })));

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
                            <Route path={routes.about} element={<Suspense fallback={<>...</>}><About /></Suspense>} />
                            <Route path={routes.contact} element={<Suspense fallback={<>...</>}><Contact /></Suspense>} />
                            <Route path={routes.articles} element={<Suspense fallback={<>...</>}><Articles /></Suspense>} />
                            <Route path={routes.article} element={<Article />} />
                            <Route path={routes.search} element={<SearchArticles />} />
                            <Route path={routes.assets} element={<Assets />} />
                            <Route path={routes.graphs} element={<GraphsOverview />} />
                            <Route path={routes.mostProfitableAssets} element={<MostProfitableAssets />} />
                            <Route path={routes.assetGraph} element={<AssetGraph />} />
                            <Route path={routes.assetGraphCurrencyDetail} element={<AssetGraphCurrencyDetail />} />
                            <Route path={routes.recommendation} element={<Recommendation />} />
                            <Route path={routes.dictionary} element={<Glossary />} />
                            <Route path={routes.cryptocurrenciesList} element={<CryptoCurrenciesList />} />
                            <Route path={routes.cryptocurrencyDetail} element={<CryptoCurrencyDetail />} />
                            <Route path={routes.graphsRecommendationDetail} element={<RecommendationDetails />} />
                            <Route path={routes.signIn} element={<SignIn />} />
                            <Route path={routes.register} element={<Register />} />
                            <Route path={routes.profile.profileURL} element={<Profile />}>
                                <Route path={routes.profile.profileURL} element={<Profile />} />
                            </Route>
                            <Route path={routes.verifyAccount} element={<VerifyAccount />} />
                            <Route path={routes.forgottenPassword} element={<ForgottenPassword />} />
                            <Route path={routes.recoverPassword} element={<RecoverPassword />} />
                            <Route path={adminURLS.index} element={<Admin />} />
                            <Route path="*" element={<ErrorPage />} />
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
