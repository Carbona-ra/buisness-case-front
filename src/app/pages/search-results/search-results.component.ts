import { Component, inject, OnInit } from '@angular/core';
import { Advertise } from '../../entities/advertise.entity';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AdvertiseCardComponent } from "../../components/advertise-card/advertise-card.component";
import { AdvertiseService } from '../../services/advertise/advertise.service';




@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgIf, NgFor, AdvertiseCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {

  private readonly advertiseService = inject(AdvertiseService)
  private readonly router = inject(Router);
  advertises: Advertise[] = [];
  searchParams: any;

  
  ngOnInit(): void {
    this.advertises = this.advertiseService.getAdvertises();
  }

  onBackToSearch(): void {
    this.router.navigate(['/']); 
  }
}
