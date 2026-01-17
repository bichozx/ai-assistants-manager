'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { AssistantFormValues } from '../types/assistants';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useAssistantStore } from '../store/assistant.store';

export default function AssistantModal() {
  const { isModalOpen, modalMode, selectedAssistant, closeModal } =
    useAssistantStore();

  const [step, setStep] = useState<1 | 2>(1);

  const methods = useForm<AssistantFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      language: 'Español',
      tone: 'Profesional',
      responseLength: {
        short: 0,
        medium: 0,
        long: 0,
      },
      audioEnabled: false,
      rules: '',
    },
  });

  // Precarga en edición
  useEffect(() => {
    if (modalMode === 'edit' && selectedAssistant) {
      methods.reset({
        name: selectedAssistant.name,
        language: selectedAssistant.language,
        tone: selectedAssistant.tone,
        responseLength: selectedAssistant.responseLength,
        audioEnabled: selectedAssistant.audioEnabled,
        rules: selectedAssistant.rules,
      });
    }
  }, [modalMode, selectedAssistant, methods]);

  const handleClose = () => {
    setStep(1);
    methods.reset();
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-end justify-center
        bg-black/40
        sm:items-center
      "
    >
      {/* Modal */}
      <div
        className="
          w-full
          rounded-t-2xl bg-white
          p-5
          shadow-xl
          max-h-[90vh]
          overflow-y-auto
          sm:max-w-lg
          sm:rounded-2xl
          sm:p-6
        "
      >
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold sm:text-xl">
            {modalMode === 'create' ? 'Crear Asistente' : 'Editar Asistente'}
          </h2>

          {/* Indicador de pasos */}
          <p className="mt-1 text-sm text-gray-500">Paso {step} de 2</p>

          {/* Barra visual del paso */}
          <div className="mt-2 flex gap-2">
            <div
              className={`h-1 flex-1 rounded-full ${
                step >= 1 ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
            <div
              className={`h-1 flex-1 rounded-full ${
                step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          {step === 1 && <StepOne onNext={() => setStep(2)} />}
          {step === 2 && <StepTwo onBack={() => setStep(1)} />}
        </FormProvider>

        {/* Cancelar */}
        <button
          onClick={handleClose}
          className="
            mt-4
            w-full
            text-sm
            text-gray-500
            transition
            hover:text-gray-700
            sm:w-auto
          "
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
