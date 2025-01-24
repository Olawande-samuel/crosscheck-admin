import Api from '@/api';
import { useQueries } from '@tanstack/react-query';

import { Card, CardHeader, CardContent } from '@mui/material';

import RecentPendingTable from './RecentPendingTable';

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
const RecentPending = () => {
  const allData = useQueries({
    queries: [
      {
        queryKey: ['get education order'],
        queryFn: () => Api.getEducationVerification('pending'),
      },
      {
        queryKey: ['get transcript order'],
        queryFn: () => Api.getTranscripts(null),
      },
    ],
  });

  const combinedData = allData.reduce((acc: (ITranscript | IEducation)[], item) => {
    if (!item.data?.data) return acc;
    if ('verifications' in item.data.data) {
      return [...acc, ...item.data.data.verifications];
    }
    if ('transcripts' in item.data.data) {
      return [
        ...acc,
        ...item.data.data.transcripts.filter((transcript) => transcript.status === 'pending'),
      ];
    }
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader title="Recent Pending" />
      <CardContent>
        <RecentPendingTable data={combinedData} header={tableHeader} />
      </CardContent>
    </Card>
  );
};

export default RecentPending;
