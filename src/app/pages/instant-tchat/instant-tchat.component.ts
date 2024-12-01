import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/user.entity';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message, MessageInput } from '../../entities/message.entity';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesService } from '../../services/messages/messages.service';
import { UsersListComponent } from "../users-list/users-list.component";

@Component({
  selector: 'app-instant-tchat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, DatePipe, UsersListComponent],
  templateUrl: './instant-tchat.component.html',
  styleUrl: './instant-tchat.component.scss'
})
export class InstantTchatComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly usersService = inject(UsersService)
  private readonly messagesService = inject(MessagesService)
  private readonly route = inject(ActivatedRoute)

  private socket: WebSocket;
  receiver: User
  form: FormGroup
  messages: Message[] = []

  private senderId: number
  private receiverId: number

  async ngOnInit(): Promise<void> {
    this.senderId = parseInt(this.route.snapshot.queryParamMap.get('s'))
    this.receiverId = parseInt(this.route.snapshot.queryParamMap.get('r'))

    this.receiver = await this.usersService.getById(this.receiverId)
    
    this.messages = await this.messagesService.listForSenderAndReceiver(this.senderId, this.receiverId)
    console.log(this.messages)

    this.form = new FormGroup({
      content: new FormControl(undefined,[
        Validators.required
      ])
    })


    this.initSocket()
   
  }

  onClickSendMessage() {
    if (this.form.valid){
      const {content} = this.form.value
      const message: MessageInput = {
        receiverId: this.receiverId,
        senderId: this.senderId,
        content: content
      }

      this.socket.send(JSON.stringify({
        type: 'conversation.message.created',
        data: message
      }))

      this.form.reset()
    }
  
  }


  private initSocket(): void {
    this.socket = new WebSocket(`ws://${environment.wsAddress}:${environment.wsPort}`);

    // Lorsque la connexion est ouverte
    this.socket.onopen = () => {
      console.info('WebSocket is connected.');

      this.socket.send(JSON.stringify({
        type: 'authentication',
        data: this.authService.token
      }))

    };

    // Lorsqu'un message est reçu du serveur
    this.socket.onmessage = (event) => {
      console.log('Message received: ', event.data);
      let {type, data} = JSON.parse(event.data)
      data = JSON.parse(data)
      if (type === 'error') {
        console.error(data);
      } else if (type === 'conversation.message.added'){
        const message = Message.fromHttp(data)
        this.messages.push(message)  
      }
      console.log(type, data);
      
    };

    this.socket.onerror = (event) => {
      console.error('Une erreur est survenue:', event)
    }

    this.socket.onclose = () => {
      // TODO: Désactiver l'input d'envoie de message
    }
  }


}
