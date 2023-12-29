import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userResponse, userUpdate } from '../../../interfaces/user';
import { RequestService } from '../../../services/request.service';
import { AuthService } from '../../../services/auth.service';

type Profile = 'profile' | 'changePassword' | 'editProfile' | 'deleteProfile';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './card-profile.component.html',
})
export class CardProfileComponent {
  fb = inject(FormBuilder);
  requestService = inject(RequestService);
  changePasswordForm: FormGroup;
  editProfileForm: FormGroup;
  action = signal<Profile>('profile');

  authService = inject(AuthService);

  availableOptions = {
    profile: 'profile',
    changePassword: 'changePassword',
    editProfile: 'editProfile',
    deleteProfile: 'deleteProfile',
  };

  constructor() {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
      oldPasswordConfirmed: ['', Validators.required],
    });
    this.editProfileForm = this.fb.group({
      fullName: [this.authService.getUserData().fullName, Validators.required],
      age: [this.authService.getUserData().age, Validators.required],
    });
  }

  changeOption(
    option: 'profile' | 'changePassword' | 'editProfile' | 'deleteProfile'
  ) {
    this.action.update(() => {
      return option;
    });
  }

  saveEditProfile() {
    this.requestService
      .requestGeneric<userUpdate>(
        'PATCH',
        `users/${this.authService.getUserData().id}`,
        this.editProfileForm.value
      )
      .subscribe({
        next: (response) => {
          const user = {
            ...this.authService.getUserData(),
            fullName: this.editProfileForm.value.fullName,
            age: this.editProfileForm.value.age,
          };
          this.authService.setUserData(user);
          this.changeOption('profile');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
  }

  saveChangePassword() {
    const { newPassword, oldPassword } = this.changePasswordForm.value;
    this.authService.changedPassword({ newPassword, oldPassword }).subscribe({
      next: (response) => {
        console.log(response);
        this.changeOption('profile');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
