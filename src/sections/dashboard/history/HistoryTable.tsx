import useCompletedHistory from '@/hooks/useCompletedHistory';

import { Card, CardHeader, CardContent } from '@mui/material';

import ItemTable from '../overview/ItemTable';

const tableHeader = [
  {
    id: 1,
    label: 'Name',
    align: 'left' as const,
  },
  {
    id: 2,
    label: 'Date',
  },
  {
    id: 3,
    label: 'Institution',
  },
  {
    id: 4,
    label: 'Status',
  },
];

const HistoryTable = () => {
  const combinedData = useCompletedHistory();

  return (
    <Card>
      <CardContent>
        <CardHeader title="Request History" />
        <ItemTable data={combinedData} header={tableHeader} />
      </CardContent>
    </Card>
  );
};

export default HistoryTable;
