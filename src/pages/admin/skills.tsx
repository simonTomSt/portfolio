import { Page } from 'next';

import { SkillsComposition } from 'compositions/admin/skills';
import { AdminLayout } from 'containers/admin-layout';

const Skills: Page = SkillsComposition;

Skills.auth = true;
Skills.layout = AdminLayout;

export default Skills;
