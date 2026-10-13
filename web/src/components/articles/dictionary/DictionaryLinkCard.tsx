import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {imageURL, routes} from "../../../utils/constants";
import {GlassCard} from "../../reusable/GlassCard.tsx";
import glossaryOfTerms from "../../../utils/icons/glossaryOfTerms/glossary_of_terms.webp";

export const DictionaryLinkCard: FC = () => {
  const {t} = useTranslation();

  return (
    <div className="col-sm-6 col-lg-6" data-aos="fade-up" data-aos-duration="1000">
      <Link to={routes.dictionary} className="link-underline-none tw-text-white tw-h-full">
        <GlassCard bgColor="var(--secondary-color)" isHoverable={true} className="tw-h-full">
          <div className="color-container--chart-blue tw-text-xs tw-text-blue tw-inline-block tw-mb-3">
            {t("Dictionary")}
          </div>

          <div
            className="tw-relative tw-w-full tw-h-36 tw-rounded-xl tw-overflow-hidden tw-mb-3 tw-border tw-border-white/10">
            <img
              src={glossaryOfTerms}
              className="tw-w-full tw-h-full tw-object-cover"
              alt={t("Glossary of terms")}
            />
            <div
              className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[rgba(0,0,0,0.8)] tw-via-[rgba(0,0,0,0.5)] tw-to-transparent tw-p-3 tw-pb-0 tw-flex tw-items-end">
              <h5 className="tw-text-base sm:tw-text-md md:tw-text-lg lg:tw-text-2xl lg:tw-line-clamp-2 tw-m-0 tw-text-white tw-font-semibold">
                {t("Glossary of terms")}
              </h5>
            </div>
          </div>

          <p
            className="mb-15 tw-text-stone-200 hover:tw-text-stone-200 tw-text-sm sm:tw-text-base">{t("Glossary of terms in the cryptocurrency world")}</p>
        </GlassCard>
      </Link>
    </div>
  );
};