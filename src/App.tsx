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
import {Dictionary} from "./pages/Dictionary.tsx";
import {SearchArticles} from "./pages/SearchArticles.tsx";
import {CryptoCurrencyDetail} from "./pages/CryptoCurrencyDetail.tsx";
import {RecommendationDetails} from "./pages/graphs/RecommendationDetails.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import {Register} from "./pages/Register.tsx";
import {ProviderUser} from "./utils/providers/providerUser.tsx";
import {Profile} from "./pages/Profile.tsx";

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
                  <Route path="/recommendation" element={<Recommendation/>}/>
                  <Route path="/dictionary" element={<Dictionary/>}/>
                  <Route path="/crypto_currencies_list" element={<CryptoCurrenciesList/>}/>
                  <Route path="/cryptocurrency_detail/:id" element={<CryptoCurrencyDetail/>}/>
                  <Route path="/graphs/recommendation/detail/:asset_label" element={<RecommendationDetails/>}/>
                  <Route path="/sign_in" element={<SignIn/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="*" element={<ErrorPage/>}/>
              </Routes>
            <Footer/>
          </ProviderUser>
      </BrowserRouter>
  )
}

export default App



