import {FC} from "react";
import {imageURL} from "../../utils/constants";

type Props = {
    banner: string;
    title: string;
}

export const ArticleBanner:FC<Props> = ({banner, title}) => {
    return (
        <>
            {banner ? (
              <div className="tw-relative tw-max-h-[40rem] tw-overflow-hidden tw-rounded-md tw-shadow-lg">
                  <img
                    src={`${imageURL}/${banner}`}
                    alt={title}
                    className="tw-w-full tw-h-full tw-object-cover"
                  />

                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-end tw-p-6 tw-bg-gradient-to-t tw-from-stone-950 tw-via-transparent tw-to-transparent">
                      <h2 className="tw-mb-0 tw-text-white tw-font-bold tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-z-10">
                          {title}
                      </h2>
                  </div>
              </div>
            ) : (
                <h2>{title}</h2>
            )}
        </>
    );
};