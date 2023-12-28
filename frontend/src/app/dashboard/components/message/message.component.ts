import { Component, Input, signal } from '@angular/core';
import { Message } from '../../../interfaces/messages';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() messages = signal<Message[]>([]);
}
