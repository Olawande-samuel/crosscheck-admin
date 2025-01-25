import { Helmet } from 'react-helmet-async';

import { Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import History from '@/sections/dashboard/history';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`History - ${CONFIG.appName}`}</title>
      </Helmet>
     <History />
    </>
  );
}
