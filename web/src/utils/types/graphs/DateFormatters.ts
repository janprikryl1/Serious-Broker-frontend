export type DateFormatters = {
    date: (d: Date | number | string) => string;
    dateTime: (d: Date | number | string) => string;
    format: (d: Date | number | string, options: Intl.DateTimeFormatOptions) => string;
};
