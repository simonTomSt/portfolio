import { Page } from 'next';

import { AdminLayout } from 'containers/admin-layout';
import { InfoComposition } from 'compositions/admin/info';

const Info: Page = InfoComposition;

Info.auth = true;
Info.layout = AdminLayout;

export default Info;
