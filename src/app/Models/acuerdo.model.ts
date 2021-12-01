export interface acuerdo {
  id: string;
  aporte_cliente: string;
  valor_credito: string;
  valor_total: string;
  forma_pago: string;
  entidad: string;
  contratoid: string;
  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
