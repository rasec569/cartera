export interface cuota {
  id: string;
  numero: string;
  valor: string;
  fecha: string;
  estado: string;
  pagado: string;
  responsable: string;
  acuerdoid: string;
  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
