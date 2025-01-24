import { Helmet } from 'react-helmet-async';
import TranscriptOrder from '@/sections/dashboard/transcript';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Transcript Order - ${CONFIG.appName}`}</title>
      </Helmet>

      <TranscriptOrder />
    </>
  );
}
