import { Component } from '@angular/core';
import { CardProfileComponent } from '../../components/card-profile/card-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent {}
