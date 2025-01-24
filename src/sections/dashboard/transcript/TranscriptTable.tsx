import Api from '@/api';
import { Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import OrderTable from './OrderTable';
import OrderPreview from './OrderPreview';

const TranscriptTable = ({
  status = 'pending',
}: {
  status: 'pending' | 'completed' | 'processing';
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['get transcript order'],
    queryFn: () => Api.getTranscripts(null),
  });

  return (
    <div className="flex md:flex-row gap-8">
      {isLoading ? (
        <Loader className="animate-spine" />
      ) : (
        <>
          <OrderTable
            title="New Transcript orders"
            data={data?.data?.transcripts?.filter((item) => item.status === status) ?? []}
          />
          <OrderPreview status={status} />
        </>
      )}
    </div>
  );
};

export default TranscriptTable;
