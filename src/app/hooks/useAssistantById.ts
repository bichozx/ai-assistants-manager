import { getAssistantById } from '../services/assistans.service';
import { useQuery } from '@tanstack/react-query';

export const useAssistantById = (id: string) => {
  return useQuery({
    queryKey: ['assistant', id],
    queryFn: () => getAssistantById(id),
    enabled: !!id,
  });
};
