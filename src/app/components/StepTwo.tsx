import { useFormContext, useWatch } from 'react-hook-form';

import { AssistantFormValues } from '../types/assistants';
import { useAssistantStore } from '../store/assistant.store';
import { useCreateAssistant } from '../hooks/useCreateAssistant';
import { useUpdateAssistant } from '../hooks/useUpdateAssistant';

interface Props {
  onBack: () => void;
}

export default function StepTwo({ onBack }: Props) {
  const { register, handleSubmit, control } =
    useFormContext<AssistantFormValues>();

  const { modalMode, selectedAssistant, closeModal } = useAssistantStore();

  const createMutation = useCreateAssistant();
  const updateMutation = useUpdateAssistant();

  // 👀 Valores reactivos
  const short = useWatch({ control, name: 'responseLength.short' }) || 0;
  const medium = useWatch({ control, name: 'responseLength.medium' }) || 0;
  const long = useWatch({ control, name: 'responseLength.long' }) || 0;

  const total = Number(short) + Number(medium) + Number(long);
  const isValidTotal = total === 100;

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: AssistantFormValues) => {
    if (!isValidTotal) return;

    if (modalMode === 'create') {
      createMutation.mutate(data, {
        onSuccess: closeModal,
      });
    }

    if (modalMode === 'edit' && selectedAssistant) {
      updateMutation.mutate(
        { id: selectedAssistant.id, data },
        { onSuccess: closeModal }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Título */}
      <div>
        <h3 className="text-base font-medium text-gray-800">
          Longitud de respuestas
        </h3>
        <p className="text-sm text-gray-500">
          La suma debe ser exactamente 100%
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Cortas */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Cortas
          </label>
          <input
            type="number"
            {...register('responseLength.short', {
              min: 0,
              max: 100,
              valueAsNumber: true,
            })}
            className="
              w-full rounded-lg border px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        {/* Medias */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Medias
          </label>
          <input
            type="number"
            {...register('responseLength.medium', {
              min: 0,
              max: 100,
              valueAsNumber: true,
            })}
            className="
              w-full rounded-lg border px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        {/* Largas */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Largas
          </label>
          <input
            type="number"
            {...register('responseLength.long', {
              min: 0,
              max: 100,
              valueAsNumber: true,
            })}
            className="
              w-full rounded-lg border px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* Validación visual */}
      <div
        className={`rounded-lg border px-3 py-2 text-sm ${
          isValidTotal
            ? 'border-green-500 text-green-600 bg-green-50'
            : 'border-red-500 text-red-600 bg-red-50'
        }`}
      >
        Total: {total}% {!isValidTotal && '· Debe sumar 100%'}
      </div>

      {/* Audio */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          {...register('audioEnabled')}
          className="rounded border-gray-300"
        />
        Habilitar respuestas de audio
      </label>

      {/* Acciones */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="
            rounded-lg border px-4 py-2 text-sm
            hover:bg-gray-50
          "
        >
          Atrás
        </button>

        <button
          type="submit"
          disabled={!isValidTotal || isLoading}
          className="
            rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white
            transition
            hover:bg-blue-700
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
