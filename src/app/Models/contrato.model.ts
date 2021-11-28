export interface contrato {
  id: string;
  numero: string;
  forma_pago: string;
  valor: string;
  valor_adicionales: string;
  valor_total: string;
  fecha: string;
  observacion: string;
  estado: string;
  clienteid: string;
  inmuebleid: string;
  idproyecto:string,
  idetapa: string,
  entidad: string;
  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
