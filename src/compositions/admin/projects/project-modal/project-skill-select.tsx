import type { Skill } from '@prisma/client';
import * as TogglePrimitive from '@radix-ui/react-toggle';

import styles from './project-modal.module.css';

type ProjectSkillSelectProps = {
  projectSkills: Skill[];
  skills: Skill[];
  onChange: (pressedSkillsId: string[]) => void;
};

const ProjectSkillSelect = ({
  skills,
  projectSkills,
  onChange,
}: ProjectSkillSelectProps) => {
  const onPressChange = (pressed: boolean, pressedId: string) => {
    const skillsIds = [...projectSkills.map(({ id }) => id)];

    if (!pressed) {
      return onChange(skillsIds.filter((skillsId) => skillsId !== pressedId));
    }

    return onChange(Array.from(new Set([...skillsIds, pressedId])));
  };

  return (
    <div>
      {skills.map((skill) => (
        <TogglePrimitive.Root
          key={skill.id}
          aria-label={`Toggle ${skill.name}`}
          defaultPressed={projectSkills.some(({ id }) => id === skill.id)}
          onPressedChange={(pressed) => onPressChange(pressed, skill.id)}
          className={styles['skill-select-toggle']}
        >
          {skill.name}
        </TogglePrimitive.Root>
      ))}
    </div>
  );
};

export default ProjectSkillSelect;
