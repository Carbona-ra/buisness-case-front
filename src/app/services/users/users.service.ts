import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User, UserHttp, UserJWT } from '../../entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { BaseServices } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseServices {

  private readonly http = inject(HttpClient)

  private userJWT$: BehaviorSubject<UserJWT | undefined> = new BehaviorSubject(undefined)

  constructor() {
    super('api/users')
  }

  selectUserJWT(): Observable<UserJWT | undefined> {
    return this.userJWT$.asObservable()
  }

  get userJWT(): UserJWT | undefined {
    return this.userJWT$.getValue()
  }

  set userJWT(value: UserJWT | undefined) {
    this.userJWT$.next(value)
  }

  async list(): Promise<User[]> {
    const req = this.http.get<{ 'hydra:member': UserHttp[] }>(this.ApiUrl);
    const res = await lastValueFrom(req)   

    return res['hydra:member'].map(userhttp => User.fromHttp(userhttp))
  }

  async getById(id: number): Promise<User> {
    const req = this.http.get<UserHttp>(`${this.ApiUrl}/${id}`)
    const res = await lastValueFrom(req)
    
    return User.fromHttp(res)
  }
}
