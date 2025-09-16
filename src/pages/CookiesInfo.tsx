import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";

export const CookiesInfo:FC = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <TitleHeader title="Cookies"/>
            <div className="container">
                <div className="cta-dark">
                <h1>{t("Information about Cookies")}</h1>
                <p>1. {t("What are the cookies?")}</p>
                <span>{t("Cookies are small text files that are stored on your computer or device when you visit our website.")}</span>

                <p>2. {t("Purpose of using cookies")}</p>
                <span>{t("We use cookies to ensure the effectiveness of your visits and purchases on our website. We also use them to make it easier for you to use our website and to understand your purchasing behaviour.")}</span>

                <p>3. {t("How we use cookies We use cookies for the following purposes")}:</p>
                <ul>
                    <li>a. {t("Retention of your login details.")}</li>
                    <li>b. {t("Your identification when you log in to our website.")}</li>
                    <li>c. {t("Information on offers and inquiries for companies and users.")}</li>
                    <li>d. {t("Save the products placed in your shopping cart in case you navigate to another site during your browsing session, navigate to checkout, or end your browsing session before completing your purchase.")}</li>
                    <li>e. {t("Collecting information to enable us to send you promotional communications relevant to your interests.")}</li>
                    <li>f. {t("Save viewing preferences, such as preferred language, text size, page layout, or preferred colours. This makes it faster and easier to navigate through our site.")}</li>
                    <li>g. {t("Obtaining analytical information, such as the number of visitors to our site and the most frequently visited pages on our site. We use the analytical information we obtain for marketing and resource planning purposes.")}</li>
                    <li>h. {t("Determining whether our customers and visitors easily adapt to changes on our website.")}</li>
                </ul>

                <p>4. {t("Information collected through cookies")}</p>
                <span>{t("Although cookies help us to collect information about how you use our website, we do not store any personal information in them. We only store a unique session identifier that helps us retrieve your preferences and user profile the next time you visit our website.")}</span>

                <p>5. {t("Types of cookies")}</p>
                <span>a. {t("Session cookies - these types of cookies are stored temporarily on your computer or device during a browsing session, and are removed from your computer or device when the browsing session ends.")}</span>
                <span>b. {t("Persistent cookies - these types of cookies are stored on your computer for a longer period of time. Persistent cookies are used when we need to identify you across more than one browsing session.")}</span>

                <p>6. {t("Cookie management The user menus of most browsers offer the possibility to manage cookies by editing or configuring the settings related to these files. The browser typically offers the following options:")}</p>
                <span>a. {t("View cookies.")}</span>
                <span>b. {t("Enable cookies.")}</span>
                <span>c. {t("Disable all or specific cookies.")}</span>
                <span>d. {t("Disable all cookies when you close your browser.")}</span>
                <span>e. {t("Block cookies.")}</span>
                <span>f. {t("Show notification if you accept a cookie.")}</span>

                <p>{t("Please note that if you block our cookies in your browser settings, you may not be able to access certain features on our website, such as the shopping cart, order management or customization, and your overall experience on our website may also be affected. If you choose to delete all cookies in your browser, the preferences associated with your browser will be removed when you close your browser.Please note that unless you have adjusted your browser settings to reject cookies, our system will send cookies as soon as you visit one of our websites.")}</p>
                <p>{t("Learn more about cookies")}</p>
                <a href="www.allaboutcookies.org">www.allaboutcookies.org</a>
                <br/>
                <a href="www.youronlinechoices.eu">www.youronlinechoices.eu</a>
                <br/>
                <a href="www.international-chamber.co.uk/our-expertise/digitaleconomy">www.international-chamber.co.uk/our-expertise/digitaleconomy</a>
                <br/>
                <a href="http://www.cnil.fr/vos-libertes/vos-traces/les-cookies/">http://www.cnil.fr/vos-libertes/vos-traces/les-cookies/</a>
            </div>
            </div>
        </>
    )
}