import { useCallback, useState } from 'react';

import emailjs from '@emailjs/browser';

import { logger } from 'utils/logger';

type ParamsType = {
  email: string;
  message: string;
};

export const useEmailSend = () => {
  const [status, setStatus] = useState<
    'initial' | 'loading' | 'error' | 'success'
  >('initial');

  const send = useCallback(async (params: ParamsType) => {
    try {
      setStatus('loading');

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        params,
        process.env.NEXT_PUBLIC_EMAIL_USER_ID,
      );

      if (response.status === 200) setStatus('success');
      if (response.status !== 200) throw new Error(response.text);
    } catch (e) {
      setStatus('error');
      logger.log(e);
    }
  }, []);

  return { send, status };
};
