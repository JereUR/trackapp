'use client'

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'
import { Chat, PropsAddChat } from '../types/Chat'

type ChatContextType = {
  chats: Chat[]
  loadingChat: boolean
  selectedChat: Chat | null
  getChats: ({ user_id }: { user_id: number }) => Promise<boolean>
  selectChat: ({
    id,
    user_id
  }: {
    id: number
    user_id: number
  }) => Promise<boolean>
  getChat: ({ chat_id }: { chat_id: number }) => Promise<Chat | null>
  addChat: ({ dataChat }: { dataChat: PropsAddChat }) => Promise<boolean>
  sendMessage: ({
    chat_id,
    content
  }: {
    chat_id: number
    content: string
  }) => Promise<boolean>
}

export const ChatContext = createContext<ChatContextType | null>(null)

export default function ChatContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [loadingChat, setLoadingChat] = useState<boolean>(true)
  const { toast } = useToast()
  const { user, token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getChats({ user_id }: { user_id: number }): Promise<boolean> {
    setLoadingChat(true)
    const url = `${BASE_URL}api/v1/all_chat?user_id=${user_id}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setChats(response.data)
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingChat(false)
    }
  }

  async function selectChat({
    id,
    user_id
  }: {
    id: number
    user_id: number
  }): Promise<boolean> {
    const res = await getChats({ user_id })
    if (res) {
      setSelectedChat(chats.find((c) => c.id === id) || null)
      return true
    } else {
      return false
    }
  }

  async function getChat({
    chat_id
  }: {
    chat_id: number
  }): Promise<Chat | null> {
    setLoadingChat(true)
    const url = `${BASE_URL}api/v1/chat?chat_id=${chat_id}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
    } finally {
      setLoadingChat(false)
    }
  }

  async function addChat({
    dataChat
  }: {
    dataChat: PropsAddChat
  }): Promise<boolean> {
    setLoadingChat(true)
    const newChat = {
      sender_id: dataChat.sender_id,
      recipient_id: dataChat.recipient_id
    }

    const url = `${BASE_URL}api/v1/chat`
    try {
      const response = await axios.post(
        url,
        {
          chat: newChat
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingChat(false)
    }
  }

  async function sendMessage({
    chat_id,
    content
  }: {
    chat_id: number
    content: string
  }): Promise<boolean> {
    setLoadingChat(true)
    const url = `${BASE_URL}api/v1/chat/${chat_id}/message`
    try {
      const response = await axios.post(
        url,
        {
          message: {
            content
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingChat(false)
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        loadingChat,
        selectedChat,
        getChats,
        selectChat,
        getChat,
        addChat,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
