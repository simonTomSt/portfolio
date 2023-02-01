import { User } from 'next-auth';
import { useForm } from 'react-hook-form';

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
  const { handleSubmit, register } = useForm<ContactFormType>();

  const onSubmit = async (values: ContactFormType) => sendEmail(values);

  return (
    <section className={styles.contact}>
      <div>
        <Typography as='h2' variant='title' className={styles.contact__title}>
          Get In Touch!
        </Typography>
        <Typography as='h2' className={styles.contact__subtitle}>
          {contactText}
        </Typography>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('email')} placeholder='Your email' />
          <Textarea
            {...register('message')}
            placeholder='Your message'
            className={styles.textarea}
          />
          <Button
            type='submit'
            loading={emailStatus === 'loading'}
            color='white'
          >
            Send your message
          </Button>

          {emailStatus === 'success' && (
            <Typography>The message has been sent successfully :)</Typography>
          )}
          {emailStatus === 'error' && (
            <Typography>
              Oops! There is an issue, please try to email me directly using my
              email: {email}
            </Typography>
          )}
        </form>
      </div>
    </section>
  );
};
