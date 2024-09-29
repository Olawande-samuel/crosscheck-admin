import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { MainContent } from 'src/layouts/main';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <MainContent layoutQuery="lg">
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Homepage
        </Typography>
      </Box>
    </MainContent>
  );
}
