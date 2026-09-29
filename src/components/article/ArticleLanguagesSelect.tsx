import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {useTranslation} from "react-i18next";
import {TranslationsOverview} from "../../utils/types/article/translate/TranslationsOverview.ts";

type Props = {
  translations: TranslationsOverview[];
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export const ArticleLanguagesSelect: FC<Props> = ({translations, language, setLanguage}) => {
  const {t} = useTranslation();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-gap-4">
      <div className="tw-m-0 tw-leading-none tw-text-sm">{t("Language")}</div>
      <select
        className="form-select tw-m-0 tw-py-1 tw-px-2 tw-w-auto"
        aria-label={t("Language")}
        value={language}
        onChange={handleLanguageChange}
      >
        {translations.map((translate) => (
          <option key={translate.id} value={translate.language}>{t(translate.language)}</option>
        ))}
      </select>
    </div>
  );
};
