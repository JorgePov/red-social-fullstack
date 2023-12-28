import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'messages',
        title: 'Messages',
        loadComponent: () => import('./dashboard/pages/forum/forum.component'),
      },
      {
        path: 'profile',
        title: 'Profile',
        loadComponent: () =>
          import('./dashboard/pages/profile/profile.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
