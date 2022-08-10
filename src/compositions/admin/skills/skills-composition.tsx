import { trpc } from 'utils/trpc';

import { CreateSkillItem } from './create-skill-item';
import { SkillItem } from './skill-item';

export const SkillsComposition = () => {
  const {
    data: skills,
    status: skillsStatus,
    error: skillsError,
  } = trpc.useQuery(['skill.getAll']);

  return (
    <>
      {skills?.map((skill) => (
        <SkillItem key={skill.id} skill={skill} />
      ))}

      <CreateSkillItem />
    </>
  );
};
