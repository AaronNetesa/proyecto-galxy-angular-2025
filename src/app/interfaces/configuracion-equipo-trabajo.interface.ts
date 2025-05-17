// Listado de Equipo de Trabajo
export interface ListadoBodyRequestEquipoTrabajoI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoBodyRequestEquipoTrabajoI[];
  error:           string;
}
export interface DataListadoBodyRequestEquipoTrabajoI {
  cod_eqpos_trbjo: number;
  nom_eqpos_trbjo: string;
  gls_eqpos_trbjo: string;
}


// Post Equipo de Trabajo
export interface PostBodyRequestEquipoTrabajoI {
  nomEqposTrbjo:  string;
  cnrUsrioRgtro:  number;
  gls_eqpos_trbjo:  string;
}
export interface PostBodyResponseEquipoTrabajoI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPostBodyResponseEquipoTrabajoI[];
  error:           string;
}
export interface DataPostBodyResponseEquipoTrabajoI {
  insertado: string;
  codigo:    number;
}

// Detalle Equipo de Trabajo
export interface DetalleBodyRequestEquipoTrabajoI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetalleBodyRequestEquipoTrabajoI[];
  error:           string;
}
export interface DataDetalleBodyRequestEquipoTrabajoI {
  cod_eqpos_trbjo: number;
  nom_eqpos_trbjo: string;
  gls_eqpos_trbjo: string;
}

// Update Equipo de Trabajo
export interface PutBodyRequestEquipoTrabajoI {
  codEqposTrbjo:  number;
  nomEqposTrbjo:  string;
  cnrUsrioRgtro:  number;
  gls_eqpos_trbjo:  string;
}
export interface PutBodyResponseEquipoTrabajoI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPutBodyResponseEquipoTrabajoI[];
  error:           string;
}
export interface DataPutBodyResponseEquipoTrabajoI {
  editado: string;
  codigo:  number;
}

// Delete Equipo de Trabajo
export interface DeleteBodyRequestEquipoTrabajoI{
  codEqposTrbjo:  number;
  cnrUsrioRgtro: number
}
export interface DeleteBodyResponseEquipoTrabajoI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDeleteBodyResponseEquipoTrabajoI[];
  error:           string;
}
export interface DataDeleteBodyResponseEquipoTrabajoI {
  mensaje: string;
  codigo:  number;
}
