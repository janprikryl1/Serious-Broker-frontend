import {CSSProperties, FC, FormEvent, useState} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {routes} from "../../utils/constants";
import {SearchBar} from "../reusable/SearchBar.tsx";
import {GlassCard} from "../reusable/GlassCard.tsx";
import {captureEvent} from "../../utils/posthog.ts";

type Props = {
    param?: string;
    showTitle?: boolean;
    style?: CSSProperties;
};

export const SidebarSearch: FC<Props> = ({ param = "", showTitle = true, style }) => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState(param);
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = searchText.trim();
        if (trimmed) {
            captureEvent('articles_searched', { query: trimmed });
            navigate(`${routes.searchURL}${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <GlassCard bgColor="var(--secondary-color)" opacity={0.1}>
            {showTitle && <h6 className="mb-10">{t("Search articles")}</h6>}
            {/*<SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />*/}
            <form onSubmit={handleSearch}>
                <SearchBar
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
            </form>
        </GlassCard>
    );
};
