import { useState } from 'react';

import * as Label from '@radix-ui/react-label';

import { RowInfo, RowInfoItem, Button, Input, Checkbox } from 'components';
import { trpc } from 'utils/trpc';

export const CreateSkillItem = () => {
  const [name, setName] = useState('');
  const [primary, setPrimary] = useState(false);

  const { mutate: createSkill } = trpc.useMutation(['skill.create']);

  return (
    <RowInfo>
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
              createSkill({
                name,
                primary,
              })
            }
          >
            Create new
          </Button>
        </RowInfoItem>
      </div>
    </RowInfo>
  );
};
