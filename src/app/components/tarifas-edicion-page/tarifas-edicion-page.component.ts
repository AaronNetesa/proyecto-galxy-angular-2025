import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewChecked, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ConfiguracionTarifariosService } from '../../services/configuracion-tarifas.service';
import { DataDetalleBodyResponseTarifarioI, DataListadoBodyResponseTarifarioEquipoTrabajoI } from '../../interfaces/configuracio-tarifarios.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tarifas-edicion-page',
  standalone: true,
  providers:[
    { provide: MatPaginatorIntl }
  ],
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatTableModule,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './tarifas-edicion-page.component.html',
  styleUrl: './tarifas-edicion-page.component.scss'
})
export class TarifasEdicionPageComponent implements OnInit, AfterViewChecked {

  private fb = inject(FormBuilder);
  private configuracionTarifariosService = inject(ConfiguracionTarifariosService);
  private _snackBar = inject(MatSnackBar);

  @Input() id!: number;

  public detalleTarifario: DataDetalleBodyResponseTarifarioI = {
    cod_trfro: 0,
    nom_trfro: "",
  };

  public listadoTarifarioEquipoTrabajo: DataListadoBodyResponseTarifarioEquipoTrabajoI[] = [];
  public displayedColumns3: string[] = ['equipo trabajo', 'soles', 'dolares'];
  public dataSource3 = new MatTableDataSource<DataListadoBodyResponseTarifarioEquipoTrabajoI>();
  @ViewChild('paginator3', { static: false }) paginator3!: MatPaginator;

  public myFormEditTarifaInfoGeneral: FormGroup = this.fb.group({});

  ngOnInit(): void {
    if (this.id) {
      this.obtenerDetalleInformacionGeneral(this.id);
      this.obtenerListadoTarifarioPorEquipoTrabajo(this.id);
    } else {
      console.warn('El id no está definido');
    }
  }

  ngAfterViewChecked(): void {
    if (this.paginator3 && this.dataSource3.paginator !== this.paginator3) {
      this.dataSource3.paginator = this.paginator3;
    }
  }

  onSubmitEquipoTrabajo() {
    const requestBody = {
      codTrfro: this.id,
      nomTrfro: this.detalleTarifario.nom_trfro,
      cnrUsrioRgtro: 999,
      paramListTrfroEqpoTrbjo: this.listadoTarifarioEquipoTrabajo.flatMap(item => [
        {
          cod_trfro: this.id,
          cod_eqpos_trbjo: item.cod_eqpos_trbjo,
          cod_mndas: item.cod_mndas_sol,
          val_trfro_hora: item.val_trfro_hora_sol
        },
        {
          cod_trfro: this.id,
          cod_eqpos_trbjo: item.cod_eqpos_trbjo,
          cod_mndas: item.cod_mndas_dol,
          val_trfro_hora: item.val_trfro_hora_dol
        }
      ])
    };

    this.configuracionTarifariosService.postTarifariosPorEquipoTrabajo(requestBody).subscribe(
      (rpta) => {
        this._snackBar.open(rpta.insertado, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    );
  }

  obtenerDetalleInformacionGeneral(cod: number) {
    this.configuracionTarifariosService.getDetalleTarifario(cod).subscribe(
      (rpta) => {
        this.detalleTarifario = rpta;
      }
    );
  }

  obtenerListadoTarifarioPorEquipoTrabajo(cod: number) {
    this.configuracionTarifariosService.getListadoTarifariosPorEquipoTrabajo(cod).subscribe(
      (rpta) => {
        this.listadoTarifarioEquipoTrabajo = rpta;
        this.dataSource3.data = this.listadoTarifarioEquipoTrabajo;
        setTimeout(() => {
          if (this.paginator3) {
            this.dataSource3.paginator = this.paginator3;
          }
        });
      }
    );
  }

}
