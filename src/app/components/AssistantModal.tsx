'use client';

import { Assistant, AssistantFormValues } from '../types/assistants';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

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
      rules: '', // ✅
    },
  });

  // Pre-cargar datos en modo edición
  useEffect(() => {
    if (modalMode === 'edit' && selectedAssistant) {
      methods.reset({
        name: selectedAssistant.name,
        language: selectedAssistant.language,
        tone: selectedAssistant.tone,
        responseLength: selectedAssistant.responseLength,
        audioEnabled: selectedAssistant.audioEnabled,
        rules: selectedAssistant.rules, // ✅
      });
    }
  }, [modalMode, selectedAssistant, methods]);

  // Reset al cerrar
  const handleClose = () => {
    setStep(1);
    methods.reset();
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {modalMode === 'create' ? 'Crear Asistente' : 'Editar Asistente'}
        </h2>

        <FormProvider {...methods}>
          {step === 1 && <StepOne onNext={() => setStep(2)} />}
          {step === 2 && <StepTwo onBack={() => setStep(1)} />}
        </FormProvider>

        <button
          onClick={handleClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
