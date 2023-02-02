import { User } from 'next-auth';
import { useForm } from 'react-hook-form';

import { SectionIndex } from 'constants/section-index';
import { Button, Input, Textarea, Typography } from 'components';

import { useEmailSend } from './useEmailSend';
import styles from './contact.module.css';

type ContactSectionProps = { contactText: string; me: User };

type ContactFormType = {
  email: string;
  message: string;
};

export const ContactSection = ({
  contactText,
  me: { email },
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
          Get In Touch!
        </Typography>
        <Typography
          as='h3'
          variant='subtitle'
          className={styles.contact__subtitle}
        >
          {contactText}
        </Typography>
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
              email: {email}
            </Typography>
          )}
        </form>
      </div>
    </section>
  );
};
