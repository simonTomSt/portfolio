import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { useForm } from 'react-hook-form';

import { TypeHomePageFields } from 'utils/cms/models';
import { SectionIndex } from 'constants/section-index';
import { Button, Input, Textarea, Typography } from 'components';

import { useEmailSend } from './useEmailSend';
import styles from './contact.module.css';

type ContactSectionProps = {
  contactTitle: TypeHomePageFields['contactTitle'];
  contactDescription: TypeHomePageFields['contactDescription'];
};

type ContactFormType = {
  email: string;
  message: string;
};

export const ContactSection = ({
  contactTitle,
  contactDescription,
}: ContactSectionProps) => {
  const { send: sendEmail, status: emailStatus } = useEmailSend();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactFormType>();
  const isFormError = errors.email || errors.message;

  const onSubmit = async (values: ContactFormType) => sendEmail(values);

  return (
    <section id={SectionIndex.Contact} className={styles.contact}>
      <div className={styles.contact__content}>
        <Typography as='h2' variant='title' className={styles.contact__title}>
          {contactTitle}
        </Typography>
        <div className={styles.contact__subtitle}>
          <span>
            {documentToReactComponents(contactDescription, {
              renderNode: {
                // eslint-disable-next-line react/no-unstable-nested-components
                [BLOCKS.PARAGRAPH]: (_node, children) => (
                  <Typography as='h3' variant='subtitle'>
                    {children}
                  </Typography>
                ),
              },
            })}
          </span>
        </div>
      </div>

      <div className={styles.contact__form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email', { required: true })}
            placeholder='Your email'
          />
          <Textarea
            {...register('message', { required: true })}
            placeholder='Your message'
            className={styles.textarea}
          />

          <Button
            type='submit'
            loading={emailStatus === 'loading'}
            color={emailStatus === 'loading' ? 'white' : 'primary'}
          >
            Send your message
          </Button>

          {isFormError && (
            <Typography className='mt-2'>
              Please fill all of the fields properly ;)
            </Typography>
          )}

          {emailStatus === 'success' && !isFormError && (
            <Typography className='mt-2'>
              The message has been sent successfully :)
            </Typography>
          )}
          {emailStatus === 'error' && !isFormError && (
            <Typography className='mt-2'>
              Oops! There is an issue, please try to email me directly using my
              email: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </Typography>
          )}
        </form>
      </div>
    </section>
  );
};
