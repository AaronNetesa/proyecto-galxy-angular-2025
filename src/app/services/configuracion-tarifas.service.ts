import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DataDeleteBodyResponseTarifarios, DataDetalleBodyResponseTarifarioI, DataListadoBodyRequestTarifariosI, DataListadoBodyResponseTarifarioCategoriasI, DataListadoBodyResponseTarifarioEquipoTrabajoI, DataListadoBodyResponseTarifarioUsuariosI, DataPostBodyResponseTarifarios, DataPostBodyResponseTarifariosCategoriasI, DataPostBodyResponseTarifariosEquipoTrabajoI, DataPostBodyResponseTarifariosUsuariosI, DeleteBodyRequestTarifarios, DeleteBodyResponseTarifarios, DetalleBodyResponseTarifarioI, ListadoBodyRequestTarifariosI, ListadoBodyResponseTarifarioCategoriasI, ListadoBodyResponseTarifarioEquipoTrabajoI, ListadoBodyResponseTarifarioUsuariosI, PostBodyRequestTarifarios, PostBodyRequestTarifariosCategoriasI, PostBodyRequestTarifariosEquipoTrabajoI, PostBodyRequestTarifariosUsuariosI, PostBodyResponseTarifarios, PostBodyResponseTarifariosCategoriasI, PostBodyResponseTarifariosEquipoTrabajoI, PostBodyResponseTarifariosUsuariosI } from '../interfaces/configuracio-tarifarios.interface';

@Injectable({providedIn: 'root'})

export class ConfiguracionTarifariosService {

  private API_PRIMARY = environment.API_PRIMARY;
  private http = inject(HttpClient)

  getListadoTarifarios(NomTrfro:string):Observable<DataListadoBodyRequestTarifariosI[]>{
    const params = new HttpParams()
      .set('NomTrfro', NomTrfro)
    const urlConParametros = `${this.API_PRIMARY}/api/MantenimientoTarifario/GetLstTarifarios`
    return this.http.get<ListadoBodyRequestTarifariosI>(urlConParametros,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  postAgregarTarifarios(body: PostBodyRequestTarifarios): Observable<DataPostBodyResponseTarifarios>{
    const url = `${this.API_PRIMARY}/api/MantenimientoTarifario/PostSaveTarifario`
    return this.http.post<PostBodyResponseTarifarios>(url,body).pipe(
      map ( rpta=> rpta.data[0] )
    )
  }

  deleteTarifarios(codTrfro:number,cnrUsrioRgtro:number):Observable<DataDeleteBodyResponseTarifarios>{
    const url = `${this.API_PRIMARY}/api/MantenimientoTarifario/DelRemoveTarifario`
    const body:DeleteBodyRequestTarifarios = {
      codTrfro,
      cnrUsrioRgtro
    }
    return this.http.delete<DeleteBodyResponseTarifarios>(url,{body}).pipe(
        map ( rpta => rpta.data[0])
      )
  }

  getDetalleTarifario(CodTrfro:number):Observable<DataDetalleBodyResponseTarifarioI>{
    const params = new HttpParams()
      .set('CodTrfro', CodTrfro)
    const urlConParametros = `${this.API_PRIMARY}/api/MantenimientoTarifario/GetSelTarifario`
    return this.http.get<DetalleBodyResponseTarifarioI>(urlConParametros,{params}).pipe(
      map ( (rpta)=> rpta.data[0] )
    )
  }

  getListadoTarifariosPorEquipoTrabajo(CodTrfro:number):Observable<DataListadoBodyResponseTarifarioEquipoTrabajoI[]>{
    const params = new HttpParams()
      .set('CodTrfro', CodTrfro)
    const urlConParametros = `${this.API_PRIMARY}/api/MantenimientoTarifario/GetSelTarifarioEquipoTrabajo`
    return this.http.get<ListadoBodyResponseTarifarioEquipoTrabajoI>(urlConParametros,{params}).pipe(
      map ( (rpta)=> rpta.data )
    )
  }

  postTarifariosPorEquipoTrabajo(body:PostBodyRequestTarifariosEquipoTrabajoI):Observable<DataPostBodyResponseTarifariosEquipoTrabajoI>{
    const url = `${this.API_PRIMARY}/api/MantenimientoTarifario/PostSaveTarifarioEquipoTrabajo`
    return this.http.post<PostBodyResponseTarifariosEquipoTrabajoI>(url,body).pipe(
      map ( rpta=> rpta.data[0] )
    )
  }

}
