import { AssistantFormValues } from '../types/assistants';
import { useFormContext } from 'react-hook-form';

interface Props {
  onNext: () => void;
}

export default function StepOne({ onNext }: Props) {
  const {
    register,
    formState: { errors, isValid },
  } = useFormContext<AssistantFormValues>();

  return (
    <div className="space-y-4">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium">
          Nombre del asistente
        </label>
        <input
          {...register('name', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 3,
              message: 'Mínimo 3 caracteres',
            },
          })}
          className="mt-1 w-full border rounded-md p-2"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Idioma */}
      <div>
        <label className="block text-sm font-medium">Idioma</label>
        <select
          {...register('language', { required: true })}
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
          <option value="Portugués">Portugués</option>
        </select>
      </div>

      {/* Tono */}
      <div>
        <label className="block text-sm font-medium">Tono</label>
        <select
          {...register('tone', { required: true })}
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Profesional">Profesional</option>
          <option value="Amigable">Amigable</option>
        </select>
      </div>

      {/* Botón */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
