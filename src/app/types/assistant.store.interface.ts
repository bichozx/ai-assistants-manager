import { Assistant } from './assistants';

export interface AssistantActions {
  // Modal
  openCreateModal: () => void;
  openEditModal: (assistant: Assistant) => void;
  closeModal: () => void;

  // Chat
  addMessage: (assistantId: string, message: ChatMessage) => void;
  resetChat: (assistantId: string) => void;
}

export interface AssistantState {
  // Modal
  isModalOpen: boolean;
  modalMode: ModalMode;
  selectedAssistant: Assistant | null;

  // Chat
  chats: Record<string, ChatMessage[]>;
}

export type ModalMode = 'create' | 'edit';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}
