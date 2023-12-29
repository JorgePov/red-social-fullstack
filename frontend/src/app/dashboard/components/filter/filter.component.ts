import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { AuthService } from '../../../services/auth.service';
import { Post } from '../../../interfaces/post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  requestService = inject(RequestService);
  authService = inject(AuthService);
  filterTitle: string = '';
  @Output() filterString = new EventEmitter<string>();

  applyFilter() {
    this.filterString.emit(this.filterTitle);
    this.filterTitle = '';
  }
}
