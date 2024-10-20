import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {About} from "./pages/About.tsx";
import {ErrorPage} from "./pages/ErrorPage.tsx";
import {Contact} from "./pages/Contact.tsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/css/swiper-bundle.min.css';
import './styles/sass/style.scss';
import {useEffect} from "react";
import "./i18n";
import {Index} from "./pages/Index.tsx";
import {Articles} from "./pages/Articles.tsx";
import {Article} from "./pages/Article.tsx";
import {Assets} from "./pages/graphs/Assets.tsx";
import {Recommendation} from "./pages/graphs/Recommendation.tsx";
import {CryptoCurrenciesList} from "./pages/CryptoCurrenciesList.tsx";
import {Glossary} from "./pages/Glossary.tsx";
import {SearchArticles} from "./pages/SearchArticles.tsx";
import {CryptoCurrencyDetail} from "./pages/CryptoCurrencyDetail.tsx";
import {RecommendationDetails} from "./pages/graphs/RecommendationDetails.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import {Register} from "./pages/Register.tsx";
import {ProviderUser} from "./utils/providers/providerUser.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Admin} from "./pages/admin/Admin.tsx";
import {MostProfitableAssets} from "./pages/graphs/MostProfitableAssets.tsx";
import {AssetGraph} from "./pages/graphs/AssetGraph.tsx";
import {UserManagment} from "./pages/admin/UserManagment.tsx";
import {ArticleManagement} from "./pages/admin/ArticleManagement.tsx";
import {GlossaryManagement} from "./pages/admin/GlossaryManagement.tsx";
import {AdminOverview} from "./pages/admin/AdminOverview.tsx";
import {LogTable} from "./pages/admin/LogTable.tsx";
import {EditArticle} from "./pages/admin/EditArticle.tsx";
import {ArticleComments} from "./pages/admin/ArticleComments.tsx";
import {ArticleShare} from "./pages/admin/ArticleShare.tsx";
import {ArticleTranslate} from "./pages/admin/ArticleTranslate.tsx";
import {TranslateEdit} from "./pages/admin/TranslateEdit.tsx";
import {NewsletterOverview} from "./pages/admin/NewsletterOverview.tsx";
import {Feedbacks} from "./pages/admin/Feedbacks.tsx";
import {ThemeProvider} from "./utils/providers/ThemeProvider.tsx";
import {InquiryPrice} from "./pages/InquryPrice.tsx";
import {adminURLS, routes} from "./utils/constants";
import {AssetGraphCurrencyDetail} from "./pages/graphs/AssetGraphCurrencyDetail.tsx";
import {PostEdit} from "./pages/admin/PostEdit.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ProfileEdit} from "./pages/profile/ProfileEdit.tsx";
import {ProfileAchievements} from "./pages/profile/ProfileAchievements.tsx";
import {ProfileOverview} from "./pages/profile/ProfileOverview.tsx";
import {AchievmentsProvider} from "./utils/providers/AchievmentsProvider.tsx";
import {AdminAchivments} from "./pages/admin/AdminAchivments.tsx";
import {UnverifiedHeaderInfo} from "./components/UnverifiedHeaderInfo.tsx";
import {CoinSettings} from "./pages/admin/CoinSettings.tsx";
import {Header} from "./components/modules/navbar/Header.tsx";
import {Footer} from "./components/modules/navbar/Footer.tsx";
import {VerifyAccount} from "./pages/VerifyAccount.tsx";
import {ForgottenPassword} from "./pages/ForgottenPassword.tsx";
import {RecoverPassword} from "./pages/RecoverPassword.tsx";

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
                      <Header/>
                      <Routes>
                          <Route path={routes.home} element={<Index/>}/>
                          <Route path={routes.about} element={<About/>}/>
                          <Route path={routes.contact} element={<Contact/>}/>
                          <Route path={routes.articles} element={<Articles/>}/>
                          <Route path={routes.article} element={<Article/>}/>
                          <Route path={routes.search} element={<SearchArticles/>}/>
                          <Route path={routes.assets} element={<Assets/>}/>
                          <Route path={routes.mostProfitableAssets} element={<MostProfitableAssets/>}/>
                          <Route path={routes.assetGraph} element={<AssetGraph/>}/>
                          <Route path={routes.assetGraphCurrencyDetail} element={<AssetGraphCurrencyDetail/>}/>
                          <Route path={routes.recommendation} element={<Recommendation/>}/>
                          <Route path={routes.dictionary} element={<Glossary/>}/>
                          <Route path={routes.cryptocurrenciesList} element={<CryptoCurrenciesList/>}/>
                          <Route path={routes.cryptocurrencyDetail} element={<CryptoCurrencyDetail/>}/>
                          <Route path={routes.graphsRecommendationDetail} element={<RecommendationDetails/>}/>
                          <Route path={routes.signIn} element={<SignIn/>}/>
                          <Route path={routes.register} element={<Register/>}/>
                          <Route path={routes.profile.profileURL} element={<Profile/>}>
                              <Route path={routes.profile.profileURL} element={<ProfileOverview />}/>
                              <Route path={routes.profile.edit} element={<ProfileEdit/>}/>
                              <Route path={routes.profile.achievements} element={<ProfileAchievements/>}/>
                          </Route>
                          <Route path={routes.verifyAccount} element={<VerifyAccount />} />
                          <Route path={routes.forgottenPassword} element={<ForgottenPassword />} />
                          <Route path={routes.recoverPassword} element={<RecoverPassword />} />
                          <Route path={adminURLS.index} element={<Admin />}>
                              <Route path={routes.admin.index} element={<AdminOverview />} />
                              <Route path={routes.admin.users} element={<UserManagment />} />
                              <Route path={routes.admin.newsletter} element={<NewsletterOverview />} />
                              <Route path={routes.admin.articles} element={<ArticleManagement />} />
                              <Route path={routes.admin.articleNew} element={<EditArticle />} />
                              <Route path={routes.admin.articleEdit} element={<EditArticle />} />
                              <Route path={routes.admin.articleComments} element={<ArticleComments />} />
                              <Route path={routes.admin.articleShare} element={<ArticleShare />} />
                              <Route path={routes.admin.articleTranslate} element={<ArticleTranslate />} />
                              <Route path={routes.admin.translations} element={<TranslateEdit />} />
                              <Route path={routes.admin.translationsEdit} element={<TranslateEdit />} />
                              <Route path={routes.admin.postEdit} element={<PostEdit />} />
                              <Route path={routes.admin.glossary} element={<GlossaryManagement />} />
                              <Route path={routes.admin.logTable} element={<LogTable />} />
                              <Route path={routes.admin.feedbacks} element={<Feedbacks />} />
                              <Route path={routes.admin.achievements} element={<AdminAchivments />} />
                              <Route path={routes.admin.coinSettings} element={<CoinSettings />} />
                          </Route>
                          <Route path={routes.inquiry} element={<InquiryPrice />}/>
                          <Route path="*" element={<ErrorPage/>}/>
                      </Routes>
                    <Footer/>
                  </AchievmentsProvider>
              </ProviderUser>
          </ThemeProvider>
          <ToastContainer position="bottom-right"/>
      </BrowserRouter>
  )
}

export default App;