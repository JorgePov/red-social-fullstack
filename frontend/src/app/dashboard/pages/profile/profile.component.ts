import { Component } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MessageComponent, PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent {}
