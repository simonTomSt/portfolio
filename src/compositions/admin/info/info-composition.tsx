import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';

import { trpc } from 'utils/trpc';
import { Button, Input } from 'components';

import styles from './info.module.css';

type FormDataType = {
  cvUrl: string;
  linkedinUrl: string;
  email: string;
};

export const InfoComposition = () => {
  const { handleSubmit, register, reset } = useForm<FormDataType>();
  const {
    data: user,
    status: getUserStatus,
    error,
  } = trpc.useQuery(['user.get']);
  const {
    mutate: updateInfo,
    status: updateInfoStatus,
    error: updateInfoError,
  } = trpc.useMutation(['user.updateInfo']);

  useEffect(() => {
    if (user) {
      reset({
        cvUrl: user.cvUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  if (!user) return null;

  const onSubmit = (values: FormDataType) => {
    updateInfo({ ...values, id: user.id });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label.Root className={styles.label}>
          Email
          <Input {...register('email')} />
        </Label.Root>

        <Label.Root className={styles.label}>
          CV URL
          <Input {...register('cvUrl')} />
        </Label.Root>

        <Label.Root className={styles.label}>
          Linkedin URL
          <Input {...register('linkedinUrl')} />
        </Label.Root>

        <Button type='submit'>Update information</Button>
      </form>
    </div>
  );
};
