import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User, UserHttp, UserJWT } from '../../entities/user.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    // Définir l'en-tête Content-Type pour s'assurer que la requête est envoyée en JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json'
    });
  
    // Passer les en-têtes dans la requête HTTP
    const req = this.http.patch<UserHttp>(`${this.ApiUrl}/${id}`, userData, { headers });
  
    // Attendre la réponse de l'API
    const res = await lastValueFrom(req);
    
    // Retourner les données après les avoir transformées
    return User.fromHttp(res);
  }
  
  
}
