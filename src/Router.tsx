import {FC, lazy} from "react";
import {Route, Routes} from "react-router-dom";
import {adminURLS, editorURLS, guideURLS, routes} from "./utils/constants";
import {PageLoader} from "./components/reusable/PageLoader.tsx";
import {EditorOverview} from "./pages/editor/EditorOverview.tsx";
import {BTFDTuningParameters} from "./components/graphs/BTFDTuningParameters.tsx";
const Index = lazy(() => import("./pages/Index.tsx").then(module => ({ default: module.Index })));
const About = lazy(() => import("./pages/About.tsx").then(module => ({ default: module.About })));
const Contact = lazy(() => import("./pages/Contact.tsx").then(module => ({ default: module.Contact })));
const Articles = lazy(() => import("./pages/Articles.tsx").then(module => ({ default: module.Articles })));
const Article = lazy(() => import("./pages/Article.tsx").then(module => ({ default: module.Article })));
const SearchArticles = lazy(() => import("./pages/SearchArticles.tsx").then(module => ({ default: module.SearchArticles })));
const Assets = lazy(() => import("./pages/graphs/Assets.tsx").then(module => ({ default: module.Assets })));
const AssetGraph = lazy(() => import("./pages/graphs/AssetGraph.tsx").then(module => ({ default: module.AssetGraph })));
const AssetGraphCurrencyDetail = lazy(() => import("./pages/graphs/AssetGraphCurrencyDetail.tsx").then(module => ({ default: module.AssetGraphCurrencyDetail })));
const Recommendation = lazy(() => import("./pages/graphs/Recommendation.tsx").then(module => ({ default: module.Recommendation })));
const Glossary = lazy(() => import("./pages/Glossary.tsx").then(module => ({ default: module.Glossary })));
const CryptoCurrenciesList = lazy(() => import("./pages/CryptoCurrenciesList.tsx").then(module => ({ default: module.CryptoCurrenciesList })));
const CryptoCurrencyDetail = lazy(() => import("./pages/CryptoCurrencyDetail.tsx").then(module => ({ default: module.CryptoCurrencyDetail })));
const RecommendationDetails_new = lazy(() => import("./pages/graphs/RecommendationDetails_new.tsx").then(module => ({ default: module.RecommendationDetails_new })));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount.tsx").then(module => ({ default: module.VerifyAccount })));
const ForgottenPassword = lazy(() => import("./pages/ForgottenPassword.tsx").then(module => ({ default: module.ForgottenPassword })));
const RecoverPassword = lazy(() => import("./pages/RecoverPassword.tsx").then(module => ({ default: module.RecoverPassword })));
const SignIn = lazy(() => import("./pages/SignIn.tsx").then(module => ({ default: module.SignIn })));
const Register = lazy(() => import("./pages/Register.tsx").then(module => ({ default: module.Register })));
const ErrorPage = lazy(() => import("./pages/NotFoundErrorPage.tsx").then(module => ({ default: module.NotFoundErrorPage })));
const Demos = lazy(() => import("./pages/Demos.tsx").then(module => ({ default: module.Demos })));
const Demo = lazy(() => import("./pages/Demo.tsx").then(module => ({ default: module.Demo })));
const AdminDemos = lazy(() => import("./pages/admin/AdminDemos.tsx").then(module => ({ default: module.AdminDemos })));
const AdminDemoEdit = lazy(() => import("./pages/admin/AdminDemoEdit.tsx").then(module => ({ default: module.AdminDemoEdit })));
const Admin = lazy(() => import("./pages/admin/Admin.tsx").then(module => ({ default: module.Admin })));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview.tsx").then(module => ({ default: module.AdminOverview })));
const UserManagement = lazy(() => import("./pages/admin/AdminUserManagement.tsx").then(module => ({ default: module.AdminUserManagement })));
const NewsletterOverview = lazy(() => import("./pages/admin/AdminNewsletterOverview.tsx").then(module => ({ default: module.AdminNewsletterOverview })));
const ArticleManagement = lazy(() => import("./pages/editor/ArticleManagement.tsx").then(module => ({ default: module.ArticleManagement })));
const EditArticle = lazy(() => import("./pages/editor/EditArticle.tsx").then(module => ({ default: module.EditArticle })));
const ArticleComments = lazy(() => import("./pages/editor/ArticleComments.tsx").then(module => ({ default: module.ArticleComments })));
const ArticleShare = lazy(() => import("./pages/editor/ArticleShare.tsx").then(module => ({ default: module.ArticleShare })));
const ArticleTranslate = lazy(() => import("./pages/editor/ArticleTranslate.tsx").then(module => ({ default: module.ArticleTranslate })));
const TranslateEdit = lazy(() => import("./pages/editor/TranslateEdit.tsx").then(module => ({ default: module.TranslateEdit })));
const PostEdit = lazy(() => import("./pages/editor/PostEdit.tsx").then(module => ({ default: module.PostEdit })));
const GlossaryManagement = lazy(() => import("./pages/admin/AdminGlossaryManagement.tsx").then(module => ({ default: module.AdminGlossaryManagement })));
const LogTable = lazy(() => import("./pages/admin/AdminTableLog.tsx").then(module => ({ default: module.AdminTableLog })));
const Feedbacks = lazy(() => import("./pages/admin/AdminFeedbackManagement.tsx").then(module => ({ default: module.AdminFeedbackManagement })));
const AdminAchivements = lazy(() => import("./pages/admin/AdminAchievements.tsx").then(module => ({ default: module.AdminAchievements })));
const CoinSettings = lazy(() => import("./pages/admin/AdminCoinSettings.tsx").then(module => ({ default: module.AdminCoinSettings })));
const CachedData = lazy(() => import("./pages/admin/AdminChachedData.tsx").then(module => ({ default: module.AdminChachedData })));
const QRManagement = lazy(() => import("./pages/admin/AdminQRManagement.tsx").then(module => ({ default: module.AdminQRManagement })));
const MyPortfolio = lazy(() => import("./pages/profile/MyPortfolio.tsx").then(module => ({ default: module.MyPortfolio })));
const EditMyPortfolio = lazy(() => import("./pages/profile/EditMyPortfolio.tsx").then(module => ({ default: module.EditMyPortfolio })));
const MyPortfolioDetails = lazy(() => import("./pages/profile/MyPortfolioDetails.tsx").then(module => ({ default: module.MyPortfolioDetails })));
const Profile = lazy(() => import("./pages/profile/Profile.tsx").then(module => ({ default: module.Profile })));
const ProfileOverview = lazy(() => import("./pages/profile/ProfileOverview.tsx").then(module => ({ default: module.ProfileOverview })));
const ProfileAchievements = lazy(() => import("./pages/profile/ProfileAchievements.tsx").then(module => ({ default: module.ProfileAchievements })));
const ProfileMembership = lazy(() => import("./pages/profile/ProfileMembership.tsx").then(module => ({ default: module.ProfileMembership })));
const ProfileEdit = lazy(() => import("./pages/profile/ProfileEdit.tsx").then(module => ({ default: module.ProfileEdit })));
const ProfileSessions = lazy(() => import("./pages/profile/ProfileSessions.tsx").then(module => ({ default: module.ProfileSessions })));
const EditorIndex = lazy(() => import("./pages/editor/EditorIndex.tsx").then(module => ({ default: module.EditorIndex })));
const HighlightsList = lazy(() => import("./pages/editor/HighlightsList.tsx").then(module => ({ default: module.HighlightsList })));
const HighlightsEditor = lazy(() => import("./pages/editor/HighlightsEditor.tsx").then(module => ({ default: module.HighlightsEditor })));
const BinanceIndexAbout = lazy(() => import("./pages/admin/AdminBinanceIndexAbout.tsx").then(module => ({ default: module.AdminBinanceIndexAbout })));
const MyWatchList = lazy(() => import("./pages/profile/MyWatchList.tsx").then(module => ({ default: module.MyWatchList })));
const Overview = lazy(() => import("./pages/Overview.tsx").then(module => ({ default: module.Overview })));
const Guide = lazy(() => import("./pages/guide/Guide.tsx").then(module => ({ default: module.Guide })));
const GuidedInvestControlGuide = lazy(() => import ("./pages/guide/GuidedInvestControlGuide.tsx").then(module => ({ default: module.GuidedInvestControlGuide })));
const PersonalStrategyGuide = lazy(() => import ("./pages/guide/PersonalStrategyGuide.tsx").then(module => ({ default: module.PersonalStrategyGuide })));
const AdminGenericTableData = lazy(() => import ("./pages/admin/AdminGenericTableData.tsx").then(module => ({ default: module.AdminGenericTableData })));
const AdminGenericTableDataEdit = lazy(() => import ("./pages/admin/AdminGenericTableDataEdit.tsx").then(module => ({ default: module.AdminGenericTableDataEdit })));
const AdminGenericTableResults = lazy(() => import ("./pages/admin/AdminGenericTableResults.tsx").then(module => ({ default: module.AdminGenericTableResults })));
const AdminFormsOverview = lazy(() => import ("./pages/admin/AdminFormsOverview.tsx").then(module => ({ default: module.AdminFormsOverview })));
const AdminFormResponses = lazy(() => import ("./pages/admin/AdminFormResponses.tsx").then(module => ({ default: module.AdminFormResponses })));
const CooperationInfo = lazy(() => import ("./pages/CooperationInfo.tsx").then(module => ({ default: module.CooperationInfo })));
const GdprInfo = lazy(() => import ("./pages/GDPRInfo.tsx").then(module => ({ default: module.GdprInfo })));
const CookiesInfo = lazy(() => import ("./pages/CookiesInfo.tsx").then(module => ({ default: module.CookiesInfo })));
const WhyLogin = lazy(() => import ("./pages/WhyLogin.tsx").then(module => ({ default: module.WhyLogin })));
const Welcome = lazy(() => import ("./pages/welcome/Welcome.tsx").then(module => ({ default: module.Welcome })));
const WelcomePremium = lazy(() => import ("./pages/welcome/WelcomePremium.tsx").then(module => ({ default: module.WelcomePremium })));
const FormEvaulationSettings = lazy(() => import ("./pages/admin/FormEvaulationSettings.tsx").then(module => ({ default: module.FormEvaulationSettings })));

export const Router:FC = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<PageLoader><Index /></PageLoader>} />
            <Route path={routes.about} element={<PageLoader><About /></PageLoader>} />
            <Route path={routes.overview} element={<PageLoader><Overview /></PageLoader>} />
            <Route path={routes.contact} element={<PageLoader><Contact /></PageLoader>} />
            <Route path={routes.articles} element={<PageLoader><Articles /></PageLoader>} />
            <Route path={routes.article} element={<PageLoader><Article /></PageLoader>} />
            <Route path={routes.search} element={<PageLoader><SearchArticles /></PageLoader>} />
            <Route path={routes.assets} element={<PageLoader><Assets /></PageLoader>} />
            <Route path={routes.assetGraph} element={<PageLoader><AssetGraph /></PageLoader>} />
            <Route path={routes.assetGraphCurrencyDetail} element={<PageLoader><AssetGraphCurrencyDetail /></PageLoader>} />
            <Route path={routes.recommendation} element={<PageLoader><Recommendation /></PageLoader>} />
            <Route path={routes.dictionary} element={<PageLoader><Glossary /></PageLoader>} />
            <Route path={routes.cryptocurrenciesList} element={<PageLoader><CryptoCurrenciesList /></PageLoader>} />
            <Route path={routes.cryptocurrencyDetail} element={<PageLoader><CryptoCurrencyDetail /></PageLoader>} />
            <Route path={routes.graphsRecommendationDetail} element={<PageLoader><RecommendationDetails_new /></PageLoader>} />                                                   {/**/}
            <Route path={routes.signIn} element={<PageLoader><SignIn /></PageLoader>} />
            <Route path={routes.register} element={<PageLoader><Register /></PageLoader>} />
            <Route path={routes.verifyAccount} element={<PageLoader><VerifyAccount /></PageLoader>} />
            <Route path={routes.forgottenPassword} element={<PageLoader><ForgottenPassword /></PageLoader>} />
            <Route path={routes.recoverPassword} element={<PageLoader><RecoverPassword /></PageLoader>} />
            <Route path={routes.demos} element={<PageLoader><Demos /></PageLoader>} />
            <Route path={routes.demo} element={<PageLoader><Demo /></PageLoader>} />
            <Route path={routes.profile.profileURL} element={<PageLoader><Profile/></PageLoader>}>
                <Route path={routes.profile.profileURL} element={<PageLoader><ProfileOverview /></PageLoader>}/>
                <Route path={routes.profile.edit} element={<PageLoader><ProfileEdit/></PageLoader>}/>
                <Route path={routes.profile.achievements} element={<PageLoader><ProfileAchievements/></PageLoader>}/>
                <Route path={routes.profile.membership} element={<PageLoader><ProfileMembership/></PageLoader>} />
                <Route path={routes.profile.myPortfolio} element={<PageLoader><MyPortfolio/></PageLoader>} />
                <Route path={routes.profile.editMyPortfolio} element={<PageLoader><EditMyPortfolio/></PageLoader>} />
                <Route path={routes.profile.myPortfolioDetails} element={<PageLoader><MyPortfolioDetails/></PageLoader>} />
                <Route path={routes.profile.newMyPortfolio} element={<PageLoader><EditMyPortfolio/></PageLoader>} />
                <Route path={routes.profile.sessions} element={<PageLoader><ProfileSessions/></PageLoader>} />
                <Route path={routes.profile.myWatchList} element={<PageLoader><MyWatchList/></PageLoader>} />
            </Route>
            <Route path={editorURLS.index} element={<EditorOverview />}>
                <Route path={routes.editor.index} element={<PageLoader><EditorIndex /></PageLoader>} />
                <Route path={routes.editor.articles} element={<PageLoader><ArticleManagement /></PageLoader>} />
                <Route path={routes.editor.articleNew} element={<PageLoader><EditArticle /></PageLoader>} />
                <Route path={routes.editor.articleEdit} element={<PageLoader><EditArticle /></PageLoader>} />
                <Route path={routes.editor.articleComments} element={<PageLoader><ArticleComments /></PageLoader>} />
                <Route path={routes.editor.articleShare} element={<PageLoader><ArticleShare /></PageLoader>} />
                <Route path={routes.editor.articleTranslate} element={<PageLoader><ArticleTranslate /></PageLoader>} />
                <Route path={routes.editor.translations} element={<PageLoader><TranslateEdit /></PageLoader>} />
                <Route path={routes.editor.translationsEdit} element={<PageLoader><TranslateEdit /></PageLoader>} />
                <Route path={routes.editor.postEdit} element={<PageLoader><PostEdit /></PageLoader>} />
                <Route path={routes.editor.highlights} element={<PageLoader><HighlightsList /></PageLoader>} />
                <Route path={routes.editor.highlitsEditor} element={<PageLoader><HighlightsEditor /></PageLoader>} />
                <Route path={routes.editor.highlightsNew} element={<PageLoader><HighlightsEditor /></PageLoader>} />
            </Route>
            <Route path={adminURLS.index} element={<PageLoader><Admin /></PageLoader>}>
                <Route path={routes.admin.index} element={<PageLoader><AdminOverview /></PageLoader>} />
                <Route path={routes.admin.users} element={<PageLoader><UserManagement /></PageLoader>} />
                <Route path={routes.admin.newsletter} element={<PageLoader><NewsletterOverview /></PageLoader>} />
                <Route path={routes.admin.glossary} element={<PageLoader><GlossaryManagement /></PageLoader>} />
                <Route path={routes.admin.logTable} element={<PageLoader><LogTable /></PageLoader>} />
                <Route path={routes.admin.feedbacks} element={<PageLoader><Feedbacks /></PageLoader>} />
                <Route path={routes.admin.achievements} element={<PageLoader><AdminAchivements /></PageLoader>} />
                <Route path={routes.admin.coinSettings} element={<PageLoader><CoinSettings /></PageLoader>} />
                <Route path={routes.admin.chachedData} element={<PageLoader><CachedData /></PageLoader>} />
                <Route path={routes.admin.qr} element={<PageLoader><QRManagement /></PageLoader>} />
                <Route path={routes.admin.demos} element={<PageLoader><AdminDemos /></PageLoader>} />
                <Route path={routes.admin.editDemo} element={<PageLoader><AdminDemoEdit /></PageLoader>} />
                <Route path={routes.admin.newDemo} element={<PageLoader><AdminDemoEdit /></PageLoader>} />
                <Route path={routes.admin.binanceIndexAbout} element={<PageLoader><BinanceIndexAbout /></PageLoader>} />
                <Route path={routes.admin.genericTableData} element={<PageLoader><AdminGenericTableData /></PageLoader>} />
                <Route path={routes.admin.newGenericTableData} element={<PageLoader><AdminGenericTableDataEdit /></PageLoader>} />
                <Route path={routes.admin.editGenericTableData} element={<PageLoader><AdminGenericTableDataEdit /></PageLoader>} />
                <Route path={routes.admin.genericsTableData} element={<PageLoader><AdminGenericTableResults /></PageLoader>} />
                <Route path={routes.admin.forms} element={<PageLoader><AdminFormsOverview /></PageLoader>} />
                <Route path={routes.admin.formResponses} element={<PageLoader><AdminFormResponses /></PageLoader>} />
                <Route path={routes.admin.formEvaulationSettings} element={<PageLoader><FormEvaulationSettings /></PageLoader>} />
            </Route>
            <Route path={guideURLS.index} element={<PageLoader><Guide /></PageLoader>}>
                <Route path={routes.guides.guidedInvestControl} element={<PageLoader><GuidedInvestControlGuide /></PageLoader>} />
                <Route path={routes.guides.personalStrategy} element={<PageLoader><PersonalStrategyGuide /></PageLoader>} />
            </Route>
            <Route path={routes.cooperationInfo} element={<PageLoader><CooperationInfo /></PageLoader>} />
            <Route path={routes.gdprInfo} element={<PageLoader><GdprInfo /></PageLoader>} />
            <Route path={routes.cookiesInfo} element={<PageLoader><CookiesInfo /></PageLoader>} />
            <Route path={routes.aboutLogin} element={<PageLoader><WhyLogin /></PageLoader>} />
            <Route path="welcome" element={<PageLoader><Welcome /></PageLoader>} />
            <Route path="welcome/premium" element={<PageLoader><WelcomePremium /></PageLoader>} />
            <Route path="*" element={<PageLoader><ErrorPage /></PageLoader>} />
            <Route path="BTFDTuning" element={<PageLoader><BTFDTuningParameters/></PageLoader>} />

        </Routes>
    );
}