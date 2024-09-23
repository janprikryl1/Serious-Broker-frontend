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

// Disable automatic CSS addition for Font Awesome
config.autoAddCss = false;


function App() {
    useEffect(() => {
        AOS.init();
    }, []);
    
  return (
      <BrowserRouter>
          <ProviderUser>  
            <Header/>
              <Routes>
                  <Route path="/" element={<Index/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/articles" element={<Articles/>}/>
                  <Route path="/article/:id" element={<Article/>}/>
                  <Route path="/search/:text" element={<SearchArticles/>}/>
                  <Route path="/assets" element={<Assets/>}/>
                  <Route path="/most_profitable_assets" element={<MostProfitableAssets/>}/>
                  <Route path="/asset_graph/:id" element={<AssetGraph/>}/>
                  <Route path="/recommendation" element={<Recommendation/>}/>
                  <Route path="/dictionary" element={<Glossary/>}/>
                  <Route path="/crypto_currencies_list" element={<CryptoCurrenciesList/>}/>
                  <Route path="/cryptocurrency_detail/:id" element={<CryptoCurrencyDetail/>}/>
                  <Route path="/graphs/recommendation/detail/:asset_label" element={<RecommendationDetails/>}/>
                  <Route path="/sign_in" element={<SignIn/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/admin" element={<Admin />}>
                      <Route path="" element={<AdminOverview />} />
                      <Route path="users" element={<UserManagment />} />
                      <Route path="newsletter" element={<NewsletterOverview />} />
                      <Route path="articles" element={<ArticleManagement />} />
                      <Route path="articles/new" element={<EditArticle />} />
                      <Route path="articles/edit/:id" element={<EditArticle />} />
                      <Route path="article/comments/:id" element={<ArticleComments />} />
                      <Route path="article/share/:id" element={<ArticleShare />} />
                      <Route path="article/translate/:id" element={<ArticleTranslate />} />
                      <Route path="translations/:articleId" element={<TranslateEdit />} />
                      <Route path="translations/:articleId/:id" element={<TranslateEdit />} />
                      <Route path="glossary" element={<GlossaryManagement />} />
                      <Route path="log_table" element={<LogTable />} />
                  </Route>
                  <Route path="*" element={<ErrorPage/>}/>
              </Routes>
            <Footer/>
          </ProviderUser>
      </BrowserRouter>
  )
}

export default App



