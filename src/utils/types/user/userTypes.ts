export enum UserRole {
    Default = "member",
    Editor = "editor",
    Admin = "admin",
    Manager = "manager",
}

export type UserType = {
    id: number;
    role: UserRole;
    status: string;
    superior_id?: number;
    nickname: string;
    email: string;
    firstname?: string;
    surname?: string;
    midlename?: string;
    title_before?: string;
    title_after?: string;
    firm_name?: string;
    firm_id?: string;
    firm_vat?: string;
    street?: string;
    street_number?: string;
    town?: string;
    country: string;
    password?: string;
    changed: string;
    created: string;
    newsletter_subscription: boolean;
    receive_messages: boolean;
    verified: boolean;
    language: string;
}

export type MembershipTypes = {
    id: number,
    user_id: number,
    price: number,
    created: string,
    datetime_end: string,
}