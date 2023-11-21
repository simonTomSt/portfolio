import { Document } from '@contentful/rich-text-types';

import type { TypeSkill } from './TypeSkill';
import { TypeFile } from './TypeFile';
import { TypeProject } from './TypeProject';

export interface TypeHomePageFields {
  title: string;
  subtitle: Document;
  resume: TypeFile;
  aboutMeTitle: string;
  aboutMeDescription: Document;
  skills: TypeSkill[];
  projectsTitle: string;
  projects: TypeProject[];
  contactTitle: string;
  contactDescription: Document;
}
