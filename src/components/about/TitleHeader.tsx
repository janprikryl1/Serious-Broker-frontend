import React, {FC, ReactNode} from 'react';
import {useTranslation} from "react-i18next";
import HeaderImage from "../../utils/icons/cta/sticks_graph.webp";
import {coinURL} from "../../utils/constants";
import {GlassCard} from "../reusable/GlassCard.tsx";

type Props = {
  title: string;
  secondaryTitle?: string;
  actionIcon?: ReactNode;
  badge?: string;
  text?: string;
  img?: string;
  imgClassname?: string;
};

export const TitleHeader: FC<Props> = ({
                                         title,
                                         secondaryTitle = "",
                                         actionIcon = "",
                                         badge = "",
                                         text = "",
                                         img = "",
                                         imgClassname = ""
                                       }) => {
  const {t} = useTranslation();

  return (
    <section className={`container tw-my-4 tw-pt-6 lg:tw-my-6 lg:tw-pt-12 ${imgClassname ? "tw-pb-8" : ""}`}>
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="tw-flex tw-items-center tw-gap-3 sm:tw-gap-4">
          {img && (
            <img
              src={img}
              className={`${imgClassname || ""} tw-shrink-0 tw-object-contain tw-w-[72px] sm:tw-w-auto`}
              alt=""
            />
          )}

          <div className="tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-2">
            <div>{badge &&
              <div className="color-container--gold tw-inline-block tw-text-xs sm:tw-text-sm tw-mb-2">{badge}</div>}</div>

            <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-1 sm:tw-gap-3">
              <div className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-3">
                <h3 className={`tw-mb-0 tw-text-lg sm:tw-text-2xl lg:tw-text-3xl tw-leading-tight ${text ? "tw-pb-0" : ""}`}>
                  {t(title)}
                </h3>

                {actionIcon && (
                  <div className="tw-flex tw-items-center">
                    {actionIcon}
                  </div>
                )}
              </div>

              {secondaryTitle && (
                <div className="tw-text-gray-2 tw-text-sm sm:tw-text-xl lg:tw-text-2xl tw-font-semibold tw-tracking-wide tw-break-all">
                  {secondaryTitle}
                </div>
              )}
            </div>

            {text ? <div className="tw-text-sm sm:tw-text-base tw-leading-relaxed">{t(text)}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
};