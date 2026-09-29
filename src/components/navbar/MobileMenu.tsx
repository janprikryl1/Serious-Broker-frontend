import {FC, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {notRegisteredUserNavbarURLs, registeredUserNavbarURLs} from "../../utils/constants";
import {AccordionToggleIcon} from "../reusable/AccordionToggleIcon.tsx";
import {SignUpIcon} from "./headerIcons/SignUpIcon.tsx";
import {SignInIcon} from "./headerIcons/SignInIcon.tsx";
import {ChangeLanguageIcon} from "./headerIcons/languageSwitchIcon/ChangeLanguageIcon.tsx";
import {useMediaQuery} from "@mui/material";

type Props = {
  toggleMobileMenu: () => void;
  isOpen: boolean;
};

export const MobileMenu: FC<Props> = ({ toggleMobileMenu, isOpen }) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const isTablet = useMediaQuery("(max-width: 1457px)");

  const menuLinks = user ? registeredUserNavbarURLs : notRegisteredUserNavbarURLs;
  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleDropdownClick = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <div className={`mobile-menu ${isOpen ? "is-open" : ""}`}>
      <div className={`d-flex flex-column align-items-center justify-content-center mt-3 mb-3 pb-3 ${!isTablet || user ? "hidden" : "border-bottom"} `} style={{width: "90%"}}>
        <div className={"w-75"}>
          <div className={"d-flex align-items-center justify-content-center mb-3 w-100 "}>
            {!user && isMobile && (
              <div className="me-2 fw-bold" style={{color: "var(--white-color)"}}>
                <SignUpIcon/>
              </div>
            )}

            {!user && isTablet && (
              <div className={`${isMobile? "ms-2" : ""}`}>
                <SignInIcon />
              </div>
            )}
          </div>

          {isMobile && (
            <div className={"tw-flex tw-justify-between tw-items-center tw-w-full tw-text-sm sm:tw-text-base tw-text-stone-300"}>
              <span>{t("Language")}</span>
              <div className="">
                <ChangeLanguageIcon />
              </div>
            </div>
          )}
        </div>
      </div>

      <ul className="mobile-menu-list">
        {Object.keys(menuLinks).map((key) => {
          const item = menuLinks[key];

          if ("subLinks" in item) {
            const isOpen = openDropdown === key;
            const isDropdownActive = Object.values(item.subLinks).some((sub) => isActive(sub.link));

            return (
              <li className="mobile-dropdown-item" key={key}>
                <div
                  className={`dropdown-trigger !tw-text-base sm:!tw-text-lg md:!tw-text-xl ${isDropdownActive ? "active-yellow" : ""}`}
                  onClick={() => handleDropdownClick(key)}
                >
                  <span>{t(item.title)}</span>
                  <AccordionToggleIcon isOpen={isOpen} size={18} />
                </div>

                {/* Accordion vysúvanie */}
                <div className={`mobile-submenu ${isOpen ? "visible" : ""}`}>
                  {Object.keys(item.subLinks).map((subKey) => (
                    <Link
                      to={item.subLinks[subKey].link}
                      key={subKey}
                      onClick={toggleMobileMenu}
                      className={`submenu-link !tw-text-sm sm:!tw-text-base md:!tw-text-lg ${isActive(item.subLinks[subKey].link) ? "active-yellow" : ""}`}
                    >
                      {t(item.subLinks[subKey].title)}
                    </Link>
                  ))}
                </div>
              </li>
            );
          }

          return (
            <li key={key}>
              <Link
                to={item.link}
                onClick={toggleMobileMenu}
                className={`link-underline-none !tw-text-base sm:!tw-text-lg md:!tw-text-xl ${isActive(item.link) ? "active-yellow" : ""}`}
              >
                {t(item.title)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
