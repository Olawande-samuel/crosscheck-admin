import { Helmet } from 'react-helmet-async';
import EducationOrder from '@/sections/dashboard/education';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Education Verification - ${CONFIG.appName}`}</title>
      </Helmet>
      <EducationOrder />
    </>
  );
}
