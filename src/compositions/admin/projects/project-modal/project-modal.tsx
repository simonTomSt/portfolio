import { useCallback, useEffect, useMemo, useState } from 'react';

import { Project } from '@prisma/client';
import { useForm } from 'react-hook-form';

import {
  Button,
  Input,
  Modal,
  Textarea,
  Typography,
  type ModalProps,
} from 'components';
import { trpc } from 'utils/trpc';

import styles from './project-modal.module.css';
import { ImageUpload } from './image-upload';

type ProjectModalProps = Omit<ModalProps, 'children'> & {
  project: Project | null;
};

export const ProjectModal = ({ open, onClose, project }: ProjectModalProps) => {
  const receivedProj = useMemo(() => project, [project]);

  const { handleSubmit, register, reset, setValue } = useForm<Project>();
  const { mutate: createOrUpdateProject } = trpc.useMutation([
    'project.createOrUpdateProject',
  ]);
  const { mutate: deleteProject } = trpc.useMutation(['project.delete']);

  const onImageUpload = useCallback(
    (imageUrl: string) => {
      setValue('image', imageUrl);
    },
    [setValue],
  );

  const onSubmit = handleSubmit((data) => {
    createOrUpdateProject({ ...data, id: project?.id });
  });

  useEffect(() => {
    if (receivedProj) {
      reset(receivedProj);
    }
  }, [receivedProj, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <ImageUpload
        onSuccessfulUpload={onImageUpload}
        initialImage={project?.image}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        <Input {...register('title')} />
        <Input {...register('url')} />
        <Input {...register('githubUrl')} />
        <Textarea {...register('shortDescription')} />
        <Textarea {...register('description')} />

        <Button type='submit'>Save</Button>
      </form>

      {project?.id && (
        <Button onClick={() => deleteProject({ id: project.id })}>
          Delete
        </Button>
      )}
    </Modal>
  );
};
