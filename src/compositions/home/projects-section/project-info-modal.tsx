import Image from 'next/image';

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

  const { title, image, description, shortDescription, url, githubUrl } =
    project;

  return (
    <Modal onClose={onClose} open={open}>
      {image && (
        <Image
          src={image}
          height={800}
          width={1000}
          alt={title}
          className={styles.project__image}
        />
      )}
      <Typography as='h2' variant='title'>
        {title}
      </Typography>
      <Typography as='h3' variant='subtitle'>
        {shortDescription}
      </Typography>
      <Typography>{description}</Typography>

      {url && (
        <a href={url} rel='noreferrer noopener' target='_blank'>
          View on live
        </a>
      )}
      {githubUrl && (
        <a href={githubUrl} rel='noreferrer noopener' target='_blank'>
          View source code
        </a>
      )}
    </Modal>
  );
};
