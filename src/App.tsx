import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {ErrorPage} from "./pages/ErrorPage.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Header} from "./components/Header.tsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/css/bootstrap.min.css';
import './styles/css/swiper-bundle.min.css';
import './styles/sass/style.scss';
import {useEffect} from "react";
import {Footer} from "./components/Footer.tsx";

// Disable automatic CSS addition for Font Awesome
config.autoAddCss = false;


function App() {
    useEffect(() => {
        AOS.init();
    }, []);
    
  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path={"/"} element={<Home/>} />
              <Route path={"/about"} element={<About/>} />
              <Route path={"/contact"} element={<Contact/>} />
              <Route path="*" element={<ErrorPage/>} />
          </Routes>
          <Footer />
      </BrowserRouter>
      )
}

export default App



