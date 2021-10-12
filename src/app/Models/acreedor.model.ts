export interface acreedor{
  //persona
   id?:string;
   nombres: string;
   apellidos:string;
   telefono:string;
   direccion?:string;
   correo:string;
   identificacion:string;
  //usuario
   idacreedor?:string;
   descripcion:string;

  //error vars
   TIPO?:string;
   MENSAJE?:string;
}
