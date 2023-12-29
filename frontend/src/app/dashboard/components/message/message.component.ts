import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces/messages';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';



@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ConfirmationModalComponent, NgxSmartModalModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  public userInfoEmail = inject(AuthService).getUserData().email
  @Output() newMessageEvent = new EventEmitter();
  @Input() messages = signal<Message[]>([])
  fb = inject(FormBuilder)
  requestService = inject(RequestService)
  modalService = inject(NgxSmartModalService)
  editMessageForm: FormGroup

  constructor() {
    this.editMessageForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  editExpecificMessage(message: Message) {
    this.messages.update(() => this.messages().map((messageMap) => {
      const isEditing = messageMap.id === message.id;
      if (isEditing) {
        this.editMessageForm.patchValue(message);
      }
      return { ...messageMap, edit: isEditing }
    }));
  }

  cancelEditMessage() {
    this.messages.update(() => this.messages().map((messageMap) => { return { ...messageMap, edit: false } }))
  }

  saveEditMessage(message: Message) {
    this.requestService.requestGeneric<Message>('PATCH', `posts/${message.id}`, this.editMessageForm.value).subscribe(
      {
        next: (_) => {
          this.newMessageEvent.emit()
          this.cancelEditMessage()
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => { }
      }
    )
  }

  deleteMessage(message: Message) {
    this.requestService.requestGeneric<Message>('DELETE', `posts/${message.id}`,{}).subscribe(
      {
        next: (_) => {
          this.newMessageEvent.emit()
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => { }
      }
    )
  }
}
