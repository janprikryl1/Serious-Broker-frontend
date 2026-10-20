import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const GoogleTranslation: FC = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const addScript = document.createElement('script');
        addScript.setAttribute(
            'src',
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        document.body.appendChild(addScript);

        // @ts-ignore
        window.googleTranslateElementInit = googleTranslateElementInit;

        return () => {
            document.body.removeChild(addScript);
            // @ts-ignore
            delete window.googleTranslateElementInit;
        };
    }, []);

    const googleTranslateElementInit = () => {
        // @ts-ignore
        const layout = google.translate.TranslateElement.InlineLayout.SIMPLE
        // @ts-ignore
        new window.google.translate.TranslateElement(
            {
                pageLanguage: i18n.language,
                includedLanguages:
                    "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi,fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia,id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la,lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt,ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR,pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr,sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt,tum,tw,ug,uk,ur,uz,vi,wo,xh,yi,yo,zh-CN,zh-TW,zu",
                layout: layout,
                autoDisplay: false
            },
            'google_translate_element'
        );
    };

    return <div id="google_translate_element" />;
};
