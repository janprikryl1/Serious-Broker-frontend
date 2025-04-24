import {BrowserRouter} from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core';
import AOS from 'aos';
import { useEffect } from "react";
import "./i18n";
import { ThemeProvider } from "./utils/providers/ThemeProvider.tsx";
import { ProviderUser } from "./utils/providers/providerUser.tsx";
import { AchievementsProvider } from "./utils/providers/AchievementsProvider.tsx";
import {UnverifiedHeaderInfo} from "./components/navbar/UnverifiedHeaderInfo.tsx";
import {Header} from "./components/navbar/Header.tsx";
import {Footer} from "./components/navbar/Footer.tsx";
import {Router} from "./Router.tsx";

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
                    <AchievementsProvider>
                        <UnverifiedHeaderInfo />
                        <Header />
                        <Router />
                        <Footer />
                    </AchievementsProvider>
                </ProviderUser>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
