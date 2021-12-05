export interface cartera {
  id_cliente?: string;
  identificacion: string;
  cliente: string;
  valor_contrato: string;
  aportes_contrato: string;
  valor_adicionales:string;
  clienaportes_adicionalesteid: string;
  total: string;
  estado: string;

  /* id?: string;
  estado: string;
  recaudado: string;
  saldo: string;
  total: string;
  clienteid: string; */

  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
