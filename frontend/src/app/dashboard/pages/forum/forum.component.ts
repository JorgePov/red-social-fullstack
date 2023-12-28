import { Component } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [MessageComponent,PostComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export default class ForumComponent {

}
