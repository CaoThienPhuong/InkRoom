export interface IPeriodMixingDto {
  id: number;
  buildingID: number;
  isOvertime: boolean;
  startTime: string | null;
  endTime: string | null;
  createdTime: string;
  updatedTime: string | null;
  deletedTime: string | null;
  isDelete: boolean;
  createdBy: number;
  deletedBy: number;
  updatedBy: number;
}
