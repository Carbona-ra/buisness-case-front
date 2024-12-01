import { inject, Injectable } from '@angular/core';
import { BaseServices } from '../base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageHttp, Message } from '../../entities/message.entity';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseServices{

  private readonly http = inject(HttpClient)

  constructor() { 
    super('api/messages')
  }

  async listForSenderAndReceiver(senderId: number, receiverId: number): Promise<Message[]> {
    const params = new HttpParams({fromObject: {
      'sender.id': senderId,    
      'reciver.id': receiverId
    }})
    const req = this.http.get<{ 'hydra:member' : MessageHttp[] }>(this.ApiUrl, { params: params })
    const res = await lastValueFrom(req)
    
    return res['hydra:member'].map(message => Message.fromHttp(message))
  }

}
