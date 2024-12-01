import { Component, inject } from '@angular/core';
import { Advertise } from '../../entities/advertise.entity';
import { ActivatedRoute } from '@angular/router';
import { AdvertiseService } from '../../services/advertise/advertise.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-advertise',
  standalone: true,
  imports: [NgFor, FormsModule ],
  templateUrl: './advertise.component.html',
  styleUrl: './advertise.component.scss'
})
export class AdvertiseComponent {

  private readonly route = inject(ActivatedRoute)
  private readonly advertiseService = inject(AdvertiseService)

  advertiseImagesPlacholder = [
    'https://static.cotemaison.fr/medias_11572/w_640,c_fill,g_north/salon-avec-murs-peints-en-bleu-et-claustra-ajoure_5924888.jpg',
    'https://cache.marieclaire.fr/data/photo/w1000_ci/66/decoration-interieur-idees.jpg',
    'https://img.freepik.com/photos-gratuite/salon-luxe-loft-rendu-3d-etagere-pres-du-comptoir-table-manger_105762-2105.jpg'
  ]

  advertise: Advertise | null = null;
  errorMessage: string | null = null;
  
  advertises: Advertise[] = []

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.errorMessage = 'ID invalide.';
      return;
    }
    this.advertiseService.getAdvertiseById(id).subscribe({
      next: (advertise) => {
        this.advertise = advertise;
        console.log('Annonce récupérée:', advertise);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'annonce :', err);
        this.errorMessage = 'Impossible de charger l\'annonce. Veuillez réessayer plus tard.';
      }
    });
    console.log(this.advertises)
  }

  advertiseDetails =
    "Cette maison offre un confort optimal avec ses espaces lumineux et modernes. Idéalement située dans un quartier calme, elle est parfaite pour les familles ou les jeunes professionnels.";
  selectedDate: string = '';

  bookAdvertise() {
    if (this.selectedDate) {
      alert(
        `Vous avez réservé cette annonce pour le ${this.selectedDate}. Merci pour votre réservation !`
      );
    } else {
      alert('Veuillez sélectionner une date avant de réserver.');
    }
  }

}
