import {FC} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "../utils/constants";
import {RegisterStepOne} from "../components/register/RegisterStepOne.tsx";
import {RegisterStepTwo} from "../components/register/RegisterStepTwo.tsx";
import {RegisterStepThree} from "../components/register/RegisterStepThree.tsx";
import {RegisterStepFour} from "../components/register/RegisterStepFour.tsx";
import {RegisterStepsPagiation} from "../components/register/RegisterStepsPagiation.tsx";
import {useRegister} from "../utils/hooks/useRegister.ts";

export const Register: FC = () => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        onSubmit,
        currentStep,
        formRegister,
        errors,
        watch,
        setCurrentStep,
        sending,
        setValue,
        trigger
    } = useRegister();

    return (
        <section className="account padding-bottom mt-3">
            <div className="container">
                <div className="account__wrapper" data-aos="fade-up" data-aos-duration="800">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="account__content account__content--style1">
                                <div className="account__header">
                                    <h2>{t("Create an account")}</h2>
                                    <p>{t("Create an account to get started. We just need a few details from you to get started.")}</p>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {currentStep === 1 ?
                                        <RegisterStepOne formRegister={formRegister} errors={errors} watch={watch}/>
                                        : currentStep === 2 ?
                                        <RegisterStepTwo formRegister={formRegister} errors={errors} watch={watch} setValue={setValue}/>
                                        : currentStep === 3 ?
                                        <RegisterStepThree formRegister={formRegister}/>
                                        : <RegisterStepFour watch={watch} setValue={setValue} formRegister={formRegister}/>
                                    }
                                    <RegisterStepsPagiation currentStep={currentStep} trigger={trigger} setCurrentStep={setCurrentStep} sending={sending}/>
                                </form>
                                <div className="account__switch">
                                    <p>
                                    {t("Already have account? ")}
                                        <Link to={routes.signIn} className="link-underline-none">
                                            {t("Login")}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
