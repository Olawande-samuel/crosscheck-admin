import { DashboardContent } from '@/layouts/dashboard';
import { useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

import EducationTable from './EducationTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const EducationOrder = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Pending Order" {...a11yProps(0)} />
            <Tab label="Processing Order" {...a11yProps(1)} />
            <Tab label="Completed Order" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <EducationTable status="pending" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <EducationTable status="processing" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <EducationTable status="completed" />
        </CustomTabPanel>
      </Box>
    </DashboardContent>
  );
};

export default EducationOrder;
