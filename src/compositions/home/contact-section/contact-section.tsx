import { User } from 'next-auth';

import { Input, Textarea, Typography } from 'components';

import styles from './contact.module.css';

type ContactSectionProps = { contactText: string; me: User };

export const ContactSection = ({
  contactText,
  me: { email },
}: ContactSectionProps) => (
  <section className={styles.contact}>
    <Typography as='h2' variant='title'>
      Get In Touch
    </Typography>
    {contactText}

    <div>
      <form>
        <Input />
        <Textarea />
      </form>
    </div>
  </section>
);
