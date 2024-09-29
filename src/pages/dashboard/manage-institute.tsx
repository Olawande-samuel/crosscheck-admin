import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { InstituteView } from 'src/sections/dashboard/institute/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Manage Institute - ${CONFIG.appName}`}</title>
      </Helmet>
      <InstituteView />
    </>
  );
}
