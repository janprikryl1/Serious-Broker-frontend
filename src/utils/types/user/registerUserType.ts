import {UserType} from "./userTypes.ts";

export type registerUserType = {
    email: string;
    password: string;
    nickname: string;
    firstname?: string;
    midlename?: string;
    surname?: string;
    title_before?: string;
    title_after?: string;
    firm_name?: string;
    firm_id?: string;
    firm_vat?: string;
    street?: string;
    street_number?: string;
    town?: string;
    country: string;
    language: string;
    newsletter_subscription: boolean;
    education_emails: boolean;
}

export type registerUserTypeResponse = {
    status: string;
    message: string;
    token: string;
    user: UserType;
}
