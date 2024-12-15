import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/user.entity';
import { NgFor, NgIf } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, NgIf, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private readonly usersService = inject(UsersService);
  private readonly route = inject(ActivatedRoute);

  user?: User; 
  errorMessage: string | null = null;
  editMode: boolean = false;
  isOwner: boolean = false;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUserDataAsync(parseInt(userId, 10));
      this.checkOwnershipAndFetchUserData(parseInt(userId, 10));

    }
  }

  private async fetchUserDataAsync(id: number): Promise<void> {
    try {
      const userHttp = await this.usersService.getById(id); 
      this.user = User.fromHttp(userHttp);
    } catch (error) {
      this.errorMessage = 'Failed to load user data.';
      console.error(error);
    }
  }

  private async checkOwnershipAndFetchUserData(userId: number): Promise<void> {
    try {
      const currentUser = this.usersService.userJWT;
      if (currentUser?.id === userId) {
        this.isOwner = true;
      }
      const userHttp = await this.usersService.getById(userId); 
      this.user = User.fromHttp(userHttp);
    } catch (error) {
      this.errorMessage = 'Failed to load user data.';
      console.error(error);
    }
  }

}
