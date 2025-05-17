export interface ListadoBodyRequestTarifariosI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoBodyRequestTarifariosI[];
  error:           string;
}
export interface DataListadoBodyRequestTarifariosI {
  cod_trfro: number;
  nom_trfro: string;
}

export interface PostBodyRequestTarifarios {
  nomTrfro:  string;
  cnrUsrioRgtro:  number;
}
export interface PostBodyResponseTarifarios {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPostBodyResponseTarifarios[];
  error:           string;
}
export interface DataPostBodyResponseTarifarios {
  insertado: string;
  codigo:    number;
}

export interface DeleteBodyRequestTarifarios{
  codTrfro:  number;
  cnrUsrioRgtro: number
}
export interface DeleteBodyResponseTarifarios {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDeleteBodyResponseTarifarios[];
  error:           string;
}
export interface DataDeleteBodyResponseTarifarios {
  mensaje: string;
  codigo:  number;
}

export interface DetalleBodyResponseTarifarioI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetalleBodyResponseTarifarioI[];
  error:           string;
}
export interface DataDetalleBodyResponseTarifarioI {
  cod_trfro: number;
  nom_trfro: string;
}

export interface ListadoBodyResponseTarifarioCategoriasI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoBodyResponseTarifarioCategoriasI[];
  error:           string;
}
export interface DataListadoBodyResponseTarifarioCategoriasI {
  cod_trfro:          number;
  nom_trfro:          string;
  cod_ctgra_rol:      number;
  nom_ctgra_rol:      string;
  cod_mndas_sol:      number;
  nom_mndas_sol:      string;
  val_trfro_hora_sol: number;
  cod_mndas_dol:      number;
  nom_mndas_dol:      string;
  val_trfro_hora_dol: number;
}

export interface PostBodyRequestTarifariosCategoriasI {
  codTrfro:            number;
  nomTrfro:            string;
  cnrUsrioRgtro:       number;
  paramListTrfroCtgra: ParamListTrfroCtgra[];
}
export interface ParamListTrfroCtgra {
  cod_trfro:      number;
  cod_ctgra_rol:  number;
  cod_mndas:      number;
  val_trfro_hora: number;
}

export interface PostBodyResponseTarifariosCategoriasI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPostBodyResponseTarifariosCategoriasI[];
  error:           string;
}
export interface DataPostBodyResponseTarifariosCategoriasI {
  insertado: string;
  codigo:    number;
}

export interface ListadoBodyResponseTarifarioUsuariosI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoBodyResponseTarifarioUsuariosI[];
  error:           string;
}
export interface DataListadoBodyResponseTarifarioUsuariosI {
  cod_trfro:          number;
  nom_trfro:          string;
  cod_usrio:          number;
  nom_apm_usrio:      string;
  cod_mndas_sol:      number;
  nom_mndas_sol:      string;
  val_trfro_hora_sol: number;
  cod_mndas_dol:      number;
  nom_mndas_dol:      string;
  val_trfro_hora_dol: number;
}

export interface PostBodyRequestTarifariosUsuariosI {
  codTrfro:            number;
  nomTrfro:            string;
  cnrUsrioRgtro:       number;
  paramListTrfroUsrio: ParamListTrfroUsrio[];
}
export interface ParamListTrfroUsrio {
  cod_trfro:      number;
  cod_usrio:      number;
  cod_mndas:      number;
  val_trfro_hora: number;
}
export interface PostBodyResponseTarifariosUsuariosI {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPostBodyResponseTarifariosUsuariosI[];
  error:           string;
}
export interface DataPostBodyResponseTarifariosUsuariosI {
  insertado: string;
  codigo:    number;
}

export interface ListadoBodyResponseTarifarioEquipoTrabajoI {
  recordsTotal:     number;
  recordsFiltered:  number;
  data:             DataListadoBodyResponseTarifarioEquipoTrabajoI[];
  error:            string;
}

export interface DataListadoBodyResponseTarifarioEquipoTrabajoI {
  cod_trfro:          number;
  nom_trfro:          string;
  cod_eqpos_trbjo:    number;
  nom_eqpos_trbjo:    string;
  cod_mndas_sol:      number;
  nom_mndas_sol:      string;
  val_trfro_hora_sol: number;
  cod_mndas_dol:      number;
  nom_mndas_dol:      string;
  val_trfro_hora_dol: number;
}

export interface PostBodyRequestTarifariosEquipoTrabajoI {
  codTrfro:                 number;
  nomTrfro:                 string;
  cnrUsrioRgtro:            number;
  paramListTrfroEqpoTrbjo:  ParamListTrfroEqpoTrbjo[];
}
export interface ParamListTrfroEqpoTrbjo {
  cod_trfro:        number;
  cod_eqpos_trbjo:  number;
  cod_mndas:        number;
  val_trfro_hora:   number;
}
export interface PostBodyResponseTarifariosEquipoTrabajoI {
  recordsTotal:     number;
  recordsFiltered:  number;
  data:             DataPostBodyResponseTarifariosEquipoTrabajoI[];
  error:            string;
}
export interface DataPostBodyResponseTarifariosEquipoTrabajoI {
  insertado:  string;
  codigo:     number;
}
