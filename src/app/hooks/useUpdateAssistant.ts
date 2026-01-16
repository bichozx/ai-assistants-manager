import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Assistant } from '../types/assistants';
import { updateAssistant } from '../services/assistans.service';

export const useUpdateAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Assistant, 'id'> }) =>
      updateAssistant(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assistants'],
      });
    },
  });
};
