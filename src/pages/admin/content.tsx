import { type Page } from 'next';

import { ContentComposition } from 'compositions/admin/content';
import { AdminLayout } from 'containers';

const Content: Page = ContentComposition;

Content.auth = true;
Content.layout = AdminLayout;

export default Content;
