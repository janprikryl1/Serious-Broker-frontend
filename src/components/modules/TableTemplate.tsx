import {FC, ReactNode} from "react";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";
import {useTranslation} from "react-i18next";

type Props = {
    title: string;
    children: ReactNode;
}

export const TableTemplate:FC<Props> = ({title, children}) => {
    const {theme} = useThemeContext();
    const {t} = useTranslation();
    
    return (
        <div className="padding-bottom">
            <div className="cta__wrapper">
                <div className="cta__newsletter d-flex justify-content-center">
                    <div
                        style={{
                            gap: "10px",
                            backgroundColor: theme === 'dark' ? "#343a40" : "#f5f8fb",
                            borderRadius: 24,
                            padding: 30,
                            zIndex: 2,
                            position: 'relative',
                        }}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <div className="cta__subscribe">
                            <h2>
                                <span>{t(title)}</span>
                            </h2>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}