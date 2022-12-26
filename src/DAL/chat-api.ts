type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type ChatMessageAPIType = {
   message: string
   photo: string
   userId: number
   userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
type EventNamesType = 'messages-received' | 'status-changed'

const subscribers = {
   'messages-received': [] as MessagesReceivedSubscriberType[],
   'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
const closeHandler = () => {
   notifyAboutStatusChanged('pending')
   setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
   let newMessages = JSON.parse(e.data)
   subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
   notifyAboutStatusChanged('ready')
}
const errorHandler = () => {
   notifyAboutStatusChanged('error')
   console.error('REFRESH PAGE!')
}
const cleanUp = () => {
   ws?.removeEventListener('close', closeHandler)
   ws?.removeEventListener('message', messageHandler)
   ws?.removeEventListener('open', openHandler)
   ws?.removeEventListener('error', errorHandler)
}
const notifyAboutStatusChanged = (status: StatusType) => {
   subscribers['status-changed'].forEach(s => s(status))
}


function createChannel() {
   cleanUp()
   ws?.close()
   ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
   notifyAboutStatusChanged('pending')
   ws.addEventListener('close', closeHandler)
   ws.addEventListener('message', messageHandler)
   ws.addEventListener('open', openHandler)
   ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
   start(){
      createChannel()
   },
   stop(){
      subscribers['messages-received'] = [] 
      subscribers['status-changed'] = []
      cleanUp()
      ws?.close()
   },
   subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
      // @ts-ignore
      subscribers[eventName].push(callback)
      return () => {
         // @ts-ignore
         subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
     }
   },
   unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
   },
   sendMessage(message: string){
      ws?.send(message)
   }
}