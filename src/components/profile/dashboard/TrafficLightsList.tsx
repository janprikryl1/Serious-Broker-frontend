import React, { useEffect, useState } from 'react';
import { OutlineContainer } from '../../reusable/OutlineContainer.tsx';
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
      return <div className="gray-2-color-text">{t('No traffic lights defined')}</div>;
    }

    return lights.map((trafficLight) => (
      <div key={trafficLight.id ?? trafficLight.name} className="d-flex align-items-center justify-content-between gap-3 py-2 border-bottom">
        {trafficLight.name}
        <div className="d-flex align-items-center gap-2">
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
        <OutlineContainer className="dashboard-container mb-0 h-100">
          <div className="card-header mb-3">
            <Link to={routes.profile.myTrafficLights} className="text-decoration-none">
              <p className="mb-3">{t('Buy Traffic Lights')}</p>
            </Link>
          </div>
          <div className="d-flex flex-column">
            {renderTrafficLights(buyTrafficLights)}
          </div>
        </OutlineContainer>
      </div>

      <div className="col-12 col-lg-6">
        <OutlineContainer className="dashboard-container mb-0 h-100">
          <div className="card-header mb-3">
            <Link to={routes.profile.myTrafficLights} className="text-decoration-none">
              <p className="mb-3">{t('Sell Traffic Lights')}</p>
            </Link>
          </div>
          <div className="d-flex flex-column">
            {renderTrafficLights(sellTrafficLights)}
          </div>
        </OutlineContainer>
      </div>
    </div>
  );
};

