import { useFormContext, useWatch } from 'react-hook-form';

import { AssistantFormValues } from '../types/assistants';
import { useAssistantStore } from '../store/assistant.store';
import { useCreateAssistant } from '../hooks/useCreateAssistant';
import { useUpdateAssistant } from '../hooks/useUpdateAssistant';

interface Props {
  onBack: () => void;
}

export default function StepTwo({ onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<AssistantFormValues>();

  const { modalMode, selectedAssistant, closeModal } = useAssistantStore();

  const createMutation = useCreateAssistant();
  const updateMutation = useUpdateAssistant();

  // 👀 Observamos los valores en tiempo real
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
        onSuccess: () => closeModal(),
      });
    } else if (modalMode === 'edit' && selectedAssistant) {
      updateMutation.mutate(
        { id: selectedAssistant.id, data },
        {
          onSuccess: () => closeModal(),
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="font-medium">Longitud de respuestas (%)</h3>

      {/* Short */}
      <div>
        <label className="block text-sm">Cortas</label>
        <input
          type="number"
          {...register('responseLength.short', {
            required: true,
            min: 0,
            max: 100,
            valueAsNumber: true,
          })}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      {/* Medium */}
      <div>
        <label className="block text-sm">Medias</label>
        <input
          type="number"
          {...register('responseLength.medium', {
            required: true,
            min: 0,
            max: 100,
            valueAsNumber: true,
          })}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      {/* Long */}
      <div>
        <label className="block text-sm">Largas</label>
        <input
          type="number"
          {...register('responseLength.long', {
            required: true,
            min: 0,
            max: 100,
            valueAsNumber: true,
          })}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      {/* Validación matemática */}
      <p
        className={`text-sm ${
          isValidTotal ? 'text-green-600' : 'text-red-500'
        }`}
      >
        Total: {total}% {!isValidTotal && '(Debe sumar 100%)'}
      </p>

      {/* Audio */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register('audioEnabled')} />
        <label className="text-sm">Habilitar respuestas de audio</label>
      </div>

      {/* Botones */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border rounded-md"
        >
          Atrás
        </button>

        <button
          type="submit"
          disabled={!isValidTotal || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
