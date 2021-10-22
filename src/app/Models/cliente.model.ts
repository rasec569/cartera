export interface cliente {
  id: string;
  identificacion: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  correo: string;
  idpersona: string;

  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
