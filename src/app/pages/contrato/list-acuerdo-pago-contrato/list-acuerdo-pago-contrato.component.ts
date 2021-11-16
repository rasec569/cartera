import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { AcuerdoService } from 'src/app/services/acuerdo.service';
import { acuerdo } from 'src/app/Models/acuerdo.model';
import { ListCuotasComponent } from '../list-cuotas/list-cuotas.component';

@Component({
  selector: 'app-list-acuerdo-pago-contrato',
  templateUrl: './list-acuerdo-pago-contrato.component.html',
  styleUrls: ['./list-acuerdo-pago-contrato.component.css']
})
export class ListAcuerdoPagoContratoComponent implements OnInit {
  @Input() contratoid!:string;
  dataSource = new MatTableDataSource<acuerdo>();
  public idacuerdo="";
  public valorCredito="";

  public displayedColumns: string[] = [
    "aporte_cliente",
    "valor_credito",
    "valor_total",
    "entidad",
  ];
@ViewChild(ListCuotasComponent) hijo!:ListCuotasComponent;

  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private AcuerdoS: AcuerdoService,
    public dialog: MatDialog) { }

    ngOnInit(): void {
      this.QueryAcuerdos(this.contratoid);
    }
    receiveMessage($event: any) {
      console.log($event);
      this.QueryAcuerdos(this.contratoid);
    }
    SaveCuotaCredito(){
      console.log('llamo');
      this.hijo.SaveCuotaCredito(this.valorCredito);
      this.hijo.QueryCuotasCredito(this.idacuerdo);
    }

    QueryAcuerdos(contratoid:any) {
      try {
        this.AcuerdoS.getAcuerdosContrato(contratoid).subscribe(
          (res: acuerdo[]) => {
            console.log(res);
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSource.data = res;
              this.changeDetectorRefs.detectChanges();
              this.idacuerdo=res[0].id;
              this.valorCredito=res[0].valor_credito;
              this.hijo.loadCuotas(this.idacuerdo,this.valorCredito);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"+err
            );
          }
        );
      } catch (error) {
        this.notificacion(
          "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! "+error
        );
      }
    }
    /* OpenAdd(){
      const dialogoRef = this.dialog.open(FormEtapaComponent, {
        width: this.width,
        data: {etapaid:"",proyectoid:this.proyectoid }
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos(this.proyectoid);
      });
    }
    OpenEdit(id: any){
      const dialogoRef = this.dialog.open(FormEtapaComponent, {
        width: this.width,
        data: {etapaid:id,proyectoid:this.proyectoid }
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos(this.proyectoid);
      });
    } */
    notificacion(Mensaje: string) {
      this._snackBar.open(Mensaje, "", {
        duration: 5000,
        horizontalPosition: "right",
        verticalPosition: "top",
        /* panelClass: ['mat-toolbar', 'mat-primary'], */
      });
    }

}