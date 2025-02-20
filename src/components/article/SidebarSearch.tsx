import {FC, FormEvent, useState} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {routes} from "../../utils/constants";

type Props = {
    param?: string;
};

export const SidebarSearch: FC<Props> = ({ param = "" }) => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState(param);
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`${routes.searchURL}${encodeURIComponent(searchText.trim())}`);
        }
    };

    return (
        <div className="sidebar__search">
            <h6 className="mb-10">{t("Search Here")}</h6>
            <div className="sidebar__search-body">
                <form onSubmit={handleSearch}>
                    <div className="input">
                        <input
                            type="text"
                            className="form-control"
                            style={{borderRadius: 4}}
                            placeholder={t("Search articles")}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
