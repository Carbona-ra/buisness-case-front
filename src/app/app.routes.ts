import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';
import { authGuard } from './guards/auth/auth.guard';
import { InstantTchatComponent } from './pages/instant-tchat/instant-tchat.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { AdvertiseComponent } from './pages/advertise/advertise.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'liste-utilisateurs', component: UsersListComponent},
    {path: 'résultats-de-recherche', component: SearchResultsComponent},
    {path: 'annonce/:id', component: AdvertiseComponent},
    {path: 'connexion', canActivate: [noAuthGuard], component: LoginComponent},
    {path: 'conversation', canActivate: [authGuard], component: InstantTchatComponent},
    {path: 'profile/:id', canActivate: [authGuard], component: ProfileComponent},
    {path: 'page-introuvable', component: NotFoundComponent},
    {path: '**', redirectTo: 'page-introuvable'}
];
