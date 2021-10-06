import { Component, OnInit } from "@angular/core";
import { Stats } from "src/app/Models/Utils/Stats.model";

import { GlobalService } from '../../../providers/GlobalService';
@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  DataStats:Stats[];
  constructor(private globalEvents: GlobalService) {}

  ngOnInit(): void {
    this.globalEvents.getObservable().subscribe((data) => {
      this.DataStats=data.val
    });
  }
}
