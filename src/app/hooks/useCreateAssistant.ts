import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAssistant } from '../services/assistans.service';

export const useCreateAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssistant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assistants'],
      });
    },
  });
};
