import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-tabpanel',
  templateUrl: './card-tabpanel.component.html',
  styleUrls: ['./card-tabpanel.component.css']
})
export class CardTabpanelComponent implements OnInit {
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor() { }

  ngOnInit(): void {
  }

}
