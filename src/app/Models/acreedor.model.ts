export interface acreedor{
  //obligacion
   id:string;
   fecha: string;
   valor:string;
   estado:string;
   concepto:string;
   fecha_pago:string;
  //acreedor
   idacreedor:string;

  //error vars
   TIPO?:string;
   MENSAJE?:string;
}
