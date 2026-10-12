import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {routes} from "../utils/constants";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {Button} from "../components/reusable/Button.tsx";

export const NotFoundErrorPage: FC = () => {
    const {t} = useTranslation();

    return (
        <div className="tw-bg-[url('src/utils/icons/error/errorGraphics.svg')] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-w-screen tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-px-4">
            <div className="tw-mt-0 md:tw-mt-[-200px]">
                <div className="tw-font-semibold tw-text-white tw-text-xs md:tw-text-base tw-tracking-[0.3em] tw-uppercase tw--mb-5 md:tw-mb-14">
                    {t("ERROR")}
                </div>
                <div className="tw-font-thin tw-text-secondary tw-text-[8rem] sm:tw-text-[12rem] md:tw-text-[16rem] lg:tw-text-[20rem] tw-leading-none tw-pt-14 md:tw-mt-[-100px] tw-mb-14 md:tw-mb-[-20px]">
                    404
                </div>
                <h5 className="tw-font-light md:tw-text-2xl tw-text-white tw-mt-14 tw-mb-0">
                    {t("Page Not Found")}
                </h5>
                <p className="tw-text-sm md:tw-text-base tw-text-gray-300 tw-mb-8 tw-max-w-md tw-mx-auto">
                    {t("The page you are looking for does not exist. Or it was moved.")}
                </p>
                <Button type={"link"} to={routes.home}>{t("Back to home")}</Button>
            </div>
        </div>
    );
};