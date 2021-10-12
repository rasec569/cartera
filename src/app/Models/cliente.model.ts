export interface cliente {
  id?: string;
  identification?: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  correo: string;

  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
