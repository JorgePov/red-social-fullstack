import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface meenu {
  path: string;
  title: string;
  svg?: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  authservice = inject(AuthService);
  public userName = signal<string>(inject(AuthService).getUserData().fullName);
  isCollapsed = signal<boolean>(false);
  public menuItems = signal<meenu[]>([
    { path: 'messages', title: 'Messages', svg: 'message' },
    { path: 'profile', title: 'Profile', svg: 'profile' },
  ]);

  toggleCollapsed() {
    this.isCollapsed.update((value) => !value);
  }

  logout() {
    this.authservice.logout();
  }
}
