import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataDeleteBodyResponseEquipoTrabajoI, DataDetalleBodyRequestEquipoTrabajoI, DataListadoBodyRequestEquipoTrabajoI, DataPostBodyResponseEquipoTrabajoI, DataPutBodyResponseEquipoTrabajoI, DeleteBodyRequestEquipoTrabajoI, DeleteBodyResponseEquipoTrabajoI, DetalleBodyRequestEquipoTrabajoI, ListadoBodyRequestEquipoTrabajoI, PostBodyRequestEquipoTrabajoI, PostBodyResponseEquipoTrabajoI, PutBodyRequestEquipoTrabajoI, PutBodyResponseEquipoTrabajoI } from '../interfaces/configuracion-equipo-trabajo.interface';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class ConfiguracionEquipoTrabajoService {

  private API_PRIMARY = environment.API_PRIMARY;
  private http = inject(HttpClient)

  getListadoEquipoTrabajo(NomEqposTrbjo:string):Observable<DataListadoBodyRequestEquipoTrabajoI[]>{
    const params = new HttpParams()
      .set('NomEqposTrbjo', NomEqposTrbjo)
    const urlConParametros = `${this.API_PRIMARY}/api/MantenimientoEquipoTrabajo/GetLstEquiposTrabajo`
    return this.http.get<ListadoBodyRequestEquipoTrabajoI>(urlConParametros,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  postAgregarEquipoTrabajo(body: PostBodyRequestEquipoTrabajoI): Observable<DataPostBodyResponseEquipoTrabajoI>{
    const url = `${this.API_PRIMARY}/api/MantenimientoEquipoTrabajo/PostSaveEquipoTrabajo`
    return this.http.post<PostBodyResponseEquipoTrabajoI>(url,body).pipe(
      map ( rpta=> rpta.data[0] )
    )
  }

  getDetalleEquipoTrabajo(CodEqposTrbjo:number):Observable<DataDetalleBodyRequestEquipoTrabajoI>{
    const params = new HttpParams()
      .set('CodEqposTrbjo', CodEqposTrbjo)
    const urlConParametros = `${this.API_PRIMARY}/api/MantenimientoEquipoTrabajo/GetSelEquipoTrabajo`
    return this.http.get<DetalleBodyRequestEquipoTrabajoI>(urlConParametros,{params}).pipe(
      map ( (rpta)=> rpta.data[0] )
    )
  }

  updateEquipoTrabajo(codEqposTrbjo:number,nomEqposTrbjo:string,cnrUsrioRgtro:number,gls_eqpos_trbjo:string):Observable<DataPutBodyResponseEquipoTrabajoI>{
    const body:PutBodyRequestEquipoTrabajoI = {
      codEqposTrbjo,
      nomEqposTrbjo,
      cnrUsrioRgtro,
      gls_eqpos_trbjo
    };
    const url = `${this.API_PRIMARY}/api/MantenimientoEquipoTrabajo/PutUpdateEquipoTrabajo`
    return this.http.put<PutBodyResponseEquipoTrabajoI>(url, body).pipe(
      map ( rpta=> rpta.data[0] )
    )
  }

  deleteEquipoTrabajo(codEqposTrbjo:number,cnrUsrioRgtro:number):Observable<DataDeleteBodyResponseEquipoTrabajoI>{
    const url = `${this.API_PRIMARY}/api/MantenimientoEquipoTrabajo/DelRemoveEquipoTrabajo`
    const body:DeleteBodyRequestEquipoTrabajoI = {
      codEqposTrbjo,
      cnrUsrioRgtro
    }
    return this.http.delete<DeleteBodyResponseEquipoTrabajoI>(url,{body}).pipe(
      map ( rpta => rpta.data[0])
    )
  }

}
