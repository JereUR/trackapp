export type Message = {
  id: number
  chat_id: number
  sender_id: number
  content: string
  created_at: string
}

export type Chat = {
  id: number
  sender_id: number
  recipient_id: number
  messages: Message[]
  last_message: Message | null
  created_at: string
  updated_at: string
}

export interface PropsAddChat {
  sender_id: number
  recipient_id: number
}

export const initialDatachat: PropsAddChat = {
  sender_id: 0,
  recipient_id: 0
}

export interface PropsAddMessage {
  chat_id?: number | null
  sender_id: number
  content: string
}

export const initialDataMessage: PropsAddMessage = {
  chat_id: null,
  sender_id: 0,
  content: ''
}

export interface FormErrorsMessage {
  content?: string
  [key: string]: string | undefined
}

export const initialErrorsMessage: FormErrorsMessage = {
  content: ''
}
