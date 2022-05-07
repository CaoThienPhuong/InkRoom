import { TranslateService } from '@ngx-translate/core';
import { data } from './../../account/data';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { LunchTimeService } from 'src/app/_core/_service/lunch-time.service';
import { PeriodMixingService } from 'src/app/_core/_service/period-mixing.service';
import {
  EditService,
  ToolbarService,
  PageService,
  GridComponent,
} from "@syncfusion/ej2-angular-grids";
import { DatePipe } from '@angular/common';
import { IPeriodMixingDto } from 'src/app/_core/_model/period-mixing';

@Component({
  selector: 'app-period-mixing-modal',
  templateUrl: './period-mixing-modal.component.html',
  styleUrls: ['./period-mixing-modal.component.css'],
  providers: [DatePipe]
})
export class PeriodMixingModalComponent implements OnInit {
  dateNow: Date = new Date;
  startTime: Date = new Date(new Date().setHours(0,0,0,0));
  endTime: Date = new Date(new Date().setHours(0,0,0,0));
  startTimeEdit: Date;
  endTimeEdit: Date;
  periodMixingAdd: IPeriodMixingDto;
  periodMixingUpdate: IPeriodMixingDto;
  @Input() title: string;
  @Input() buildingLunchTimeId: number;
  periodMixingData: object;
  editSettings = {
    showDeleteConfirmDialog: false,
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Normal",
  };
  toolbar = [
    "Add",
    "Delete",
    "Cancel",
    "ExcelExport",
    "Search",
  ];
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  @ViewChild("grid") public grid: GridComponent;

  constructor(
    public activeModal: NgbActiveModal,
    private periodMixingService: PeriodMixingService,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getPeriodMixingByBuilding();
  }

  getPeriodMixingByBuilding(){
    this.periodMixingService.getPeriodMixingByBuilding(this.buildingLunchTimeId).subscribe(res => {
      this.periodMixingData = res
    });
  }
  updateModel(item) {
    this.startTime = new Date(item.startTime);
    this.endTime = new Date(item.endTime);
  }
  update() {
    this.periodMixingService.updatePeriodMixing(this.periodMixingUpdate).subscribe((res: any) => {
      if (res.status) {
        this.alertify.success(this.translateService.instant(res.message));
        this.getPeriodMixingByBuilding();
      } else {
        this.alertify.error(this.translateService.instant(res.message));
        this.getPeriodMixingByBuilding();
      }
    });
  }
  create() {
    this.periodMixingService.createPeriodMixing(this.periodMixingAdd).subscribe((res: any) => {
      if (res.status) {
        this.alertify.success(this.translateService.instant(res.message));
        this.getPeriodMixingByBuilding();
      } else {
        this.alertify.error(this.translateService.instant(res.message));
        this.getPeriodMixingByBuilding();
      }
    });
  }

  actionBegin(args) {
    if (args.requestType === "beginEdit") {
      const item = args.rowData;
      this.updateModel(item);
    }
    if (args.requestType === "save" && args.action === "add") {
      this.periodMixingAdd = {
        id: 0,
        buildingID: this.buildingLunchTimeId,
        isOvertime: false,
        startTime: this.datePipe.transform(this.startTime, "yyyy-MM-dd HH:mm"),
        endTime: this.datePipe.transform(this.endTime, "yyyy-MM-dd HH:mm"),
        createdTime: this.datePipe.transform(this.dateNow, "yyyy-MM-dd HH:mm"),
        updatedTime: null,
        deletedTime: null,
        isDelete: false,
        createdBy: 0,
        deletedBy: 0,
        updatedBy: 0,
      };
      this.create();
      this.startTime = new Date(new Date().setHours(0,0,0,0));
      this.endTime = new Date(new Date().setHours(0,0,0,0));
    }
    if (args.requestType === "save" && args.action === "edit") {
      this.periodMixingUpdate = {
        id: args.data.id,
        buildingID: args.data.buildingID,
        isOvertime: args.data.isOvertime,
        startTime: this.datePipe.transform(this.startTime, "yyyy-MM-dd HH:mm"),
        endTime: this.datePipe.transform(this.endTime, "yyyy-MM-dd HH:mm"),
        createdTime: args.data.createdTime,
        updatedTime: this.datePipe.transform(this.dateNow, "yyyy-MM-dd HH:mm"),
        deletedTime: args.data.deletedTime,
        isDelete: args.data.isDelete,
        createdBy: args.data.createdBy,
        deletedBy: args.data.deletedBy,
        updatedBy: args.data.updateBy,
      };
      this.update();
      this.startTime = new Date(new Date().setHours(0,0,0,0));
      this.endTime = new Date(new Date().setHours(0,0,0,0));
    }
    if (args.requestType === "delete") {
      this.delete(args.data[0].id);
    }
  }

  actionComplete(args) {
    // if (args.requestType === "edit") {
    //   (args.form.elements.namedItem("ID") as HTMLInputElement).disabled = true;
    //   (args.form.elements.namedItem(
    //     "Password"
    //   ) as HTMLInputElement).disabled = true;
    // }
    // if (args.requestType === "add") {
    //   (args.form.elements.namedItem("ID") as HTMLInputElement).disabled = true;
    // }
    //console.log(args)
  }

  toolbarClick(args) {
    switch (args.item.text) {
      case "Excel Export":
        this.grid.excelExport({ hierarchyExportMode: "All" });
        break;
      default:
        break;
    }
  }

  delete(id) {
    this.alertify.delete("Delete Project",
    'Are you sure you want to delete this Period Mixing ID "' + id + '" ?')
    .then((result) => {
      if (result) {
        this.periodMixingService.delete(id).subscribe((res) => {
          if (res) {
            this.alertify.success("Delete successfully");
            this.getPeriodMixingByBuilding();
            return;
          }
          this.alertify.error("Delete failed");
        })
      }
    })
    .catch((err) => {
      this.getPeriodMixingByBuilding();
      this.grid.refresh();
    });
  }

  NO(index) {
    return (
      (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1);
  }
}
