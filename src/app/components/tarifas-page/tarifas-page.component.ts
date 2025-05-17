import { ConfiguracionEquipoTrabajoService } from './../../services/configuracion-equipo-trabajo.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalEliminarComponent } from '../../components/modal-eliminar/modal-eliminar.component';
import { Router, RouterLink } from '@angular/router';
import { DataListadoBodyRequestTarifariosI } from '../../interfaces/configuracio-tarifarios.interface';
import { ConfiguracionTarifariosService } from '../../services/configuracion-tarifas.service';
import { ModalAgregarTarifasComponent } from '../modal-agregar-tarifas/modal-agregar-tarifas.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl }
  ],
  imports: [
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './tarifas-page.component.html',
  styleUrl: './tarifas-page.component.scss'
})
export class TarifasPageComponent implements OnInit{

  public isFetchingData: boolean = false;
  public listTarifario:DataListadoBodyRequestTarifariosI[] = [];
  private configuracionTarifariosService = inject(ConfiguracionTarifariosService)
  private dialog = inject(MatDialog);
  router=inject(Router)
  public displayedColumns: string[] = ['nombre', 'accion'];
  public dataSource = new MatTableDataSource<DataListadoBodyRequestTarifariosI>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.obtenerListadoTarifario();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerListadoTarifario(){
    this.isFetchingData = true;
    this.configuracionTarifariosService.getListadoTarifarios("").subscribe(
      (rpta)=>{
        this.listTarifario = rpta;
        this.dataSource.data = this.listTarifario;
        this.isFetchingData = false;
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  agregarTarifa(){
    const dialogRef = this.dialog.open(ModalAgregarTarifasComponent,{
      disableClose:true,
      // minWidth:900,
      minWidth: '30vw',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'add' && result.data) {
          this.listTarifario.push(result.data);
          this.dataSource.data = [...this.listTarifario];
          setTimeout(() => {
            this.paginator.lastPage();
          }, 100);
        }
      }
    })
  }
  eliminarTarifa(cod:number){
    const dialogRef = this.dialog.open(ModalEliminarComponent,{
      // disableClose:true,
      minWidth: '30vw',
      autoFocus: false,
      data: "¿Está seguro de eliminar esta Tarifa?"
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.configuracionTarifariosService.deleteTarifarios(cod,999).subscribe(
          (rpta)=>{
            this._snackBar.open(rpta.mensaje, 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            // this.obtenerListadoEquipoTrabajo();
            this.listTarifario = this.listTarifario.filter(item => item.cod_trfro !== cod);
            this.dataSource.data = [...this.listTarifario];
          }
        )
      }
    })
  }
  modificar(cod_trfro: number){
    this.router.navigate(['equipo-trabajo/equipo-trabajo/editar-tarifas', cod_trfro]);
  }

}
