export interface proyecto {
  id: string;
  nombre: string;
  ubicacion: string;
  estado?: string;
  etapas?: string;
  numetapas: number;
  estado_etapa?: string;
  manzanas?: string;
  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
