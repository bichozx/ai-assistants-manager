import { Assistant } from '../types/assistants';
import { getAssistants } from '../services/assistans.service';
import { useQuery } from '@tanstack/react-query';

export const useAssistantsQuery = () => {
  return useQuery<Assistant[]>({
    queryKey: ['assistants'],
    queryFn: getAssistants,
  });
};
