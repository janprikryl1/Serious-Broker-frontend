import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {About} from "./pages/About.tsx";
import {ErrorPage} from "./pages/ErrorPage.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Header} from "./components/Header.tsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/css/swiper-bundle.min.css';
import './styles/sass/style.scss';
import {useEffect} from "react";
import {Footer} from "./components/Footer.tsx";
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
                      <Route path={routes.recommendation} element={<Recommendation/>}/>
                      <Route path={routes.dictionary} element={<Glossary/>}/>
                      <Route path={routes.cryptocurrenciesList} element={<CryptoCurrenciesList/>}/>
                      <Route path={routes.cryptocurrencyDetail} element={<CryptoCurrencyDetail/>}/>
                      <Route path={routes.graphsRecommendationDetail} element={<RecommendationDetails/>}/>
                      <Route path={routes.signIn} element={<SignIn/>}/>
                      <Route path={routes.register} element={<Register/>}/>
                      <Route path={routes.profile} element={<Profile/>}/>
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
                          <Route path={routes.admin.glossary} element={<GlossaryManagement />} />
                          <Route path={routes.admin.logTable} element={<LogTable />} />
                          <Route path={routes.admin.feedbacks} element={<Feedbacks />} />
                      </Route>
                      <Route path={routes.inquiry} element={<InquiryPrice />}/>
                      <Route path="*" element={<ErrorPage/>}/>
                  </Routes>
                <Footer/>
              </ProviderUser>
          </ThemeProvider>
      </BrowserRouter>
  )
}

export default App



