import {
  AssistantActions,
  AssistantState,
} from '../types/assistant.store.interface';

import { create } from 'zustand';

export const useAssistantStore = create<AssistantState & AssistantActions>(
  (set) => ({
    // STATE
    // =====================
    isModalOpen: false,
    modalMode: 'create',
    selectedAssistant: null,
    chats: {},

    // MODAL ACTIONS
    // =====================
    openCreateModal: () =>
      set({
        isModalOpen: true,
        modalMode: 'create',
        selectedAssistant: null,
      }),

    openEditModal: (assistant) =>
      set({
        isModalOpen: true,
        modalMode: 'edit',
        selectedAssistant: assistant,
      }),

    closeModal: () =>
      set({
        isModalOpen: false,
        selectedAssistant: null,
      }),

    // CHAT ACTIONS
    // =====================
    addMessage: (assistantId, message) =>
      set((state) => ({
        chats: {
          ...state.chats,
          [assistantId]: [...(state.chats[assistantId] ?? []), message],
        },
      })),

    resetChat: (assistantId) =>
      set((state) => ({
        chats: {
          ...state.chats,
          [assistantId]: [],
        },
      })),
  })
);
