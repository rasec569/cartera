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
  idcliente: string;
  idinmueble: string;
  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
