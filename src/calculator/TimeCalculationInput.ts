export enum HorizonUnit {
  Days = "days",
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}

export enum FrequencyUnit {
  PerDay = "day",
  PerWeek = "week",
  PerMonth = "month",
  PerYear = "year",
}

export enum TaskDurationUnit {
  Seconds = "second",
  Minutes = "minute",
  Hours = "hour",
  Days = "day",
}

export type TimeCalculationInput = {
  horizonValue: number;
  horizonUnit: HorizonUnit;
  frequencyValue: number;
  frequencyUnit: FrequencyUnit;
  taskDuration: number;
  taskDurationUnit: TaskDurationUnit;
};