import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  public menuItems = signal<meenu[]>([{path: 'messages', title: 'Messages'}])
}
