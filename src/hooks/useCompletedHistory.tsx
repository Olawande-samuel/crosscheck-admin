import Api from '@/api';
import { useQueries } from '@tanstack/react-query';

const useCompletedHistory = () => {
  const allData = useQueries({
    queries: [
      {
        queryKey: ['get completed education order'],
        queryFn: () => Api.getEducationVerification('completed'),
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
        ...item.data.data.transcripts.filter((transcript) => transcript.status === 'completed'),
      ];
    }
    return acc;
  }, []);

  return combinedData ?? [];
};

export default useCompletedHistory;
