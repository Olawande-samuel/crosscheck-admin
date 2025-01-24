import React from 'react';
import { DashboardContent } from '@/layouts/dashboard';

import { Box, Typography } from '@mui/material';

import HistoryTable from './HistoryTable';

const History = () => (
  <DashboardContent maxWidth="xl">
    <Box sx={{ width: '100%' }}>
      <Typography variant="h3" marginBottom={3}>
        Request History
      </Typography>
      <Box>
        <HistoryTable />
      </Box>
    </Box>
  </DashboardContent>
);

export default History;
