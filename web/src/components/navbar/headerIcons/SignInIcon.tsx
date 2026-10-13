import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Dropdown} from "react-bootstrap";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {adminURLS, editorURLS, internalToolsURLS, routes} from "../../../utils/constants";
import {UserRole} from "../../../utils/types/user/userTypes.ts";
import {Button} from "../../reusable/Button.tsx";
import {RiAdminLine, RiIdCardLine, RiLogoutBoxRLine, RiToolsLine, RiUserFollowLine} from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { CircleUser } from "lucide-react";
import {FaTrophy} from "react-icons/fa";
import {FaHistory} from "react-icons/fa";
import {FiEdit3} from "react-icons/fi";
import {useMediaQuery} from "@mui/material";

export const SignInIcon: FC = () => {
  const {t} = useTranslation();
  const {user, logout} = useUserContext();
  const isMobile = useMediaQuery("(max-width: 820px)");

  return (
    user ? (
      <Dropdown align={isMobile ? "end" : undefined}>
        <Dropdown.Toggle
          className={`d-flex align-items-center ${
            isMobile
              ? "sign-in-dropdown--mobile"
              : "sign-in-dropdown p-3"
          }`}
          style={{lineHeight: "1"}}
        >
          {isMobile ? (
            <CircleUser size={24} strokeWidth={1.5} className="tw-text-white" />
          ) : (
            `${user.firstname} ${user.surname}`
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu className="">
          <Dropdown.Item as={Link} to={routes.profile.profileURL} className={"d-flex gap-2 align-items-center"}>
            <FaRegCircleUser/>
            {t("Profile")}
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.profile.edit} className={"d-flex gap-2 align-items-center"}>
            <FiEdit3/>
            {t("Edit profile")}
          </Dropdown.Item>
          {/*<Dropdown.Item as={Link} to={routes.profile.membership} className={"d-flex gap-2 align-items-center"}>
            <RiIdCardLine/>
            {t("Membership")}
          </Dropdown.Item>*/}
          <Dropdown.Item as={Link} to={routes.profile.achievements} className={"d-flex gap-2 align-items-center"}>
            <FaTrophy/>
            {t("Achievements")}
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.profile.sessions} className={"d-flex gap-2 align-items-center"}>
            <FaHistory/>
            {t("Sessions")}
          </Dropdown.Item>

          {(user.role === UserRole.Editor || user.role === UserRole.Admin || user.role === UserRole.Manager) && (
            <Dropdown.Divider/>
          )}
          {(user.role === UserRole.Editor || user.role === UserRole.Admin || user.role === UserRole.Manager) && (
            /*
             * Celý panel `editor` (/editor/*) je zmigrovaný do vlastního projektu `editor`
             * (port 5175, v produkci /editor/). Proto plná navigace přes `href`, ne `Link`.
             */
            <Dropdown.Item href={editorURLS.articles} className={"d-flex gap-2 align-items-center"}>
              <RiUserFollowLine/>
              Editor panel
            </Dropdown.Item>
          )}
          {(user.role === UserRole.Admin || user.role === UserRole.Manager) && (
            /*
             * ZÁMĚRNĚ `href`, ne `Link`. Admin je samostatný build a
             * react-router `Link` nedělá HTTP request — jen přepíše URL a
             * hledá routu v tomhle SPA. Tu web už nemá (přesunula se do
             * projektu `admin`), takže by to skončilo na chybové stránce.
             * Full navigace přes `href` naopak projde reverse proxy, která ji
             * pošle na správný build.
             */
            <Dropdown.Item href={adminURLS.index} className={"d-flex gap-2 align-items-center"}>
              <RiAdminLine/>
              Admin panel
            </Dropdown.Item>
          )}
          {(user.role === UserRole.Admin || user.role === UserRole.Manager) && (
            /*
             * Samostatný projekt `internal-tools` (port 5176, v produkci /internal/).
             * Full navigace přes `href`, aby prošla přes reverse proxy na jeho build.
             */
            <Dropdown.Item href={internalToolsURLS.index} className={"d-flex gap-2 align-items-center"}>
              <RiToolsLine/>
              Interní nástroje
            </Dropdown.Item>
          )}
          {(user.role === UserRole.Editor || user.role === UserRole.Admin || user.role === UserRole.Manager) && (
            <Dropdown.Divider/>
          )}

          <Dropdown.Item onClick={logout}>
            <div className={"d-flex gap-2 align-items-center"}
                 style={{color: "var(--red-color)", fontWeight: "bold"}}>
              <RiLogoutBoxRLine/>
              {t("Logout")}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Button type="link" to={routes.signIn} style={{padding: "10px", fontSize: "16px"}}>
        {t("Sign in")}
      </Button>
    )
  );
}
