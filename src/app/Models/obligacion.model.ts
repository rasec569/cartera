export interface obligacion{
  //persona
   id:string;
   fecha: Date;
   concepto:string;
   valor:string;
   interes:string;
   valor_interes:string;
   total:string;
   fecha_pago:Date;
   idacreedor:string;
  //error vars
   TIPO?:string;
   MENSAJE?:string;
}
