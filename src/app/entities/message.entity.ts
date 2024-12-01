export interface MessageHttp {
  
    id: number; 
    content: string;
    createdAt: string;
    sender: {
      id: number;
    };
    reciver: {
      id: number; 
    }; 
}

export interface Message {
  id: number;
  content: string;
  sentDate: Date;
  sender: number;    
  receiver: number;  
}

export namespace Message {
  export function fromHttp(messageHttp: MessageHttp): Message {
    return {
      id: messageHttp.id,
      content: messageHttp.content,
      sentDate: new Date(messageHttp.createdAt), 
      sender: messageHttp.sender.id,              
      receiver: messageHttp.reciver.id      
    };
  }
}


export interface MessageInput {
  senderId: number
  receiverId: number
  content: string
}



// export interface MessageHttp {
//   id: number
//   sender: { id: number }
//   receiver: { id: number }
//   content: string
//   sentDate: string
// }

// export interface Message {
//   id: number
//   sender: { id: number }
//   receiver: { id: number }
//   content: string
//   sentDate: string
// }

// export namespace Message {
//   function fromHttp(messageHttp: MessageHttp): Message {
//       return {
//           
//       }
//   }
// }