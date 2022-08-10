import { useState } from 'react';

import * as Label from '@radix-ui/react-label';
import { Skill } from '@prisma/client';

import { RowInfo, RowInfoItem, Button, Input, Checkbox } from 'components';
import { trpc } from 'utils/trpc';

type SkillItemProps = {
  skill: Skill;
};

export const SkillItem = ({ skill }: SkillItemProps) => {
  const [name, setName] = useState(() => skill.name);
  const [primary, setPrimary] = useState(() => !!skill.primary);
  const { mutate: updateSingleSkill } = trpc.useMutation([
    'skill.updateSingle',
  ]);
  const { mutate: deleteSkill } = trpc.useMutation(['skill.delete']);

  return (
    <RowInfo as='div'>
      <RowInfoItem>
        <div className='flex flex-col'>
          <Label.Root className='mb-1 text-left'>Name</Label.Root>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </RowInfoItem>

      <RowInfoItem>
        <div className='flex flex-col items-start'>
          <Label.Root className='mb-1 text-left'>Primary</Label.Root>
          <Checkbox
            defaultChecked={primary}
            onCheckedChange={(checked) => setPrimary(!!checked)}
            className='ml-1'
          />
        </div>
      </RowInfoItem>
      <div className='ml-auto flex'>
        <RowInfoItem>
          <Button
            onClick={() =>
              updateSingleSkill({
                id: skill.id,
                name,
                primary,
              })
            }
          >
            Update
          </Button>
        </RowInfoItem>
        <RowInfoItem>
          <Button onClick={() => deleteSkill({ id: skill.id })}>Delete</Button>
        </RowInfoItem>
      </div>
    </RowInfo>
  );
};
