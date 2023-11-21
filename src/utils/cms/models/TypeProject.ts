import { Document } from '@contentful/rich-text-types';

import { TypeFile } from './TypeFile';
import { TypeSkill } from './TypeSkill';

export interface TypeProject {
  sys: { id: string };
  fields: {
    title: string;
    shortDescription: Document;
    description: Document;
    repoUrl?: string;
    productionUrl?: string;
    skills?: TypeSkill[];
    image?: TypeFile;
  };
}
