import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Assistant } from '../types/assistants';
import { deleteAssistant } from '../services/assistans.service';

export const useDeleteAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssistant,

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ['assistants'],
      });

      const previousAssistants = queryClient.getQueryData<Assistant[]>([
        'assistants',
      ]);

      queryClient.setQueryData<Assistant[]>(
        ['assistants'],
        (old) => old?.filter((a) => a.id !== id) ?? []
      );

      return { previousAssistants };
    },

    // ❌ Rollback si falla
    onError: (_error, _id, context) => {
      if (context?.previousAssistants) {
        queryClient.setQueryData(['assistants'], context.previousAssistants);
      }
    },

    // 🔄 Sync final
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['assistants'],
      });
    },
  });
};
