import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-eliminar',
  standalone: true,
  imports: [
    MatDialogModule, /*Ventana Alert*/
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule /*Mensaje Alert*/,
    CommonModule
  ],
  templateUrl: './modal-eliminar.component.html',
  styleUrl: './modal-eliminar.component.scss'
})
export class ModalEliminarComponent implements OnInit {

  public titulo: string = "";
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ModalEliminarComponent>);

  ngOnInit(): void {
    this.titulo = this.data;
  }

  confirmacion(valor: boolean) {
    this.dialogRef.close(valor);
  }
}
