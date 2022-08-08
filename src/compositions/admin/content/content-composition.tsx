import React, { useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { Content } from '@prisma/client';
import * as Label from '@radix-ui/react-label';

import { Button, Loader, Textarea } from 'components';
import { trpc } from 'utils/trpc';
import { ErrorComposition } from 'compositions/error';

import styles from './content.module.css';

export const ContentComposition = () => {
  const {
    data: content,
    status: contentGetStatus,
    error: contentGetError,
  } = trpc.useQuery(['content.getContent']);
  const {
    mutate,
    status: updatedContentStatus,
    error: updatedContentError,
  } = trpc.useMutation(['content.createOrUpdate']);
  const defaultValues = useMemo(() => content, [content]);
  const { handleSubmit, register, reset } = useForm<Content>();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  if (contentGetStatus === 'loading') return <Loader />;
  if (contentGetStatus === 'error')
    return (
      <ErrorComposition
        statusCode={contentGetError.data?.httpStatus || 500}
        message={contentGetError.message}
      />
    );

  const onSubmit = handleSubmit((data) => mutate({ ...data, id: content?.id }));

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__field}>
          <Label.Root htmlFor='welcome' className={styles.form__label}>
            Welcome text
          </Label.Root>
          <Textarea id='welcome' {...register('welcome')} rows={3} />
        </div>
        <div className={styles.form__field}>
          <Label.Root htmlFor='aboutMe' className={styles.form__label}>
            About me text
          </Label.Root>
          <Textarea id='aboutMe' {...register('aboutMe')} rows={8} />
        </div>
        <div className={styles.form__field}>
          <Label.Root htmlFor='contact' className={styles.form__label}>
            Contact text
          </Label.Root>
          <Textarea id='contact' {...register('contact')} rows={4} />
        </div>

        <Button
          type='submit'
          loading={updatedContentStatus === 'loading'}
          className={styles.form__submit}
        >
          Update content
        </Button>
      </form>
    </div>
  );
};
