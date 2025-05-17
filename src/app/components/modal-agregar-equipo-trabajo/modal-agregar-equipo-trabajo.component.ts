import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfiguracionEquipoTrabajoService } from '../../services/configuracion-equipo-trabajo.service';
import { PostBodyRequestEquipoTrabajoI } from '../../interfaces/configuracion-equipo-trabajo.interface';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modal-agregar-equipo-trabajo',
  standalone: true,
  templateUrl: './modal-agregar-equipo-trabajo.component.html',
  styleUrl: './modal-agregar-equipo-trabajo.component.scss',
  imports: [
    CommonModule, /*If o For*/
    ReactiveFormsModule, /*Estructura de un Formulario*/
    MatDialogModule, /*Ventana Alert*/
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule, /*Mensaje Alert*/
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ModalAgregarEquipoTrabajoComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA);
  private configuracionEquipoTrabajoService = inject(ConfiguracionEquipoTrabajoService);
  private dialogRef = inject(MatDialogRef<ModalAgregarEquipoTrabajoComponent>);
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  public codEquipo: number = 0;

  public myFormNewEquipoTrabajo: FormGroup = this.fb.group({
    codigo: [0],
    nombre: ['', [Validators.required, Validators.maxLength(60)]],
    usuario: [999, [Validators.required]],
    descripcion: ["",[Validators.required, Validators.maxLength(500)]],
  });

  ngOnInit(): void {
    this.codEquipo = this.data.cod;
    this.obtenerDetalleEquipoTrabajo(this.codEquipo);
  }

  obtenerDetalleEquipoTrabajo(cod:number){
    if(cod !== 0){
      this.configuracionEquipoTrabajoService.getDetalleEquipoTrabajo(cod).subscribe(
        (rpta)=>{
          this.myFormNewEquipoTrabajo.patchValue({
            codigo: rpta.cod_eqpos_trbjo,
            nombre: rpta.nom_eqpos_trbjo,
            descripcion: rpta.gls_eqpos_trbjo
          })
        }
      )
    }
  }

  onSubmit(){
    if (this.myFormNewEquipoTrabajo.invalid) {
      this.myFormNewEquipoTrabajo.markAllAsTouched();
      this._snackBar.open('Complete los campos ', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
      return;
    }
    const { codigo,nombre, usuario, descripcion} = this.myFormNewEquipoTrabajo.value;
    const myFormularioEnviar:PostBodyRequestEquipoTrabajoI = {
      nomEqposTrbjo:    nombre.trim(),
      cnrUsrioRgtro:    usuario,
      gls_eqpos_trbjo:  descripcion.trim()
    }
    if(this.codEquipo === 0){
      this.configuracionEquipoTrabajoService.postAgregarEquipoTrabajo(myFormularioEnviar).subscribe(
        (rpta)=>{
          this._snackBar.open(rpta.insertado, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });

          if (rpta.insertado === 'El Equipo de Trabajo ya existe.') {
            this.dialogRef.close({ action: 'refresh' });
            return;
          }

          this.dialogRef.close({
            action: 'add',
            data: { cod_eqpos_trbjo: rpta.codigo, nom_eqpos_trbjo: nombre, gls_eqpos_trbjo:descripcion }
          });
        }
      )
    }else{
      this.configuracionEquipoTrabajoService.updateEquipoTrabajo(codigo,nombre,usuario,descripcion).subscribe(
        (rpta)=>{
          this._snackBar.open(rpta.editado, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });

          if (rpta.editado === 'El Equipo de Trabajo ya existe.') {
            this.dialogRef.close({ action: 'refresh' });
            return;
          }

          this.dialogRef.close({
            action: 'update',
            data: { cod_eqpos_trbjo: codigo, nom_eqpos_trbjo: nombre, gls_eqpos_trbjo:descripcion }
          });
        }
      )
    }

  }

}
