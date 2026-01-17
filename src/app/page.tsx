'use client';

import AssistantRow from './components/AssistantRow';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { useAssistantStore } from './store/assistant.store';
import { useAssistantsQuery } from './hooks/useAssistants';
import { useDeleteAssistant } from './hooks/useDeleteAssistant';
import { useState } from 'react';

export default function HomePage() {
  const { data, isLoading, error } = useAssistantsQuery();
  const [toastKey, setToastKey] = useState(0);
  const deleteMutation = useDeleteAssistant();

  const openCreateModal = useAssistantStore((s) => s.openCreateModal);

  const [assistantToDelete, setAssistantToDelete] = useState<string | null>(
    null
  );

  const handleConfirmDelete = () => {
    if (!assistantToDelete) return;

    deleteMutation.mutate(assistantToDelete, {
      onSuccess: () => {
        setAssistantToDelete(null);
        setToastKey((prev) => prev + 1);
      },
    });
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error al cargar los asistentes
      </div>
    );
  }

  return (
    <>
      <main className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Asistentes IA</h1>
            <p className="text-sm text-gray-500">
              Administra y entrena tus asistentes
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="
              w-full sm:w-auto
              rounded-lg bg-blue-600 px-4 py-2
              text-sm font-medium text-white
              hover:bg-blue-700
            "
          >
            Crear asistente
          </button>
        </header>

        {/* Lista */}
        {!data || data.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="space-y-3">
            {data.map((assistant) => (
              <AssistantRow
                key={assistant.id}
                assistant={assistant}
                onDelete={() => setAssistantToDelete(assistant.id)}
                isDeleting={
                  deleteMutation.isPending &&
                  deleteMutation.variables === assistant.id
                }
              />
            ))}
          </section>
        )}
      </main>

      {/* MODAL */}
      <ConfirmDeleteModal
        open={Boolean(assistantToDelete)}
        isLoading={deleteMutation.isPending}
        onClose={() => setAssistantToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      {/* Toast éxito */}
      <Toast toastKey={toastKey} message="Asistente eliminado correctamente" />
    </>
  );
}
