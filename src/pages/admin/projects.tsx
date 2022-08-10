import { Page } from 'next';

import { AdminLayout } from 'containers/admin-layout';
import { ProjectsComposition } from 'compositions/admin/projects';

const Projects: Page = ProjectsComposition;

Projects.auth = true;
Projects.layout = AdminLayout;

export default Projects;
