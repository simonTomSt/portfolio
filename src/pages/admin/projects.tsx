import { AdminLayout } from 'containers/admin-layout';
import { ProjectsComposition } from 'compositions/admin/projects';

const Projects = ProjectsComposition;

Projects.auth = true;
Projects.layout = AdminLayout;

export default Projects;
