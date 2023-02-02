import { useCallback, useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import type { Project } from '@prisma/client';

import {
  Button,
  Input,
  Modal,
  Textarea,
  type ModalProps,
  Loader,
} from 'components';
import { trpc } from 'utils/trpc';
import type { ProjectType } from 'utils/types/common';

import styles from './project-modal.module.css';
import { ImageUpload } from './image-upload';
import ProjectSkillSelect from './project-skill-select';

type ProjectModalProps = Omit<ModalProps, 'children'> & {
  project: ProjectType | null;
};

export const ProjectModal = ({ open, onClose, project }: ProjectModalProps) => {
  const receivedProj = useMemo(() => project, [project]);

  const { handleSubmit, register, reset, setValue } = useForm<
    Project & { skills: string[] }
  >();
  const { mutate: createOrUpdateProject } = trpc.useMutation([
    'project.createOrUpdateProject',
  ]);
  const { mutate: deleteProject } = trpc.useMutation(['project.delete']);
  const {
    data: skills,
    status: skillsStatus,
    error: skillsError,
  } = trpc.useQuery(['skill.getAll']);

  const onImageUpload = useCallback(
    (imageUrl: string) => {
      setValue('image', imageUrl);
    },
    [setValue],
  );

  const onSubmit = handleSubmit((data) => {
    createOrUpdateProject({
      ...data,
      id: project?.id,
    });
  });

  useEffect(() => {
    if (receivedProj) {
      reset({
        ...receivedProj,
        skills: receivedProj.skills?.map(({ id }) => id),
      });
    }
  }, [receivedProj, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <ImageUpload
        onSuccessfulUpload={onImageUpload}
        initialImage={project?.image}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        <Label.Root className={styles.label}>
          Title
          <Input {...register('title')} />
        </Label.Root>
        <Label.Root className={styles.label}>
          Project url
          <Input {...register('url')} />
        </Label.Root>
        <Label.Root className={styles.label}>
          Project github url
          <Input {...register('githubUrl')} />
        </Label.Root>
        <Label.Root className={styles.label}>
          Short Description
          <Textarea {...register('shortDescription')} />
        </Label.Root>
        <Label.Root className={styles.label}>
          Description
          <Textarea {...register('description')} />
        </Label.Root>

        <Label.Root className={styles.label}>
          Project skills
          {skillsStatus === 'loading' ? (
            <Loader />
          ) : (
            <ProjectSkillSelect
              onChange={(pressedSkillsIds) =>
                setValue('skills', pressedSkillsIds)
              }
              projectSkills={receivedProj?.skills || []}
              skills={skills || []}
            />
          )}
        </Label.Root>

        <div className='flex'>
          <Button type='submit'>Save</Button>

          {project?.id && (
            <Button
              onClick={() => deleteProject({ id: project.id })}
              type='button'
              color='text'
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};
