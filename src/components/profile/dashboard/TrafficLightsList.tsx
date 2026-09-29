import React, { useEffect, useState } from 'react';
import { getTrafficLights } from '../../../utils/api/trafficLightsService.ts';
import { Link } from 'react-router-dom';
import { routes } from '../../../utils/constants';
import {useTranslation} from "react-i18next";
import {SpinnerLoader} from "../../reusable/SpinnerLoader.tsx";

const parseTriggers = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

export const TrafficLightsList = () => {
  const { t } = useTranslation();
  const [trafficLights, setTrafficLights] = useState(JSON.parse('[]'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadTrafficLights = async () => {
      try {
        setIsLoading(true);
        const response = await getTrafficLights();
        if (!mounted) return;

        const normalized = Array.isArray(response?.data)
          ? response.data.map((trafficLight) => ({
              ...trafficLight,
              triggers: parseTriggers(trafficLight.triggers),
            }))
          : [];

        setTrafficLights(normalized);
      } catch {
        if (mounted) setTrafficLights([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadTrafficLights();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  const buyTrafficLights = trafficLights.filter((trafficLight) => trafficLight.type === 'buy');
  const sellTrafficLights = trafficLights.filter((trafficLight) => trafficLight.type === 'sell');

  const renderTrafficLights = (lights) => {
    if (!lights.length) {
      return <div className="gray-2-color-text tw-text-xs sm:tw-text-sm">{t('No traffic lights defined')}</div>;
    }

    return lights.map((trafficLight) => (
      <div key={trafficLight.id ?? trafficLight.name} className="d-flex align-items-start sm:align-items-center justify-content-between gap-2 sm:gap-3 tw-py-2 tw-border-b tw-border-stone-400 tw-border-opacity-20 tw-min-w-0">
        <span className="tw-text-xs sm:tw-text-sm tw-leading-snug tw-break-words tw-min-w-0">{trafficLight.name}</span>
        <div className="d-flex align-items-center gap-2 tw-shrink-0">
          {(trafficLight.triggers ?? []).map((trigger, index) => (
            <span
              key={index}
              className="traffic-light-circle-small"
              style={{ backgroundColor: trigger.color }}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl tw-p-3 sm:tw-p-4 lg:tw-p-6 tw-h-full tw-min-w-0" >

          <div className="card-header tw-mb-2 sm:tw-mb-3">
            <Link to={routes.profile.myTrafficLights} className="text-decoration-none">
              <h6 className="tw-mb-0 tw-text-sm sm:tw-text-base">{t('Buy Traffic Lights')}</h6>
            </Link>
          </div>
          <div className="d-flex flex-column">
            {renderTrafficLights(buyTrafficLights)}
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="tw-bg-stone-950 tw-bg-opacity-5 tw-border tw-border-solid tw-border-stone-400 tw-border-opacity-20 tw-rounded-2xl tw-p-3 sm:tw-p-4 lg:tw-p-6 tw-h-full tw-min-w-0" >
          <div className="card-header tw-mb-2 sm:tw-mb-3">
            <Link to={routes.profile.myTrafficLights} className="text-decoration-none">
              <h6 className="tw-mb-0 tw-text-sm sm:tw-text-base">{t('Sell Traffic Lights')}</h6>
            </Link>
          </div>
          <div className="d-flex flex-column">
            {renderTrafficLights(sellTrafficLights)}
          </div>
        </div>
      </div>
    </div>
  );
};
