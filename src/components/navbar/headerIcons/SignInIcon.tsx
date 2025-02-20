import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {adminURLS, editorURLS, routes} from "../../../utils/constants";
import {UserRole} from "../../../utils/types/user/userTypes.ts";
import {Button} from "../../reusable/Button.tsx";

export const SignInIcon: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();

    return (
        user ? (
            <Dropdown className="trk-btn--border trk-btn--primary link-underline-none">
                <Dropdown.Toggle variant="warning" style={{color: "black", borderRadius: "3px", fontWeight: "bold"}}>
                    {user.firstname} {user.surname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={routes.profile.profileURL}>
                        {t("Profile")}
                    </Dropdown.Item>
                    {(user.role === UserRole.Editor || user.role === UserRole.Admin || user.role === UserRole.Manager) && (
                        <Dropdown.Item as={Link} to={editorURLS.articles}>
                            Editor panel
                        </Dropdown.Item>
                    )}
                    {(user.role === UserRole.Admin || user.role === UserRole.Manager) && (
                        <Dropdown.Item as={Link} to={adminURLS.index}>
                            Admin panel
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={logout}>
                        {t("Logout")}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ) : (
            <Button type="link" to={routes.signIn} style={{fontSize: "20px", padding: "10px"}}>
                {t("Sign in")}
            </Button>
        )
    );
}
