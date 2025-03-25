import {z} from "zod";

export const registerUserSchema = z
    .object({
        nickname: z.string().min(1, "Nickname is required"),
        firstname: z.string().min(1, "First name is required"),
        midlename: z.string().optional(),
        surname: z.string().min(1, "Surname is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        passwordAgain: z.string().min(1, "Please confirm your password"),

        title_before: z.string().optional(),
        title_after: z.string().optional(),
        street: z.string().min(1, "Street is required"),
        street_number: z.string().min(1, "Street number is required"),
        town: z.string().min(1, "Town is required"),
        country: z.string().min(1, "Country is required"),

        firm_name: z.string().optional(),
        firm_id: z.string().optional(),
        firm_vat: z.string().optional(),

        language: z.string().min(1, "Language is required"),
        newsletter_subscription: z.boolean().optional().default(true),
        education_emails: z.boolean().optional().default(true),
    })
    .refine((data) => data.password === data.passwordAgain, {
        path: ["passwordAgain"],
        message: "Passwords do not match",
    });

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;