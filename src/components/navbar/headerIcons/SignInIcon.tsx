import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {adminURLS, editorURLS, routes} from "../../../utils/constants";
import {UserRole} from "../../../utils/types/user/userTypes.ts";
import {Button} from "../../reusable/Button.tsx";
import {RiAdminLine, RiEditLine, RiIdCardLine, RiLogoutBoxRLine, RiUserFollowLine, RiUserLine} from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { TbUserEdit } from "react-icons/tb";
import {LiaUserEditSolid} from "react-icons/lia";
import {FiEdit3} from "react-icons/fi";
import {useMediaQuery} from "@mui/material";

export const SignInIcon: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();
    const isMobile = useMediaQuery("(max-width: 820px)");

    return (
        user ? (
            <Dropdown className="">
                <Dropdown.Toggle className={`sign-in-dropdown d-flex align-items-center ${isMobile ? "p-1" : "p-3"}`} style={{ lineHeight: "1" }}>
                  {isMobile ? <RiUserLine size={20} /> : `${user.firstname} ${user.surname}`}
                </Dropdown.Toggle>
                <Dropdown.Menu className="glass-effect">
                    <Dropdown.Item as={Link} to={routes.profile.profileURL} className={"d-flex gap-2 align-items-center"} >
                       <RiUserLine />
                       {t("Profile")}
                    </Dropdown.Item>
                  <Dropdown.Item as={Link} to={routes.profile.edit} className={"d-flex gap-2 align-items-center"} >
                    <FiEdit3 />
                    {t("Edit profile")}
                  </Dropdown.Item>
                    <Dropdown.Item as={Link} to={routes.profile.membership} className={"d-flex gap-2 align-items-center"} >
                      <RiIdCardLine />
                        {t("Membership")}
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={routes.profile.achievements} className={"d-flex gap-2 align-items-center"} >
                        <FaTrophy />
                        {t("Achievements")}
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={routes.profile.sessions} className={"d-flex gap-2 align-items-center"} >
                        <FaHistory />
                        {t("Sessions")}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {(user.role === UserRole.Editor || user.role === UserRole.Admin || user.role === UserRole.Manager) && (
                        <Dropdown.Item as={Link} to={editorURLS.articles} className={"d-flex gap-2 align-items-center"} >
                            <RiUserFollowLine />
                            Editor panel
                        </Dropdown.Item>
                    )}
                    {(user.role === UserRole.Admin || user.role === UserRole.Manager) && (
                        <Dropdown.Item as={Link} to={adminURLS.index} className={"d-flex gap-2 align-items-center" }>
                            <RiAdminLine />
                            Admin panel
                        </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout} >
                        <div className={"d-flex gap-2 align-items-center"} style={{color: "var(--red-on-primary-color)", fontWeight: "bold"}}>
                          <RiLogoutBoxRLine />
                          {t("Logout")}
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ) : (
            <Button type="link" to={routes.signIn} style={{padding: "10px"}}>
                {t("Sign in")}
            </Button>
        )
    );
}
