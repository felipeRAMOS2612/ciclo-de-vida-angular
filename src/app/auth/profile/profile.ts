// profile.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from '../../shared/services/storage.service';
import { User } from '../../shared/types/user.type';
import { ROLES } from '../../shared/enums/role.enum';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  private fb = inject(FormBuilder);
  private storage = inject(StorageService);
  private snackbar = inject(MatSnackBar);
  isTherapist = false;
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    therapistId: ['']
  });

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.isTherapist = user.roleId === ROLES.TERAPIST;
      this.form.patchValue({
        name: user.name,
        email: user.email,
        password: user.password,
        therapistId: user.therapistId != null ? String(user.therapistId) : ''
      });
    }
  }

  onSave() {
    if (this.form.invalid) return;

    const currentUser = this.storage.getCurrentUser();
    if (!currentUser) {
      this.snackbar.open('Error: Usuario no encontrado', 'Cerrar', { duration: 3000 });
      return;
    }

    const formValue = this.form.value;

    const therapistId = this.form.value.therapistId;
    
    if (therapistId && currentUser.roleId !== ROLES.TERAPIST) {
      console.log("està actualizando terapeuta");
      this.addToTherapist(+therapistId);
    
    }

    if (!formValue.name || !formValue.email || !formValue.password) {
      this.snackbar.open('Error: Datos incompletos', 'Cerrar', { duration: 3000 });
      return;
    }
    const updatedUser: User = {
      ...currentUser,
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      therapistId: therapistId ? String(therapistId) : undefined,
    };

    const users = this.storage.getUsers().map(u =>
      u.id === currentUser?.id ? updatedUser : u
    );
    this.storage.setUsers(users);
    this.storage.setCurrentUser(updatedUser);

    this.snackbar.open('Perfil actualizado con éxito', 'Cerrar', { duration: 3000 });
  }

  addToTherapist(userId: number) {
    const therapist = this.storage.getCurrentUser();

    if (!therapist || therapist.roleId === ROLES.TERAPIST) {
      this.snackbar.open('Acción no permitida: debes ser terapeuta', 'Cerrar', { duration: 3000 });
      return;
    }

    const users = this.storage.getUsers();
    const userToUpdate = users.find(u => u.id === userId);

    if (!userToUpdate) {
      this.snackbar.open('Usuario no encontrado', 'Cerrar', { duration: 3000 });
      return;
    }

    userToUpdate.therapistId = String(therapist.id);

    this.storage.setUsers(users);
    this.snackbar.open(`Usuario asignado al terapeuta ${therapist.name}`, 'Cerrar', { duration: 3000 });
  }
}
