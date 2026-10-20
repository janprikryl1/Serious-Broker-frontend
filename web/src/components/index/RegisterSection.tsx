import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {guideURLS, routes} from "../../utils/constants";
import {GlassCard} from "../reusable/GlassCard.tsx";

export const RegisterSection: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleRegister = () => {
        if (email) {
            navigate(`${routes.register}?email=${encodeURIComponent(email)}`);
        } else {
            navigate(routes.register);
        }
    };

    return (
        <div>
            <div className="container tw-bg-quintary tw-px-4 tw-py-10 sm:tw-px-6 sm:tw-py-12 lg:tw-py-16">
                <h6 className="tw-pb-0 tw-pt-8 tw-text-xs tw-font-normal tw-tracking-normal tw-text-secondary sm:tw-text-base lg:tw-pt-12">{t("REGISTER")}</h6>
                <h2 className="tw-mb-5 tw-text-2xl index-section-head-title sm:tw-text-3xl md:tw-text-5xl lg:tw-text-6xl">{t("Get Started Today")}</h2>

                <div className="tw-mb-4"
                     data-aos="fade-up"
                     data-aos-duration="1200"
                     data-aos-offset="300"
                     data-aos-easing="ease-out-cubic"
                >
                    <GlassCard bgColor="var(--secondary-color)" opacity={0.2}>
                        <div className="tw-grid tw-w-full tw-grid-cols-1 tw-items-center tw-gap-6 tw-py-5 sm:tw-gap-8 sm:tw-py-6 xl:tw-grid-cols-12 xl:tw-gap-0 xl:tw-py-4">
                            <div className="tw-flex tw-items-center tw-justify-center xl:tw-col-span-5 xl:tw-col-start-1 xxl:tw-col-span-6">
                                <div className="tw-m-0 tw-max-w-none tw-p-0 tw-text-center tw-text-2xl tw-font-bold tw-text-white sm:tw-text-3xl xl:tw-max-w-[400px] xl:tw-text-start xl:tw-text-4xl">
                                    {t("Register and take control of your finances")}
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-col tw-items-stretch tw-justify-center tw-gap-4 tw-mx-2 sm:tw-h-12 sm:tw-flex-row sm:tw-gap-0 xl:tw-col-span-7 xxl:tw-col-span-6">
                                <input
                                    className="form-control--light tw-h-12 sm:tw-h-full sm:tw-shadow-[inset_-10px_0_12px_0px_rgba(0,0,0,0.2)]"
                                    type="email"
                                    placeholder={t("E-mail")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                                />
                                <Button
                                    className="tw-h-12 tw-m-0 tw-leading-normal sm:tw-h-full sm:tw--ml-2 sm:tw-leading-none"
                                    onClick={handleRegister}
                                >
                                    {t("Register")}
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}