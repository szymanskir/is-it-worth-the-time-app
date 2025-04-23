export enum TimeUnit {
  Second = "seconds",
  Minute = "minutes",
  Hour = "hours",
  Day = "days",
  Week = "weeks",
  Month = "months",
  Year = "years",
}


export type TimeCalculationInput = {
  horizonValue: number;
  horizonUnit: TimeUnit;
  frequencyValue: number;
  frequencyUnit: TimeUnit;
  taskDuration: number;
  taskDurationUnit: TimeUnit;
  resultUnit: TimeUnit;
};