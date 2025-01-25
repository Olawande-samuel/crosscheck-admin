import Api from '@/api';
import { Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import OrderTable from './OrderTable';
import OrderPreview from './OrderPreview';

const EducationTable = ({
  status = 'pending',
}: {
  status: 'pending' | 'completed' | 'processing';
  }) => {

  const { data, isLoading } = useQuery({
    queryKey: ['get education order'],
    queryFn: () => Api.getEducationVerification(status),
    enabled: !!status,
  });
  return (
    <div className="flex flex-wrap  gap-8">
      {isLoading ? (
        <Loader className="animate-spin mx-auto" />
      ) : (
        <>
          <OrderTable
            title="New Education order"
            data={data?.data?.verifications?.filter((item) => item.status === status) ?? []}
          />
          <OrderPreview status={status} />
        </>
      )}
    </div>
  );
};

export default EducationTable;
