import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AdvertiseService } from '../../services/advertise/advertise.service';
import { Advertise } from '../../entities/advertise.entity';
import { AdvertiseCardComponent } from "../../components/advertise-card/advertise-card.component";
import { NgFor } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { lastValueFrom } from 'rxjs';
import { SliderComponent } from "../../components/slider/slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AdvertiseCardComponent, NgFor, SearchBarComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  title = 'skibidi';
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly advertiseService = inject(AdvertiseService)
  
  advertises: Advertise[] = []

  async ngOnInit(): Promise<void> {
    this.advertises = await this.advertiseService.list()
    this.advertises = this.advertises.slice(0, 10);

    console.log(this.advertises)

  }

  async onFormSubmitted(params: { price?: number; slot?: number; place?: string }): Promise<void> {
    try {
      const advertises = await lastValueFrom(this.advertiseService.researchList(params));
      
      this.advertiseService.setAdvertises(advertises);
      
      this.router.navigate(['/résultats-de-recherche']);
    } catch (error) {
      console.error('Erreur lors de la recherche des annonces :', error);
    }
  }

  onClickLogOut() {
    this.authService.logout()
    this.router.navigateByUrl('/connexion')
  }
  
}
