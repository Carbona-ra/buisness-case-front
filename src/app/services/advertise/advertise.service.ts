import { inject, Injectable } from '@angular/core';
import { BaseServices } from '../base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Advertise, AdvertiseHttp } from '../../entities/advertise.entity';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService extends BaseServices{

  private readonly http = inject(HttpClient)

  private advertises: Advertise[] = [];

  setAdvertises(advertises: Advertise[]): void {
    this.advertises = advertises;
  }

  getAdvertises(): Advertise[] {
    return this.advertises;
  }

  constructor() {
    super('api/advertises')
  }

  async list(): Promise<Advertise[]> {
    const req = this.http.get<{ 'hydra:member': AdvertiseHttp[] }>(this.ApiUrl);
    const res = await lastValueFrom(req)   

    return res['hydra:member'].map(userhttp => Advertise.fromHttp(userhttp))
  }

  getAdvertiseById(id: number): Observable<Advertise> {
    return this.http.get<AdvertiseHttp>(`${this.ApiUrl}/${id}`).pipe(
      // Conversion de l'objet HTTP en une instance de Advertise
      map(advertiseHttp => Advertise.fromHttp(advertiseHttp))
    );
  }

  researchList(filters?: { price?: number; slot?: number; place?: string }): Observable<Advertise[]> {
    let params = new HttpParams();

    // Ajout conditionnel des paramètres de requête
    if (filters) {
        if (filters.price !== null && filters.price !== undefined) {
            params = params.set('price', filters.price.toString());
        }
        if (filters.slot !== null && filters.slot !== undefined) {
            params = params.set('totalPlaceNumber', filters.slot.toString());
        }
        if (filters.place !== null && filters.place !== undefined) {
            params = params.set('place', filters.place); 
        }
    }

    // Requête HTTP avec les paramètres
    return this.http.get<{ 'hydra:member': AdvertiseHttp[] }>(this.ApiUrl, { params }).pipe(
        // Transformation de la réponse
        map(response => response['hydra:member'].map(advertiseHttp => Advertise.fromHttp(advertiseHttp)))
    );
}
}
