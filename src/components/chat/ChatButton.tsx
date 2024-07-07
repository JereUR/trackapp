import { useState, useEffect } from 'react';
import ChatMenu from './ChatMenu';
import ChatWindow from './ChatWindow';
import { User } from '../types/User';
import useUser from '../hooks/useUser';
import { BsChatDots } from 'react-icons/bs';

const ChatButton = () => {
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [openChats, setOpenChats] = useState<number[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { getAllUsers } = useUser();
  const [newMessages, setNewMessages] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    async function getOtherUsers() {
      const res = await getAllUsers();
      if (res) setAllUsers(res);
    }

    getOtherUsers();
  }, []);

  const handleOpenChat = (userId: number) => {
    setOpenChats([...openChats, userId]);
    setNewMessages((prev) => ({ ...prev, [userId]: false }));
  };

  const handleCloseChat = (userId: number) => {
    setOpenChats(openChats.filter((id) => id !== userId));
  };

  const handleNewMessage = (userId: number) => {
    if (!openChats.includes(userId)) {
      setNewMessages((prev) => ({ ...prev, [userId]: true }));
    }
  };

  return (
    <div className="fixed bottom-4 left-4 w-auto">
      <button
        onClick={() => setIsChatMenuOpen(!isChatMenuOpen)}
        className="py-2 px-4 bg-blue-600 text-white rounded-full shadow-lg flex gap-2 items-center relative w-full"
      >
        <BsChatDots className="h-5 w-5" />
        Chat
        {Object.values(newMessages).some((hasNew) => hasNew) && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full"></span>
        )}
      </button>
      {isChatMenuOpen && (
        <ChatMenu
          onOpenChat={handleOpenChat}
          allUsers={allUsers}
          onClose={() => setIsChatMenuOpen(false)}
        />
      )}
      {openChats.map((chatId) => (
        <ChatWindow
          key={chatId}
          chatId={chatId}
          onClose={() => handleCloseChat(chatId)}
          allUsers={allUsers}
          onNewMessage={() => handleNewMessage(chatId)}
        />
      ))}
    </div>
  );
};


export default ChatButton;
