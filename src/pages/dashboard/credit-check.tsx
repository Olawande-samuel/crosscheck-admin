import { Helmet } from 'react-helmet-async';

import { Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Credit Check - ${CONFIG.appName}`}</title>
      </Helmet>
      <Stack>
        <Typography>Credit Check</Typography>
      </Stack>
    </>
  );
}
