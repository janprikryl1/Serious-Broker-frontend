import {Dispatch, FC, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {ArticleProps} from "../../utils/types/article/ArticleProps.ts";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {addToWatchList, removeFromWatchList} from "../../utils/api/watchListService.ts";
import {WatchListEnum} from "../../utils/enums/WatchListEnum.ts";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {GlassCard} from "../reusable/GlassCard.tsx";
import {ArticleBanner} from "../article/ArticleBanner.tsx";
import {imageURL} from "../../utils/constants";
import {WatchlistButton} from "../reusable/WatchlistButton.tsx";

type Props = {
  data: ArticleProps;
  link?: string;
  setData: Dispatch<SetStateAction<ArticleProps[]>>;
};

export const ArticleCard: FC<Props> = ({data, link = "article", setData}) => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const isArticle = data.articleTypeOption === "article";

  const handleToggleWatchList = async () => {
    const isCurrentlyInWatchlist = data.in_watchlist;

    try {
      const response = isCurrentlyInWatchlist
        ? await removeFromWatchList(data.id)
        : await addToWatchList(data.id, WatchListEnum.Article);

      if (response?.status === 200) {
        setData((prevData) =>
          prevData.map((article) =>
            article.id === data.id
              ? { ...article, in_watchlist: !isCurrentlyInWatchlist }
              : article
          )
        );
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return (
    <Link to={`/${link}/${data.id}`} className="link-underline-none tw-text-white tw-block tw-h-full" data-aos="fade-up" data-aos-duration="1000">
      <GlassCard
        bgColor="var(--secondary-color)"
        isHoverable={true}
        className={`${data.banner ? "tw-h-[400px]" : "tw-h-[320px]"} tw-flex tw-flex-col tw-justify-between`}
      >
        {/* Header + title + description */}
        <div className="tw-flex-1 tw-flex tw-flex-col">
          <div className="tw-flex tw-justify-between tw-items-center tw-gap-4 tw-mb-3">
            <div className="tw-flex tw-items-center tw-gap-2">

              <div className={`color-container--${isArticle ? "gold" : "chart-purple"} tw-text-xs sm:tw-text-sm tw-text-${isArticle ? "secondary" : "purple"} tw-inline-block`}>
                {t(data.articleTypeOption)}
              </div>
              {data.premiumOnly && (
                <div className="color-container--gold tw-text-sm tw-text-secondary tw-inline-block">
                  Premium
                </div>
              )}
            </div>
            <WatchlistButton onToggle={handleToggleWatchList} isInWatchList={data.in_watchlist}  />
          </div>

          {/* Banner */}
          {data.banner ? (
            <div className="tw-relative tw-w-full tw-h-36 tw-rounded-xl tw-overflow-hidden tw-mb-3 tw-border tw-border-white/10">
              <img
                src={`${imageURL}/${data.banner}`}
                className="tw-w-full tw-h-full tw-object-cover"
                alt={data.title}
              />
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[rgba(0,0,0,0.8)] tw-via-[rgba(0,0,0,0.5)] tw-to-transparent tw-p-3 tw-pb-0 tw-flex tw-items-end">
                <h5 className="tw-text-base sm:tw-text-md md:tw-text-lg lg:tw-text-2xl lg:tw-line-clamp-2 tw-m-0 tw-text-white tw-font-semibold">
                  {data.title}
                </h5>
              </div>
            </div>
          ) : (
            <h5 className="tw-line-clamp-2 tw-mb-2">
              {data.title}
            </h5>
          )}

          <p className="tw-text-stone-200 tw-line-clamp-3 tw-text-sm sm:tw-text-base">
            {data.description}
          </p>
        </div>

        {/* Footer */}
        <div className="tw-text-sm tw-italic tw-text-stone-400 tw-pt-4">
          <div className="tw-flex tw-items-center tw-gap-2">
            <p className="tw-m-0">{data.user_firstname} {data.user_surname}</p>
            <p className="tw-m-0"><span>{toCzechDateFormat(data.changed)}</span></p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};