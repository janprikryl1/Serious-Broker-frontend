import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../utils/providers/providerUser.tsx";
import { Dropdown } from "react-bootstrap";

export const SignInIcon: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();

    return (
        user ? (
            <Dropdown>
                <Dropdown.Toggle variant="warning">
                    {user.firstname} {user.surname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                        {t("Profile")}
                    </Dropdown.Item>
                    {user.role === "admin" && (
                        <Dropdown.Item as={Link} to="/admin">
                            Admin panel
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={logout}>
                        {t("Logout")}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ) : (
            <Link
                to="/sign_in"
                className="trk-btn--border trk-btn--primary none"
                style={{ color: "black", borderRadius: "10px" }}
            >
                {t("Sign in")}
            </Link>
        )
    );
}
