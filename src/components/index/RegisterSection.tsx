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
            <div className="container tw-py-16 tw-bg-quintary">
                <h6 className="tw-text-secondary tw-font-normal tw-text-base tw-tracking-normal tw-pb-0 tw-pt-12">{t("REGISTER")}</h6>
                <h2 className="mb-5 index-section-head-title">{t("Get Started Today")}</h2>

                <div data-aos="fade-up" data-aos-duration="1000" className="tw-mb-4">
                    <GlassCard bgColor="var(--secondary-color)" opacity={0.2}>
                        <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-12 tw-items-center tw-pt-4 tw-pb-4 tw-gap-10 xl:tw-gap-0 tw-w-full">
                            <div className="tw-col-span-1 xl:tw-col-span-5 xxl:tw-col-span-6 tw-flex tw-items-center tw-justify-center">
                                <div className="tw-flex tw-m-0 tw-p-0 tw-max-w-none xl:tw-max-w-[400px] tw-text-center xl:tw-text-start tw-text-4xl tw-font-bold tw-text-white">
                                    {t("Register and take control of your finances")}
                                </div>
                            </div>
                            <div className="tw-col-span-1 xl:tw-col-span-7 xxl:tw-col-span-6 sm:tw-h-12 tw-flex tw-flex-col tw-gap-5 sm:tw-gap-0 sm:tw-flex-row tw-items-stretch tw-justify-center">
                                <input
                                    className="form-control--light tw-h-12 sm:tw-h-full sm:tw-shadow-[inset_-10px_0_12px_0px_rgba(0,0,0,0.2)]"
                                    type="email"
                                    placeholder={t("E-mail")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                                />
                                <Button
                                    className="tw-h-12 sm:tw-h-full tw-leading-normal sm:tw-leading-none tw-m-0 sm:tw--ml-2"
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