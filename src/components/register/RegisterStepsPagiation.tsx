import {Dispatch, FC, SetStateAction} from "react";
import {Button} from "../reusable/Button.tsx";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";
import {useTranslation} from "react-i18next";
import {UseFormTrigger} from "react-hook-form";

type Props = {
    trigger: UseFormTrigger<RegisterUserSchemaType>;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    currentStep: number;
    sending: boolean;
}

export const RegisterStepsPagiation:FC<Props> = ({trigger, setCurrentStep, currentStep, sending}) => {
    const {t} = useTranslation();

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof RegisterUserSchemaType)[] = [];

        if (currentStep === 1) {
            fieldsToValidate = ["nickname", "firstname", "surname", "email", "password", "passwordAgain"];
        } else if (currentStep === 2) {
            fieldsToValidate = ["street", "street_number", "town"];
        }

        const isStepValid = fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;

        if (isStepValid) {
            setCurrentStep((prev) => prev + 1);
        }
    };
    
    return (
        <div className="d-flex justify-content-between mt-4">
            <Button type="button" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>
                {t("Back")}
            </Button>
            {currentStep < 4 ? (
                <Button type="button" onClick={handleNextStep}>
                    {t("Next")}
                </Button>
            ) : (
                <Button type="submit" className="btn btn-block btn-lg" disabled={sending}>
                    {t("Register")}
                </Button>
            )}
        </div>
    );
}