import Image from 'next/image';
import { Github, BoxArrowUpRight } from 'react-bootstrap-icons';

import { Modal, type ModalProps, Typography } from 'components';

import { ProjectType } from '../../../utils/types/common';

import styles from './projects.module.css';

type ProjectInfoModalProps = Omit<ModalProps, 'children'> & {
  project: ProjectType | null;
};

export const ProjectInfoModal = ({
  open,
  onClose,
  project,
}: ProjectInfoModalProps) => {
  if (!project) return null;

  const {
    title,
    image,
    description,
    shortDescription,
    url,
    githubUrl,
    skills,
  } = project;

  return (
    <Modal onClose={onClose} open={open}>
      {image && (
        <Image
          src={image}
          height={450}
          width={800}
          alt={title}
          className={styles.project__image}
        />
      )}
      <div className='text-left'>
        <Typography as='h2' variant='title'>
          {title}
        </Typography>

        <Typography as='h3' variant='subtitle' className='my-2'>
          {shortDescription}
        </Typography>

        <div className='flex mb-6'>
          {url && (
            <a
              href={url}
              rel='noreferrer noopener'
              target='_blank'
              className={styles['link-button']}
            >
              <BoxArrowUpRight />
              <span>View on live</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              rel='noreferrer noopener'
              target='_blank'
              className={styles['link-button']}
            >
              <Github />
              <span>View source code</span>
            </a>
          )}
        </div>

        <Typography>{description}</Typography>

        <Typography className='my-4'>
          <span>Tech stack:</span>
          <span className='text-white ml-1.5'>
            {skills?.map((skill) => skill.name).join(', ')}
          </span>
        </Typography>
      </div>
    </Modal>
  );
};
