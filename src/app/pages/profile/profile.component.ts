import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/user.entity';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private readonly usersService = inject(UsersService);
  private readonly route = inject(ActivatedRoute);

  user?: User; 
  errorMessage: string | null = null;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUserDataAsync(parseInt(userId, 10));
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
}
