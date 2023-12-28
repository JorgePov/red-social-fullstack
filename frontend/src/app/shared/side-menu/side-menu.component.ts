import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface meenu{
  path:string,
  title:string,
  }

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  public userName = signal<string>(inject(AuthService).getUserData().fullName)
  public menuItems = signal<meenu[]>([{path: 'messages', title: 'Messages'}])
}
