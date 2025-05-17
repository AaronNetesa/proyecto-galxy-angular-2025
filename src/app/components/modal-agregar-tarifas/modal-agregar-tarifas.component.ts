import { Component, inject, OnInit } from '@angular/core';
import { ConfiguracionTarifariosService } from '../../services/configuracion-tarifas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostBodyRequestTarifarios } from '../../interfaces/configuracio-tarifarios.interface';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modal-agregar-tarifas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './modal-agregar-tarifas.component.html',
  styleUrl: './modal-agregar-tarifas.component.scss'
})
export class ModalAgregarTarifasComponent implements OnInit{

  private configuracionTarifariosService = inject(ConfiguracionTarifariosService);
  private dialogRef = inject(MatDialogRef<ModalAgregarTarifasComponent>);
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  public myFormNewTarifario:FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.maxLength(60)]],
    usuario: [999,[Validators.required]],
  })

  ngOnInit(): void {

  }

  onSubmit(){

    if (this.myFormNewTarifario.invalid) {
      this.myFormNewTarifario.markAllAsTouched();
      this._snackBar.open('Complete los campos ', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
      return;
    }
    const {nombre,usuario} = this.myFormNewTarifario.value;
    const bodyEnviar:PostBodyRequestTarifarios ={
      nomTrfro:       nombre,
      cnrUsrioRgtro:  usuario
    }
    this.configuracionTarifariosService.postAgregarTarifarios(bodyEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open(rpta.insertado, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        this.dialogRef.close({
          action: 'add',
          data: { cod_trfro: rpta.codigo, nom_trfro: nombre }
        });
      }
    )
  }


}
