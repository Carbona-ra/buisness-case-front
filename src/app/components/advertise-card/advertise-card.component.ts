import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-advertise-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './advertise-card.component.html',
  styleUrl: './advertise-card.component.scss'
})
export class AdvertiseCardComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() price!: number;
  @Input() adresse!: {
    city: string;
    streetName: string;
    adresseNumber: number;
    country: string;
    postalCode: number;
  };
  @Input() presentationPicture!: string;
  @Input() advertiseImages!: { imageSlug: string }[];
}
