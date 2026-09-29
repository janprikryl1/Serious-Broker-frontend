import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "../../styles/sass/components/recommendation-details-skeleton.scss";

export const RecommendationDetailsSkeleton: React.FC = () => {
  return (
    <div className="tw-container tw-mx-auto tw-p-4 tw-space-y-14">
      {/* Link */}
      <div>
        <Skeleton width={120} height={18} />
      </div>

      {/* Header */}
      <div className="tw-flex tw-items-center tw-gap-8">
        {/* Logo*/}
        <Skeleton circle width={100} height={100} />

        <div className="tw-space-y-4">
          {/* Badge */}
          <Skeleton width={80} height={18} className="tw-rounded-md" />
          {/* Title */}
          <Skeleton width={220} height={42} />
          {/* Subtitle */}
          <Skeleton width={180} height={16} />
        </div>
      </div>

      {/* Tabs */}
      <div className="tw-space-y-4">
        <div className="tw-flex tw-gap-6 tw-border-b tw-border-neutral-800 tw-pb-2">
          <Skeleton width={160} height={20} />
          <Skeleton width={140} height={20} />
        </div>

        {/* Season select */}
        <div className="tw-flex tw-items-center tw-gap-2">
          <Skeleton width={240} height={36} className="tw-rounded-full" />
        </div>

        {/* Checkbox and input */}
        <div className="tw-flex tw-items-center tw-gap-3 tw-pt-1">
          <Skeleton width={18} height={18} className="tw-rounded" />
          <Skeleton width={120} height={16} />
          <Skeleton width={40} height={28} className="tw-rounded" />
        </div>
      </div>

      {/* Results card */}
      <div className="tw-p-6 tw-rounded-xl tw-border tw-border-neutral-800 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-text-center">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
          <Skeleton width={180} height={36} />
          <Skeleton width={120} height={24} className="tw-rounded-full" />
        </div>
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
          <Skeleton width={180} height={36} />
          <Skeleton width={120} height={24} className="tw-rounded-full" />
        </div>
      </div>

      {/* Chart */}
      <div className="tw-w-full">
        <Skeleton height={380} className="tw-rounded-xl" />
      </div>

      {/* Expandable card */}
      <div className="tw-p-6 tw-rounded-xl tw-border tw-border-neutral-800 tw-space-y-4">
        <Skeleton width={320} height={24} />
        <Skeleton count={2} height={16} />
        <div className="tw-flex tw-justify-center tw-pt-2">
          <Skeleton width={110} height={36} className="tw-rounded-md" />
        </div>
      </div>
    </div>
  );
};