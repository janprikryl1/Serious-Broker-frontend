export type UserType = {
    id: number;
    role: string;
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
    newsletter_subscription: number;
    receive_messages: number;
    verified: number;
}

export type MembershipTypes = {
    id: number,
    user_id: number,
    type: string,
    payment: string,
    date_begin: string,
    date_end: string,
    renewal: string,
    changed: string,
    created: string
}

export type UserMembershipDetails = {
    user: UserType,
    membership: MembershipTypes
}


export type UserTypesWithMembership = UserType & MembershipTypes;
