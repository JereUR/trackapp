import { useState, useEffect } from 'react'
import { Chat } from '../types/Chat'
import useChat from '../hooks/useChats'
import { User } from '../types/User'
import { Cross1Icon } from '@radix-ui/react-icons'
import useUser from '../hooks/useUser'

const ChatWindow = ({
  chatId,
  onClose,
  allUsers,
  onNewMessage,
  isChatMenuOpen
}: {
  chatId: number
  onClose: () => void
  allUsers: User[]
  onNewMessage: () => void
  isChatMenuOpen: boolean
}) => {
  const { getChat, sendMessage } = useChat()
  const [chat, setChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState('')
  const { user } = useUser()

  useEffect(() => {
    const fetchChat = async () => {
      const fetchedChat = await getChat({ chat_id: chatId })
      setChat(fetchedChat)
    }

    fetchChat()
  }, [chatId, getChat])

  useEffect(() => {
    if (chat && chat.messages.length > 0) {
      onNewMessage()
    }
  }, [chat, onNewMessage])

  const handleSendMessage = async () => {
    if (message.trim()) {
      await sendMessage({ chat_id: chatId, content: message })
      setMessage('')
    }
  }

  const getUser = (id: number) => {
    const userToChat = allUsers.find((u) => u.id === id)
    return userToChat
      ? `${userToChat.first_name} ${userToChat.last_name}`
      : 'Desconocido'
  }

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 sm:bottom-[52px] ${
        isChatMenuOpen ? 'sm:right-[16vw]' : 'sm:right-4'
      } sm:left-auto bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 mx-2 my-2 sm:w-80 slide-in-left-3ms`}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-sm sm:text-base">
          Chat con {getUser(chatId)}
        </h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm sm:text-base"
        >
          <Cross1Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
      <div className="h-40 sm:h-64 overflow-y-auto mb-4">
        {chat?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender_id === user?.id
                ? 'bg-blue-100 dark:bg-blue-800 text-right ml-auto'
                : 'bg-gray-100 dark:bg-gray-800 text-left mr-auto'
            }`}
            style={{ maxWidth: '75%' }} // Para limitar el ancho de los mensajes
          >
            <span className="font-bold">{msg.sender_id}</span>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full mb-2 text-sm sm:text-base"
      />
      <button
        onClick={handleSendMessage}
        className="p-2 bg-blue-600 text-white rounded-lg w-full text-sm sm:text-base"
      >
        Enviar
      </button>
    </div>
  )
}

export default ChatWindow
