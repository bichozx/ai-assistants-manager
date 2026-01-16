'use client';

import AssistantCard from './components/AssistandCard';
import AssistantRow from './components/AssistantRow';
import EmptyState from './components/EmptyState';
import { useAssistantStore } from './store/assistant.store';
import { useAssistantsQuery } from './hooks/useAssistants';
import { useDeleteAssistant } from './hooks/useDeleteAssistant';

export default function HomePage() {
  const { data, isLoading, error } = useAssistantsQuery();
  const deleteMutation = useDeleteAssistant();

  const openCreateModal = useAssistantStore((state) => state.openCreateModal);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Cargando asistentes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error al cargar los asistentes
      </div>
    );
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Asistentes IA</h1>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Crear Asistente
        </button>
      </div>

      {/* Contenido */}
      {!data || data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((assistant) => (
            <AssistantRow
              key={assistant.id}
              assistant={assistant}
              onDelete={() => deleteMutation.mutate(assistant.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
