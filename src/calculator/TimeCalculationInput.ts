export enum TimeUnit {
  Second = "second",
  Minute = "minute",
  Hour = "hour",
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "year",
}


export type TimeCalculationInput = {
  horizonValue: number;
  horizonUnit: TimeUnit;
  frequencyValue: number;
  frequencyUnit: TimeUnit;
  taskDuration: number;
  taskDurationUnit: TimeUnit;
};