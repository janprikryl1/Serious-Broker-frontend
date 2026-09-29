import {toPercentTwoDecimal} from "./functions.ts";

export const renderRow = (label: string, value: number | null) => {
    if (value !== 0 && value !== null) {
        return (
            <div className="tw-mb-2 tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-start tw-gap-x-4 tw-gap-y-1">
                <span className="gray-2-color-text tw-min-w-0 tw-text-xs tw-leading-snug sm:tw-text-sm">{label}</span>
                <span className="tw-whitespace-nowrap tw-text-sm tw-font-bold sm:tw-text-base">{toPercentTwoDecimal(1 - value)} %</span>
            </div>
        );
    }
    return null;
};