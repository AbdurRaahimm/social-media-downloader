import { useState } from 'react';
import Modal from './Modal';
import Chatbot from './Chatbot';
import { MessageSquare } from 'lucide-react';

export default function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110"
      >
        <MessageSquare size={24} />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Chatbot />
      </Modal>
    </>
  );
}
