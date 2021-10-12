export interface usuario {
  //persona
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  correo: string;
  identificacion: string;
  //usuario
  iduser: string;
  nick: string;
  password: string;
  IdRol: string;
  IdArea: string;
  //error vars
  TIPO?: string;
  MENSAJE?: string;
}
