import {DateFormatters} from "../types/graphs/DateFormatters.ts";

export const toCzechDateFormat = (dateRaw: string): string => {
    const date = new Date(dateRaw);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}. ${month}. ${year} ${hours}:${minutes}`;
}

export const toCzechDate = (dateRaw: string | Date): string => {
    if (typeof dateRaw === 'string') {
        dateRaw = new Date(dateRaw);
    }
    return `${dateRaw.getDate()}. ${dateRaw.getMonth()+1}. ${dateRaw.getFullYear()}`;
}

export const getDayName = (dayNumber: number) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNumber ? daysOfWeek[dayNumber-1] : 'Unknown day';
}

export const getYear = (yearNumber: number) => {
    return 2024 - yearNumber;
}

export const formatDateForDisplay = (isoDate: string): string => {
    if (!isoDate || !isoDate.includes('-')) return isoDate;
    try {
        const date = new Date(isoDate + 'T00:00:00');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}. ${month}. ${year}`;
    } catch (e) {
        console.error("Error formatting date:", e);
        return isoDate;
    }
};

export const parseBackendUtc = (input: string | number | Date): Date => {
    if (input instanceof Date) return input;

    if (typeof input === "number") {
        return new Date(input < 1e12 ? input * 1000 : input);
    }

    const s = String(input).trim();

    if (/Z$|[+-]\d{2}:\d{2}$/.test(s)) {
        return new Date(s);
    }

    const m = s.match(
        /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/
    );
    if (m) {
        const [, Y, M, D, h, mi, se = "0", ms = "0"] = m;
        return new Date(
            Date.UTC(
                parseInt(Y, 10),
                parseInt(M, 10) - 1,
                parseInt(D, 10),
                parseInt(h, 10),
                parseInt(mi, 10),
                parseInt(se, 10),
                parseInt(ms.padEnd(3, "0"), 10)
            )
        );
    }

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s)) {
        return new Date(s + "Z");
    }

    return new Date(s);
}

export const timeZoneOptions = (() => {
    const supported = (Intl as any).supportedValuesOf?.("timeZone") as
        | string[]
        | undefined;
    if (supported && Array.isArray(supported) && supported.length) return ["UTC", ...supported];
    return [
        "UTC",
        "Europe/Prague",
        "Europe/London",
        "America/New_York",
        "America/Los_Angeles",
        "Asia/Tokyo",
        "Asia/Shanghai",
        "Asia/Kolkata",
        "Australia/Sydney",
    ];
})();

const toDate = (input: Date | number | string): Date => {
    if (input instanceof Date) return input;
    if (typeof input === "number") {
        return new Date(input < 1e12 ? input * 1000 : input);
    }
    return new Date(input);
}

export function createDateFormatters(locale: string, timeZone: string, opts?: { includeSeconds?: boolean }): DateFormatters {
    const baseDate: Intl.DateTimeFormatOptions = {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    const baseDateTime: Intl.DateTimeFormatOptions = {
        ...baseDate,
        hour: "2-digit",
        minute: "2-digit",
        ...(opts?.includeSeconds ? { second: "2-digit" } : {}),
    };

    const dateFmt = new Intl.DateTimeFormat(locale, baseDate);
    const dateTimeFmt = new Intl.DateTimeFormat(locale, baseDateTime);

    return {
        date: (d) => dateFmt.format(toDate(d)),
        dateTime: (d) => dateTimeFmt.format(toDate(d)),
        format: (d, options) =>
            new Intl.DateTimeFormat(locale, { timeZone, ...options }).format(toDate(d)),
    };
}

export const formatUtcHourToTZ = (
    utcHour: number | string,
    locale: string,
    timeZone: string,
    opts?: {
        referenceDate?: Date;
        includeDate?: boolean;
        includeSeconds?: boolean;
    }
): string => {
    const hourNum = typeof utcHour === "string" ? parseInt(utcHour, 10) : utcHour;
    if (Number.isNaN(hourNum) || hourNum < 0 || hourNum > 23) return "";

    const ref = opts?.referenceDate ?? new Date();
    const d = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate(), hourNum, 0, 0));

    const base: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        ...(opts?.includeSeconds ? { second: "2-digit" } : {}),
    };

    const options: Intl.DateTimeFormatOptions = opts?.includeDate
        ? { ...base, year: "numeric", month: "2-digit", day: "2-digit" }
        : base;

    return new Intl.DateTimeFormat(locale || "cs-CZ", options).format(d);
}
