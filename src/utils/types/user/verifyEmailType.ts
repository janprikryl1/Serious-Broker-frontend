export type ZeruhValidationDetails = {
    format_valid: boolean;
    mx_found: boolean;
    smtp_check: boolean;
    catch_all: boolean;
    role: boolean;
    disposable: boolean;
    free: boolean;
    tagged: boolean;
    mailbox_full: boolean;
    mailbox_disabled: boolean;
    no_reply: boolean;
};

export type ZeruhDomainDetails = {
    domain: string | null;
    domain_age: number | null;
    did_you_mean: string | null;
};

export type ZeruhResult = {
    email_address: string;
    gravatar_url?: string;
    account?: string;
    domain_details: ZeruhDomainDetails;
    validation_details: ZeruhValidationDetails;
    selected_mx_record?: string;
    service_provider?: string;
    ip_details?: unknown;
    time_taken_to_verify?: string | number;
    reason?: string;
    status: "deliverable" | "risky" | "undeliverable" | "unknown";
    score?: number;
};

export type ZeruhResponse = {
    success: boolean;
    message: string;
    result: ZeruhResult;
};

export type EmailCheck = {
    deliverable: boolean | null;
    mxFound: boolean;
    smtpCheck: boolean;
    status: ZeruhResult["status"] | null;
    reason: string | null;
    score: number | null;
    suggestion: string | null;
};
