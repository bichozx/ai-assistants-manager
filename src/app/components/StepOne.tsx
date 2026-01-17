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
    <div className="space-y-5">
      {/* Nombre */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
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
          placeholder="Ej: Asistente de Ventas"
          className="
            w-full rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
          "
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Idioma */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Idioma
        </label>

        <select
          {...register('language', { required: true })}
          className="
            w-full rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
          <option value="Portugués">Portugués</option>
        </select>
      </div>

      {/* Tono */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tono</label>

        <select
          {...register('tone', { required: true })}
          className="
            w-full rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Profesional">Profesional</option>
          <option value="Amigable">Amigable</option>
        </select>
      </div>

      {/* Acción */}
      <div className="flex justify-end pt-6">
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="
            inline-flex items-center justify-center
            rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white
            transition
            hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
