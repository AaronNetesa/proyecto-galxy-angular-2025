import { MatInputModule } from '@angular/material/input';
import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfiguracionEquipoTrabajoService } from '../../services/configuracion-equipo-trabajo.service';
import { DataListadoBodyRequestEquipoTrabajoI } from '../../interfaces/configuracion-equipo-trabajo.interface';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { ModalAgregarEquipoTrabajoComponent } from '../modal-agregar-equipo-trabajo/modal-agregar-equipo-trabajo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-equipo-trabajo',
  standalone: true,
  templateUrl: './equipo-trabajo-page.component.html',
  styleUrls: ['./equipo-trabajo-page.component.scss'],
  imports: [
    CommonModule, /*If o For*/
    RouterModule, /*Rutas de los modales*/
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule /*Mensaje Alert*/,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EquipoTrabajoPageComponent implements OnInit, AfterViewInit {
  public isFetchingData = false;
  public listEquipoTrabajos: DataListadoBodyRequestEquipoTrabajoI[] = [];
  public displayedColumns: string[] = ['nombre', 'descripcion', 'accion'];
  public dataSource = new MatTableDataSource<DataListadoBodyRequestEquipoTrabajoI>();

  public mensajeSalida: string = '';
  public mensajeTipo: 'success' | 'warning' | 'error' = 'success';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private configuracionEquipoTrabajoService = inject(ConfiguracionEquipoTrabajoService);
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.obtenerListadoEquipoTrabajo();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerListadoEquipoTrabajo(){
    this.isFetchingData = true;
    this.configuracionEquipoTrabajoService.getListadoEquipoTrabajo("").subscribe(
      (rpta)=>{
        this.listEquipoTrabajos = rpta;
        this.dataSource.data = this.listEquipoTrabajos;
        this.isFetchingData = false;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  agregarEditarEquipoTrabajo(cod: number) {
    const dialogRef = this.dialog.open(ModalAgregarEquipoTrabajoComponent, {
      disableClose: true,
      minWidth: '30vw',
      autoFocus: false,
      data: { cod }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.mensajeSalida = '';
      this.mensajeTipo   = 'success';  // <-- marca siempre success por defecto

      if (result.action === 'add' && result.data) {
        this.listEquipoTrabajos.push(result.data);
        this.dataSource.data = [...this.listEquipoTrabajos];
        this.mensajeSalida = '✅ Equipo agregado correctamente.';
        setTimeout(() => this.paginator.lastPage(), 100);
      }
      else if (result.action === 'update' && result.data) {
        this.listEquipoTrabajos = this.listEquipoTrabajos.map(item =>
          item.cod_eqpos_trbjo === result.data.cod_eqpos_trbjo ? result.data : item
        );
        this.dataSource.data = [...this.listEquipoTrabajos];
        this.mensajeSalida = '✅ Equipo actualizado correctamente.';
      }
      else if (result.action === 'refresh') {
        // si quisieras aquí un warning en lugar de success:
        this.mensajeTipo   = 'error';
        this.mensajeSalida = '⚠️ El Equipo de Trabajo ya existe.';
      }

      setTimeout(() => this.mensajeSalida = '', 5000);
    });
  }

  eliminarEquipoTrabajo(cod: number) {
      const dialogRef = this.dialog.open(ModalEliminarComponent, {
        disableClose: true,
        minWidth: '30vw',
        autoFocus: false,
        data: "¿Está seguro de eliminar este Equipo de Trabajo?"
      });

      dialogRef.afterClosed().subscribe(confirm => {
        if (!confirm) return;

        this.configuracionEquipoTrabajoService
          .deleteEquipoTrabajo(cod, 999)
          .subscribe(rpta => {
            this.listEquipoTrabajos = this.listEquipoTrabajos
              .filter(item => item.cod_eqpos_trbjo !== cod);
            this.dataSource.data = [...this.listEquipoTrabajos];

            this.mensajeSalida = rpta.mensaje;
            this.mensajeTipo   = 'error';

            this._snackBar.open(rpta.mensaje, 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });

            setTimeout(() => this.mensajeSalida = '', 5000);
          });
      });
  }


}
