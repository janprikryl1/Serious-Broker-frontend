import {FC, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {NavbarDesktopMenu} from "./NavbarDesktopMenu.tsx";
import SeriousBrokerHandWriting from "../../utils/icons/logo/SB-logo-handwritten-white.svg";
import {MobileMenu} from "./MobileMenu.tsx";
import {useMediaQuery} from "@mui/material";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {routes} from "../../utils/constants";
import {ChangeLanguageIcon} from "./headerIcons/languageSwitchIcon/ChangeLanguageIcon.tsx";
import {SignUpIcon} from "./headerIcons/SignUpIcon.tsx";
import {SignInIcon} from "./headerIcons/SignInIcon.tsx";
import {FiMenu} from "react-icons/fi";

export const Header: FC = () => {
  const {user} = useUserContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isFixedPage = location.pathname === "/" || location.pathname === routes.home;
  const isMobile = useMediaQuery("(max-width: 820px)");
  const isTablet = useMediaQuery("(max-width: 1457px)");

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const menuColor = isMobileMenuOpen ? "var(--secondary-color)" : "var(--white-color)"
  useEffect(() => setMobileMenuOpen(false), [location.pathname]);

  return (
    <header className={`header-section header-section--style1 ${isFixedPage ? '!tw-fixed' : '!tw-sticky'}`}>
      <div className="header-wrapper">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="logo">
                <Link to={routes.home} aria-label="Serious Broker - home">
                  <img
                    className="wordmark"
                    src={SeriousBrokerHandWriting}
                    alt="Serious.Broker"
                  />
                </Link>
              </div>

              <div className="menu-area">
                <NavbarDesktopMenu/>
              </div>
            </div>

            <div className="d-flex align-items-center flex-nowrap">

              {!user && !isMobile && (
                <div className="px-3">
                  <SignUpIcon/>
                </div>
              )}

              {user || (!isMobile && !isTablet) ? (
                  <div className="mx-2">
                    <SignInIcon/>
                  </div>
              ) : null}

              {!isMobile && (
                  <div className="mx-2">
                    <ChangeLanguageIcon/>
                  </div>
              )}

              {isTablet || isMobile ?
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                  className="tw-bg-transparent tw-border-0 tw-p-0 tw-flex tw-items-center tw-cursor-pointer"
                >
                  <FiMenu size={30} style={{color: menuColor, marginLeft: "15px"}}/>
                </button> :
                null
              }
            </div>
          </div>
        </div>
      </div>

      <MobileMenu toggleMobileMenu={toggleMobileMenu} isOpen={isMobileMenuOpen} />
    </header>
  );
};
