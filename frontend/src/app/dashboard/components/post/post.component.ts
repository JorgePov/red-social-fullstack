import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../interfaces/post';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Output() newMessageEvent = new EventEmitter();
  fb = inject(FormBuilder)
  requestService = inject(RequestService)
  postForm: FormGroup
  
  constructor() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  resetPostForm() { this.postForm.reset() }

  createPost() {
    if (this.postForm.valid) {
      const { title, content } = this.postForm.value

      const body: Post = {
        title,
        content
      }
      this.requestService.requestGeneric<Post>('POST', 'posts', body).subscribe({
        next: (res) => {
          this.resetPostForm()
          this.newMessageEvent.emit()
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => { }
      })

    }
  }
}
