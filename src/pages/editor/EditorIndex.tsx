import {FC} from "react";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";
import step1 from "../../utils/icons/howToCreateArticle/step1.webp";
import step2 from "../../utils/icons/howToCreateArticle/step2.webp";
import step3 from "../../utils/icons/howToCreateArticle/step3.webp";
import step4 from "../../utils/icons/howToCreateArticle/step4.webp";
import step5 from "../../utils/icons/howToCreateArticle/step5.webp";
import step7 from "../../utils/icons/howToCreateArticle/step7.webp";

export const EditorIndex:FC = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <TitleHeader title={t("Help for editors")} />
            <div className="container padding-top padding-bottom">
                <h1 className="title-serious-broker">{t("How to create new article?")}</h1>
                <small>{t("First of all, you need to be an editor. If you are not, please contact us.")}</small>
                <br /><br />
                <p>{t("To enter the editor's area, click on the \"Editor\" button in the top right corner of the page.")}</p>
                <p>{t("You will be redirected to the editor's area. Here you can create new article.")}</p>
                <img src={step1} alt="step1" />
                <p>{t("1. Click on the \"New Article\" button.")}</p>
                <p>{t("2. Enter the title, description and another required fields.")}</p>
                <img src={step2} alt="step2" />
                <p>{t("3. Choose article template.")}</p>
                <img src={step3} alt="step3" />
                <p>{t("4. Go to next step via next button.")}</p>
                <img src={step4} alt="step4" />
                <p>{t("5. Fill in the form containing subjects and the article content.")}</p>
                <img src={step5} alt="step5" />
                <p>{t("3. Click on the \"Create\" button.")}</p>
                <img src={step7} alt="step7" />
                <p>{t("Now you can edit, translate, delete or share your article.")}</p>
            </div>
        </>
    );
};