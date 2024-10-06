import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ManageAdminView } from 'src/sections/dashboard/manage-admin/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Manage Admin - ${CONFIG.appName}`}</title>
      </Helmet>
      <ManageAdminView />
    </>
  );
}
