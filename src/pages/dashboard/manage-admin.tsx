import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/dashboard/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Manage Admin - ${CONFIG.appName}`}</title>
      </Helmet>
      <UserView />
    </>
  );
}
