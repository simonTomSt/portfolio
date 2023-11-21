import Image from 'next/image';
import { Github, BoxArrowUpRight } from 'react-bootstrap-icons';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { Modal, type ModalProps, Typography } from 'components';
import { TypeProject } from 'utils/cms/models';

import styles from './projects.module.css';

type ProjectInfoModalProps = Omit<ModalProps, 'children'> & {
  project: TypeProject['fields'] | null;
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
    productionUrl,
    repoUrl,
    skills,
  } = project;

  return (
    <Modal onClose={onClose} open={open}>
      {image && (
        <Image
          src={`https:${image.fields.file.url}`}
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

        <div className='my-2'>
          {documentToReactComponents(shortDescription, {
            renderNode: {
              // eslint-disable-next-line react/no-unstable-nested-components
              [BLOCKS.PARAGRAPH]: (_node, children) => (
                <Typography as='h3' variant='subtitle'>
                  {children}
                </Typography>
              ),
            },
          })}
        </div>

        <div className='flex mb-6'>
          {productionUrl && (
            <a
              href={productionUrl}
              rel='noreferrer noopener'
              target='_blank'
              className={styles['link-button']}
            >
              <BoxArrowUpRight />
              <span>View on live</span>
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              rel='noreferrer noopener'
              target='_blank'
              className={styles['link-button']}
            >
              <Github />
              <span>View source code</span>
            </a>
          )}
        </div>

        <div>
          {documentToReactComponents(description, {
            renderNode: {
              // eslint-disable-next-line react/no-unstable-nested-components
              [BLOCKS.PARAGRAPH]: (_node, children) => (
                <Typography>{children}</Typography>
              ),
            },
          })}
        </div>

        <Typography className='my-4'>
          <span>Tech stack:</span>
          <span className='text-white ml-1.5'>
            {skills?.map(({ fields }) => fields.name).join(', ')}
          </span>
        </Typography>
      </div>
    </Modal>
  );
};
