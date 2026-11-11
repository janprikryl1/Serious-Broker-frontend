import {FC, lazy} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {routes} from "./utils/constants";
import {PageLoader} from "./components/reusable/PageLoader.tsx";
// Header, footer a UnverifiedHeaderInfo se renderují na každé stránce v MainLayout,
// takže zůstávají staticky v entry chunku — lazy by u nich způsobilo jen bliknutí.
import {UnverifiedHeaderInfo} from "./components/navbar/UnverifiedHeaderInfo.tsx";
import {Header} from "./components/navbar/Header.tsx";
import {Footer} from "./components/navbar/Footer.tsx";
const Index = lazy(() => import("./pages/Index.tsx").then(module => ({ default: module.Index })));
const About = lazy(() => import("./pages/information/About.tsx").then(module => ({ default: module.About })));
const Contact = lazy(() => import("./pages/information/Contact.tsx").then(module => ({ default: module.Contact })));
const Articles = lazy(() => import("./pages/content/Articles.tsx").then(module => ({ default: module.Articles })));
const Article = lazy(() => import("./pages/content/Article.tsx").then(module => ({ default: module.Article })));
const SearchArticles = lazy(() => import("./pages/content/SearchArticles.tsx").then(module => ({ default: module.SearchArticles })));
const Assets = lazy(() => import("./pages/assets/IndicesList.tsx").then(module => ({ default: module.IndicesList })));
const AssetGraph = lazy(() => import("./pages/assets/IndexDetails.tsx").then(module => ({ default: module.IndexDetails })));
// const AssetGraphCurrencyDetail = lazy(() => import("./pages/assets/AssetGraphCurrencyDetail.tsx").then(module => ({ default: module.AssetGraphCurrencyDetail })));
const Recommendation = lazy(() => import("./pages/assets/CryptocurrenciesListTable.tsx").then(module => ({ default: module.CryptocurrenciesListTable })));
const Glossary = lazy(() => import("./pages/content/Glossary.tsx").then(module => ({ default: module.Glossary })));
const CryptoCurrenciesList = lazy(() => import("./pages/assets/SimpleCryptoCurrenciesList.tsx").then(module => ({ default: module.SimpleCryptoCurrenciesList })));
const CryptocurrencyDetails = lazy(() => import("./pages/assets/CryptocurrencyDetails.tsx").then(module => ({ default: module.CryptocurrencyDetails })));
const VerifyAccount = lazy(() => import("./pages/auth/VerifyAccount.tsx").then(module => ({ default: module.VerifyAccount })));
const ForgottenPassword = lazy(() => import("./pages/auth/ForgottenPassword.tsx").then(module => ({ default: module.ForgottenPassword })));
const RecoverPassword = lazy(() => import("./pages/auth/RecoverPassword.tsx").then(module => ({ default: module.RecoverPassword })));
const SignIn = lazy(() => import("./pages/auth/SignIn.tsx").then(module => ({ default: module.SignIn })));
const Register = lazy(() => import("./pages/auth/Register.tsx").then(module => ({ default: module.Register })));
const ErrorPage = lazy(() => import("./pages/errors/NotFoundErrorPage.tsx").then(module => ({ default: module.NotFoundErrorPage })));
const Demos = lazy(() => import("./pages/demos/Demos.tsx").then(module => ({ default: module.Demos })));
const Demo = lazy(() => import("./pages/demos/Demo.tsx").then(module => ({ default: module.Demo })));
// Panely `admin` (port 5174) a `editor` (port 5175) jsou kompletně zmigrované do samostatných projektů.

const MyPortfolio = lazy(() => import("./pages/profile/portfolio/MyPortfolio.tsx").then(module => ({ default: module.MyPortfolio })));
const EditMyPortfolio = lazy(() => import("./pages/profile/portfolio/EditMyPortfolio.tsx").then(module => ({ default: module.EditMyPortfolio })));
const MyPortfolioDetails = lazy(() => import("./pages/profile/portfolio/MyPortfolioDetails.tsx").then(module => ({ default: module.MyPortfolioDetails })));
const Profile = lazy(() => import("./pages/profile/Profile.tsx").then(module => ({ default: module.Profile })));
const ProfileOverview = lazy(() => import("./pages/profile/ProfileOverview.tsx").then(module => ({ default: module.ProfileOverview })));
const ProfileAchievements = lazy(() => import("./pages/profile/settings/ProfileAchievements.tsx").then(module => ({ default: module.ProfileAchievements })));
const ProfileMembership = lazy(() => import("./pages/profile/settings/ProfileMembership.tsx").then(module => ({ default: module.ProfileMembership })));
const ProfileEdit = lazy(() => import("./pages/profile/ProfileEdit.tsx").then(module => ({ default: module.ProfileEdit })));
const ProfileSessions = lazy(() => import("./pages/profile/settings/ProfileSessions.tsx").then(module => ({ default: module.ProfileSessions })));
const MyWatchList = lazy(() => import("./pages/profile/custom/MyWatchList.tsx").then(module => ({ default: module.MyWatchList })));

// const Overview = lazy(() => import("./pages/Overview.tsx").then(module => ({ default: module.Overview })));
// const Guide = lazy(() => import("./pages/guide/Guide.tsx").then(module => ({ default: module.Guide })));
// const GuidedInvestControlGuide = lazy(() => import ("./pages/guide/GuidedInvestControlGuide.tsx").then(module => ({ default: module.GuidedInvestControlGuide })));
// const PersonalStrategyGuide = lazy(() => import ("./pages/guide/PersonalStrategyGuide.tsx").then(module => ({ default: module.PersonalStrategyGuide })));

const CooperationInfo = lazy(() => import ("./pages/information/CooperationInfo.tsx").then(module => ({ default: module.CooperationInfo })));
const GdprInfo = lazy(() => import ("./pages/information/GDPRInfo.tsx").then(module => ({ default: module.GdprInfo })));
const CookiesInfo = lazy(() => import ("./pages/information/CookiesInfo.tsx").then(module => ({ default: module.CookiesInfo })));
// const WhyLogin = lazy(() => import ("./pages/WhyLogin.tsx").then(module => ({ default: module.WhyLogin })));
const Welcome = lazy(() => import ("./pages/welcome/Welcome.tsx").then(module => ({ default: module.Welcome })));
const WelcomePremium = lazy(() => import ("./pages/welcome/WelcomePremium.tsx").then(module => ({ default: module.WelcomePremium })));


// Dříve staticky importované — tím pádem skončily v entry chunku, i když je většina
// uživatelů nikdy neotevře. Teď mají vlastní chunk jako zbytek routingu.
const Dashboard = lazy(() => import("./pages/profile/custom/Dashboard.tsx").then(module => ({ default: module.Dashboard })));
const BTFDTuningParameters = lazy(() => import("./pages/strategies/BTFDTuningParameters.tsx").then(module => ({ default: module.BTFDTuningParameters })));
const AssetCalculatorComponent = lazy(() => import("./components/index/AssetCalculatorComponent.tsx").then(module => ({ default: module.AssetCalculatorComponent })));
const MyInvestmentPlans = lazy(() => import("./pages/profile/investmentPlan/MyInvestmentPlans.tsx").then(module => ({ default: module.MyInvestmentPlans })));
const MyTrafficLights = lazy(() => import("./pages/profile/trafficLight/MyTrafficLight.tsx").then(module => ({ default: module.MyTrafficLights })));
const InvestmentPlanProvider = lazy(() => import("./utils/providers/InvestmentPlanProvider.tsx").then(module => ({ default: module.InvestmentPlanProvider })));
const NewInvestmentPlanIntro = lazy(() => import("./pages/profile/investmentPlan/NewInvestmentPlanIntro.tsx").then(module => ({ default: module.NewInvestmentPlanIntro })));
const NewInvestmentPlanName = lazy(() => import("./pages/profile/investmentPlan/NewInvestmentPlanName.tsx").then(module => ({ default: module.NewInvestmentPlanName })));
const NewInvestmentPlan = lazy(() => import("./pages/profile/investmentPlan/NewInvestmentPlan.tsx").then(module => ({ default: module.NewInvestmentPlan })));
const NewPortfolio = lazy(() => import("./pages/profile/investmentPlan/NewPortfolio.tsx").then(module => ({ default: module.NewPortfolio })));
const ChooseExistingPortfolio = lazy(() => import("./pages/profile/investmentPlan/ChooseExistingPortfolio.tsx").then(module => ({ default: module.ChooseExistingPortfolio })));
const RecurringInvestment = lazy(() => import("./pages/profile/investmentPlan/RecurringInvestment.tsx").then(module => ({ default: module.RecurringInvestment })));
const InvestedAmount = lazy(() => import("./pages/profile/investmentPlan/InvestedAmount.tsx").then(module => ({ default: module.InvestedAmount })));
const TrafficLights = lazy(() => import("./pages/profile/investmentPlan/TrafficLights.tsx").then(module => ({ default: module.TrafficLights })));
const EditInvestmentPlan = lazy(() => import("./pages/profile/investmentPlan/EditInvestmentPlan.tsx").then(module => ({ default: module.EditInvestmentPlan })));

const MainLayout: FC = () => {
    return (
        <>
            <UnverifiedHeaderInfo />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export const Router:FC = () => {
    return (
        <Routes>
            {/* No header, no footer */}
            <Route path={routes.signIn} element={<PageLoader><SignIn /></PageLoader>} />
            <Route path={routes.register} element={<PageLoader><Register /></PageLoader>} />

            {/* With header and footer */}
            <Route element={<MainLayout />}>
                <Route path={routes.home} element={<PageLoader><Index /></PageLoader>} />
                <Route path={routes.about} element={<PageLoader><About /></PageLoader>} />
                {/*<Route path={routes.overview} element={<PageLoader><Overview /></PageLoader>} />*/}
                <Route path={routes.contact} element={<PageLoader><Contact /></PageLoader>} />
                <Route path={routes.articles} element={<PageLoader><Articles /></PageLoader>} />
                <Route path={routes.article} element={<PageLoader><Article /></PageLoader>} />
                <Route path={routes.search} element={<PageLoader><SearchArticles /></PageLoader>} />
                <Route path={routes.assets} element={<PageLoader><Assets /></PageLoader>} />
                <Route path={routes.assetGraph} element={<PageLoader><AssetGraph /></PageLoader>} />
                {/*<Route path={routes.assetGraphCurrencyDetail} element={<PageLoader><AssetGraphCurrencyDetail /></PageLoader>} />*/}
                <Route path={routes.recommendation} element={<PageLoader><Recommendation /></PageLoader>} />
                <Route path={routes.dictionary} element={<PageLoader><Glossary /></PageLoader>} />
                <Route path={routes.cryptocurrenciesList} element={<PageLoader><CryptoCurrenciesList /></PageLoader>} />
                <Route path={routes.graphsRecommendationDetail} element={<PageLoader><CryptocurrencyDetails /></PageLoader>} />
                <Route path={routes.verifyAccount} element={<PageLoader><VerifyAccount /></PageLoader>} />
                <Route path={routes.forgottenPassword} element={<PageLoader><ForgottenPassword /></PageLoader>} />
                <Route path={routes.recoverPassword} element={<PageLoader><RecoverPassword /></PageLoader>} />
                <Route path={routes.demos} element={<PageLoader><Demos /></PageLoader>} />
                <Route path={routes.demo} element={<PageLoader><Demo /></PageLoader>} />
                <Route path={routes.cryptoCalculator} element={<PageLoader><AssetCalculatorComponent /></PageLoader>} />
                <Route path={routes.profile.profileURL} element={<PageLoader><Profile/></PageLoader>}>
                    <Route path={routes.profile.profileURL} element={<PageLoader><ProfileOverview /></PageLoader>}/>
                    <Route path={routes.profile.edit} element={<PageLoader><ProfileEdit/></PageLoader>}/>
                    <Route path={routes.profile.achievements} element={<PageLoader><ProfileAchievements/></PageLoader>}/>
                    <Route path={routes.profile.membership} element={<PageLoader><ProfileMembership/></PageLoader>} />
                    <Route path={routes.profile.myPortfolio} element={<PageLoader><MyPortfolio/></PageLoader>} />
                    <Route path={routes.profile.editMyPortfolio} element={<PageLoader><EditMyPortfolio/></PageLoader>} />
                    <Route path={routes.profile.myPortfolioDetails} element={<PageLoader><MyPortfolioDetails/></PageLoader>} />
                    <Route path={routes.profile.newMyPortfolio} element={<PageLoader><EditMyPortfolio/></PageLoader>} />
                    {/*<Route path={routes.profile.newInvestmentPlanIntro} element={<PageLoader><NewInvestmentPlanIntro/></PageLoader>} />*/}
                    <Route
                      path={routes.profile.newInvestmentPlanIntro}
                      element={
                          localStorage.getItem("skipNewInvestmentPlanIntro") === "true" ? (
                            <Navigate to={routes.profile.newInvestmentPlanName} replace />
                          ) : (
                            <PageLoader>
                                <NewInvestmentPlanIntro />
                            </PageLoader>
                          )
                      }
                    />
                    <Route path={routes.profile.dashboard} element={<PageLoader><Dashboard/></PageLoader>} />
                    <Route element={<PageLoader><InvestmentPlanProvider><Outlet /></InvestmentPlanProvider></PageLoader>}>
                        <Route path={routes.profile.newInvestmentPlanName} element={<PageLoader><NewInvestmentPlanName/></PageLoader>} />
                        <Route path={routes.profile.newInvestmentPlan} element={<PageLoader><NewInvestmentPlan/></PageLoader>} />
                        <Route path={routes.profile.newInvestmentPlanNewPortfolio} element={<PageLoader><NewPortfolio/></PageLoader>} />
                        <Route path={routes.profile.newInvestmentPlanExistingPortfolio} element={<PageLoader><ChooseExistingPortfolio/></PageLoader>} />
                        <Route path={routes.profile.newInvestmentPlanRecurringInvestment} element={<PageLoader><RecurringInvestment/></PageLoader>} />
                        <Route path={routes.profile.newInvestmentPlanInvestedAmount} element={<PageLoader><InvestedAmount/></PageLoader>} />
                        <Route path={routes.profile.newInvestmentPlanTrafficLights} element={<PageLoader><TrafficLights/></PageLoader>} />
                        <Route path={routes.profile.editInvestmentPlan} element={<PageLoader><InvestmentPlanProvider><EditInvestmentPlan/></InvestmentPlanProvider></PageLoader>} />
                        </Route>
                    <Route path={routes.profile.sessions} element={<PageLoader><ProfileSessions/></PageLoader>} />
                    <Route path={routes.profile.myInvestmentPlans} element={<PageLoader><MyInvestmentPlans/></PageLoader>} />
                    <Route path={routes.profile.myTrafficLights} element={<PageLoader><MyTrafficLights/></PageLoader>} />
                    <Route path={routes.profile.myWatchList} element={<PageLoader><MyWatchList/></PageLoader>} />
                </Route>
                {/* Panely `admin` (/admin/*) a `editor` (/editor/*) jsou kompletně zmigrované do vlastních projektů (port 5174 a 5175). */}
                {/*<Route path={guideURLS.index} element={<PageLoader><Guide /></PageLoader>}>*/}
                {/*    <Route path={routes.guides.guidedInvestControl} element={<PageLoader><GuidedInvestControlGuide /></PageLoader>} />*/}
                {/*    <Route path={routes.guides.personalStrategy} element={<PageLoader><PersonalStrategyGuide /></PageLoader>} />*/}
                {/*</Route>*/}
                <Route path={routes.cooperationInfo} element={<PageLoader><CooperationInfo /></PageLoader>} />
                <Route path={routes.gdprInfo} element={<PageLoader><GdprInfo /></PageLoader>} />
                <Route path={routes.cookiesInfo} element={<PageLoader><CookiesInfo /></PageLoader>} />
                {/*<Route path={routes.aboutLogin} element={<PageLoader><WhyLogin /></PageLoader>} />*/}
                <Route path="welcome" element={<PageLoader><Welcome /></PageLoader>} />
                <Route path="welcome/premium" element={<PageLoader><WelcomePremium /></PageLoader>} />
                <Route path="*" element={<PageLoader><ErrorPage /></PageLoader>} />
                <Route path={routes.BTFD} element={<PageLoader><BTFDTuningParameters/></PageLoader>} />
            </Route>
        </Routes>
    );
}