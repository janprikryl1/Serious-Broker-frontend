import {config} from '@fortawesome/fontawesome-svg-core';
import AOS from 'aos';
import {useEffect} from "react";
import "./i18n";
import {ThemeProvider} from "./utils/providers/ThemeProvider.tsx";
import {ProviderUser} from "./utils/providers/providerUser.tsx";
import {AchievementsProvider} from "./utils/providers/AchievementsProvider.tsx";
import {Router} from "./Router.tsx";
import VantaBackground from "./components/index/VantaBackground.tsx";
import {CustomToaster} from "./components/reusable/CustomToaster.tsx";
import {CookieBanner} from "./components/reusable/CookieBanner.tsx";

// Disable automatic CSS addition for Font Awesome
config.autoAddCss = false;

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      <ThemeProvider>
        <ProviderUser>
          <AchievementsProvider>
            <VantaBackground/>
            <Router/>
            <CustomToaster/>
            <CookieBanner/>
          </AchievementsProvider>
        </ProviderUser>
      </ThemeProvider>
    </>
  );
}

export default App;
