import { useEffect, useState } from 'react'
import useChat from '../hooks/useChats'
import useUser from '../hooks/useUser'
import { User } from '../types/User'
import { Cross1Icon } from '@radix-ui/react-icons'

const ChatMenu = ({
  onOpenChat,
  allUsers,
  onClose
}: {
  onOpenChat: (userId: number) => void
  allUsers: User[]
  onClose: () => void
}) => {
  const [usersToChat, setUsersToChat] = useState<User[]>([])
  const { chats, getChats } = useChat()
  const { user, getUsersToChat } = useUser()
  const [q, setQ] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value)
  }

  useEffect(() => {
    async function getUsers(q: string) {
      const res = await getUsersToChat({ q })
      if (res) setUsersToChat(res)
    }

    if (user) {
      getChats({ user_id: user.id })
      getUsers(q)
    }
  }, [user, q])

  const getUser = (id: number) => {
    const userToChat = allUsers.find((u) => u.id === id)
    return userToChat
      ? `${userToChat.first_name} ${userToChat.last_name}`
      : 'Desconocido'
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-16 sm:left-4 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 mx-2 my-2 sm:w-[15vw] sm:max-w-xs">
      <h3 className="font-bold mb-2 text-sm sm:text-base">
        Selecciona un usuario para iniciar un chat
      </h3>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={q}
        onChange={handleSearch}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full mb-4 text-sm sm:text-base"
      />
      <h3 className="font-bold mb-2 text-sm sm:text-base">Chats abiertos</h3>
      <ul className="mb-4">
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => onOpenChat(chat.recipient_id)}
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              Usuario {getUser(chat.recipient_id)}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="font-bold mb-2 text-sm sm:text-base">
        Todos los usuarios
      </h3>
      <ul>
        {usersToChat.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => onOpenChat(user.id)}
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              {user.first_name} {user.last_name}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm sm:text-base"
      >
        <Cross1Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  )
}

export default ChatMenu
