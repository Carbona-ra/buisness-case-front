import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../entities/user.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  private readonly usersService = inject(UsersService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isOwner: boolean = false;
  userId!: number;

  ngOnInit(): void {
    this.initializeForm();
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId) {
      this.userId = parseInt(routeId, 10);
      this.checkOwnershipAndFetchUserData(this.userId);
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: [''],
      lastname: [''],
      adresse: this.fb.group({
        city: [''],
        streetName: [''],
        adresseNumber: [null],
        country: [''],
        postalCode: [null]
      })
    });    
  }

  private async checkOwnershipAndFetchUserData(userId: number): Promise<void> {
    const currentUser = this.usersService.userJWT; // Utilise UsersService pour obtenir l'utilisateur connecté.
  
    if (currentUser?.id === userId) {
      this.isOwner = true;
      try {
        const user = await this.usersService.getById(userId);
        this.populateForm(user);
      } catch (error) {
        this.handleError(error);
      }
    } else {
      this.isOwner = false;
      this.errorMessage = 'You are not authorized to edit this profile.';
    }
  }
  

  private populateForm(user: User): void {
    this.form.patchValue({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      adresse: user.adresse || {}
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
  
    try {
      // Get the form data
      const updatedUser = this.form.value;
  
      // Structure the payload to match the expected API format
      const payload = {
        email: updatedUser.email,
        roles: updatedUser.roles || [], // Assuming roles is an array, fallback to empty if undefined
        password: updatedUser.password,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        adresse: {
          city: updatedUser.adresse?.city || '', // Fallback to empty string if not provided
          streetName: updatedUser.adresse?.streetName || '',
          adresseNumber: updatedUser.adresse?.adresseNumber || 0, // Default to 0 if not provided
          country: updatedUser.adresse?.country || '',
          postalCode: updatedUser.adresse?.postalCode || 0, // Default to 0 if not provided
        },
        advertises: updatedUser.advertises?.map(ad => ({
          title: ad.title || '',
          description: ad.description || '',
          price: ad.price || 0,
          adresse: ad.adresse || '',
          presentationPicture: ad.presentationPicture || '',
          gallery: ad.gallery || '',
          totalPlaceNumber: ad.totalPlaceNumber || 0,
          ActualNumberPlace: ad.ActualNumberPlace || 0,
          owner: ad.owner || '',
          reactions: ad.reactions?.map(reaction => ({
            note: reaction.note || 0,
            user: reaction.user || '',
            Advertise: reaction.Advertise || '',
            favorite: reaction.favorite || false,
            advertise: reaction.advertise || ''
          })),
          advertiseImages: ad.advertiseImages?.map(image => ({
            Avertise: image.Avertise || '',
            imageSlug: image.imageSlug || '',
            avertise: image.avertise || ''
          })),
          disponibilitieDates: ad.disponibilitieDates?.map(date => ({
            startedAt: date.startedAt || '',
            endedAt: date.endedAt || '',
            Advertise: date.Advertise || '',
            advertise: date.advertise || ''
          })),
          reservations: ad.reservations?.map(reservation => ({
            startedAt: reservation.startedAt || '',
            endAt: reservation.endAt || '',
            user: reservation.user || '',
            Advertise: reservation.Advertise || '',
            advertise: reservation.advertise || ''
          })),
          services: ad.services?.map(service => ({
            name: service.name || '',
            Advertise: service.Advertise || '',
            advertise: service.advertise || ''
          })),
          actualNumberPlace: ad.actualNumberPlace || 0
        })) || [],
        users: updatedUser.users || [], // Assuming users is an array, fallback to empty if undefined
        Advertise: updatedUser.Advertise || [], // Assuming Advertise is an array, fallback to empty if undefined
        messages: updatedUser.messages || [], // Fallback to empty if not provided
        reservations: updatedUser.reservations?.map(reservation => ({
          startedAt: reservation.startedAt || '',
          endAt: reservation.endAt || '',
          user: reservation.user || '',
          Advertise: reservation.Advertise || '',
          advertise: reservation.advertise || ''
        })) || [],
        advertise: updatedUser.advertise || [] // Assuming advertise is an array, fallback to empty if undefined
      };
      
      console.log(payload);
      
      // Send the formatted data to the service
      await this.usersService.updateUser(this.userId, payload);
      
      // Success message
      this.successMessage = 'Profile updated successfully.';
      this.errorMessage = null;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  

  private handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      this.errorMessage = error.error?.message || 'An error occurred while updating the profile.';
    } else {
      this.errorMessage = 'Unexpected error occurred.';
    }
    console.error(error);
  }

}
