import React, {useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { routes } from '../../../utils/constants';
import { TitleHeader } from '../../../components/about/TitleHeader.tsx';
import { OutlineContainer } from '../../../components/reusable/OutlineContainer.tsx';
import { Button } from '../../../components/reusable/Button.tsx';

import { useInvestmentPlanContext } from '../../../utils/providers/InvestmentPlanProvider.tsx';
import { useNavigate } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';

export const NewInvestmentPlanName = () => {
  const { t } = useTranslation();
  const { name, setName, description, setDescription } = useInvestmentPlanContext();
  const navigate = useNavigate();
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeDescription = () => {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    resizeDescription();
  }, [description]);

  return (
    <>
      <TitleHeader title={t('New Investment Plan')} />
      <div className="container w-100">
        <OutlineContainer className="m-0">
          <h3 className="mb-3">{t('Name and Description')}</h3>

          <div className="d-flex flex-column gap-2 mb-5">
            <span className="gray-3-color-text mb-3 d-block w-100">
              {t('Set a name for your investment plan and a brief description to quickly identify it.')}
            </span>

            <div className="d-flex align-items-end col-12 col-lg-6">
              <input
                type="text"
                className="form-control borderless investment-plan-name__input"
                placeholder={t('Enter plan name...')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FiEdit3 className="investment-plan-name__edit-icon" size={35} color="var(--secondary-color)" />
            </div>

            <div className="gray-2-color-text m-0">{t('Name')}</div>
          </div>

          <div className="gray-2-color-text mb-2 investment-plan-name__label">{t('Description')}</div>
          <div className="col-12 col-lg-6">
            <textarea
              ref={descriptionRef}
              className="form-control outline-input investment-plan-name__textarea"
              placeholder={t('Enter a brief description (optional)...')}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                resizeDescription();
              }}
              rows={3}
            />
          </div>

          <div className="d-flex justify-content-center mt-4 w-100">
            <Button
              className="mt-4"
              onClick={() => navigate(routes.profile.newInvestmentPlan)}
              disabled={!name.trim()}
            >
              {t('Continue')}
            </Button>
          </div>
        </OutlineContainer>
      </div>
    </>
  );
};