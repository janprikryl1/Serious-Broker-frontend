import { useState } from 'react';
import { CustomSwal } from '../functions/customSwal.ts';
import { verifyEmail } from '../api/authenticateService.ts';
import { addNewsletter } from '../api/newsletterService.ts';
import { useTranslation } from 'react-i18next';

export const useNewsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleAddNewsletter = () => {
    if (!email) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      CustomSwal.fire({
        icon: 'error',
        title: t('Error'),
        text: t('Invalid email')
      });
      return;
    }

    const sendNewsletter = async () => {
      const isValid = await verifyEmail(email);
      if (isValid.data.result.validation_details.mx_found === false) {
        CustomSwal.fire({
          icon: 'error',
          title: t('Error'),
          text: t('Invalid email')
        });
        return;
      }
      try {
        const response = await addNewsletter({ email });
        if (response.data.message === 'Email successfully added') {
          CustomSwal.fire({
            icon: 'success',
            title: t('Your newsletter has been sent successfully.')
          });
          setEmail('');
        } else if (response.data.message === 'Email already exists') {
          CustomSwal.fire({
            icon: 'error',
            title: t('Error'),
            text: t('This email is already subscribed.')
          });
        }
      } catch (error) {
        console.error(error);
        CustomSwal.fire({
          icon: 'error',
          title: t('Failed'),
          text: t('Please try again later.')
        });
      }
    };
    sendNewsletter();
  };
    
  return {
    handleAddNewsletter,
    email,
    setEmail
  };
};