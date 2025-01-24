import useCompletedHistory from '@/hooks/useCompletedHistory';

import { Card, CardHeader, CardContent } from '@mui/material';

import RecentCompletedTable from './RecentCompletedTable';

const tableHeader = [
  {
    id: 1,
    label: 'Requester',
    align: 'left' as const,
  },
  {
    id: 2,
    label: 'Institution',
  },
  {
    id: 3,
    label: 'Date',
  },
];
const RecentCompleted = () => {
  const data = useCompletedHistory();
  console.log({ data });
  return (
    <Card>
      <CardHeader title="Recent Completed" />
      <CardContent>
        <RecentCompletedTable data={data} header={tableHeader} />
      </CardContent>
    </Card>
  );
};

export default RecentCompleted;
