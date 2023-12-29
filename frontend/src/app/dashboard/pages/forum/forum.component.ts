import { Component, OnInit, inject, signal } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { PostComponent } from '../../components/post/post.component';
import { RequestService } from '../../../services/request.service';
import { Message } from '../../../interfaces/messages';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [MessageComponent, PostComponent,FilterComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export default class ForumComponent implements OnInit {
  requestService = inject(RequestService);
  messages = signal<Message[]>([]);
  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {
    this.requestService.requestGeneric<Message[]>('GET', 'posts', {}).subscribe(
      {
        next: (response) => {
          this.messages.set(response.map((message) => ({ ...message, edit: false })))
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => { }
      }
    )
  }

}
