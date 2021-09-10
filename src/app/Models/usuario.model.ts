export class usuario{
  //persona
  public nombres: string;
  public apellidos:string;
  public telefono:string;
  public direccion:string;
  public correo:string;
  public identification?:string;
  //usuario
  public iduser?:string;
  public usuario?:string;
  public password?: string;
  public IdRol:string;
  public IdArea:string;

  //error vars
  public TIPO?:string;
  public MENSAJE?:string;
}
